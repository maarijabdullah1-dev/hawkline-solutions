import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FOUNDER_EMAIL = process.env.FOUNDER_EMAIL || "connect@hawklinesolutions.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@hawklinesolutions.com";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY || "";
    if (!key || key === "onboarding@resend.dev" || key === "your_resend_api_key_here") {
      return null;
    }
    _resend = new Resend(key);
  }
  return _resend;
}

interface TrialRequestBody {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  service?: string;
  message?: string;
  companySize?: string;
  storeCount?: string;
  bestTimeToCall?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(input: string, maxLen = 500): string {
  return input.trim().slice(0, maxLen);
}

function escapeHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TrialRequestBody;

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ ok: false, error: "Name, email, and phone are required." }, { status: 400 });
    }

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200).toLowerCase();
    const phone = sanitize(body.phone, 50);
    const businessName = body.businessName ? sanitize(body.businessName, 200) : null;
    const service = body.service ? sanitize(body.service, 100) : null;
    const message = body.message ? sanitize(body.message, 2000) : null;
    const companySize = body.companySize ? sanitize(body.companySize, 50) : null;
    const storeCount = body.storeCount ? sanitize(body.storeCount, 50) : null;
    const bestTimeToCall = body.bestTimeToCall ? sanitize(body.bestTimeToCall, 50) : null;

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    let trialId = "trial_" + Date.now();
    try {
      const { db } = await import("@/lib/db");
      const trial = await db.trialRequest.create({ data: { name, email, phone, businessName, service, message } });
      trialId = trial.id;
    } catch (dbErr) {
      console.log("Database save skipped (likely Vercel serverless):", dbErr);
    }

    const emailHtml = `<!DOCTYPE html><html><body style="background:#000;color:#fff;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">
<div style="border-bottom:2px solid #c81b1c;padding-bottom:16px;margin-bottom:32px;">
<h1 style="color:#c81b1c;font-size:24px;margin:0;letter-spacing:-0.5px;">Hawkline Solutions</h1>
<p style="color:#949494;font-size:13px;margin:4px 0 0;font-family:monospace;">New 7-Day Trial Request</p>
</div>
<p style="font-size:16px;color:#fff;margin:0 0 24px;">A new trial request has been submitted on your website. Details below:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;width:130px;font-family:monospace;">NAME</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;font-weight:600;">${escapeHtml(name)}</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;"><a href="mailto:${escapeHtml(email)}" style="color:#c81b1c;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">PHONE</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;"><a href="tel:${escapeHtml(phone)}" style="color:#c81b1c;text-decoration:none;">${escapeHtml(phone)}</a></td></tr>
 ${businessName ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">BUSINESS</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;">${escapeHtml(businessName)}</td></tr>` : ""}
 ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">SERVICE</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;background:rgba(200,27,28,0.1);">${escapeHtml(service)}</td></tr>` : ""}
 ${companySize ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">COMPANY SIZE</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;">${escapeHtml(companySize)}</td></tr>` : ""}
 ${storeCount ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">STORES</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;">${escapeHtml(storeCount)}</td></tr>` : ""}
 ${bestTimeToCall ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#949494;font-family:monospace;">BEST TIME</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#fff;">${escapeHtml(bestTimeToCall)}</td></tr>` : ""}
 ${message ? `<tr><td style="padding:10px 0;color:#949494;font-family:monospace;vertical-align:top;">MESSAGE</td><td style="padding:10px 0;color:#e6e6e6;">${escapeHtml(message)}</td></tr>` : ""}
</table>
<div style="margin-top:32px;padding:16px;background:#0a0a0a;border-left:3px solid #c81b1c;">
<p style="margin:0;color:#949494;font-size:12px;font-family:monospace;">ACTIONS</p>
<p style="margin:8px 0 0;color:#fff;font-size:14px;">Reply to <a href="mailto:${escapeHtml(email)}" style="color:#c81b1c;">${escapeHtml(email)}</a> or call <a href="tel:${escapeHtml(phone)}" style="color:#c81b1c;">${escapeHtml(phone)}</a></p>
</div>
<p style="margin-top:32px;color:#525252;font-size:11px;font-family:monospace;border-top:1px solid rgba(255,255,255,0.05);padding-top:16px;">Hawkline Solutions &middot; Founder: Maarij Abdullah &middot; connect@hawklinesolutions.com<br>Request ID: ${trialId} &middot; Received ${new Date().toISOString()}</p>
</div></body></html>`.trim();

    let emailSent = false;
    let emailError: string | null = null;

    const resendInstance = getResend();
    if (resendInstance) {
      try {
        const { error } = await resendInstance.emails.send({
          from: `Hawkline Solutions <${FROM_EMAIL}>`,
          to: [FOUNDER_EMAIL],
          subject: `🚨 New Trial Request — ${name} (${businessName || "Individual"})`,
          html: emailHtml,
          replyTo: email,
        });
        if (error) {
          emailError = String(error);
          console.error("Resend error:", error);
        } else {
          emailSent = true;
        }
      } catch (err) {
        emailError = String(err);
        console.error("Email send failed:", err);
      }
    } else {
      emailError = "RESEND_API_KEY not configured properly. Request saved but email not sent.";
    }

    return NextResponse.json({
      ok: true,
      id: trialId,
      emailSent,
      emailError,
      message: emailSent ? "Thank you! Your trial request has been received. We will contact you within 24 hours." : "Your request has been received. Our team will reach out shortly.",
    });
  } catch (err) {
    console.error("Trial request error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again or contact us directly." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "Hawkline Solutions Trial API", version: "2.0" });
}