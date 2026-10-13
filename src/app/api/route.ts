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
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ ok: false, error: "Name, email, and phone are required." }, { status: 400 });
    }

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200).toLowerCase();
    const phone = sanitize(body.phone, 50);
    const businessName = body.businessName ? sanitize(body.businessName, 200) : "";
    const service = body.service ? sanitize(body.service, 100) : "";
    const message = body.message ? sanitize(body.message, 2000) : "";
    const companySize = body.companySize ? sanitize(body.companySize, 50) : "";
    const storeCount = body.storeCount ? sanitize(body.storeCount, 50) : "";
    const bestTimeToCall = body.bestTimeToCall ? sanitize(body.bestTimeToCall, 50) : "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    const trialId = "trial_" + Date.now();
    const timestamp = new Date().toISOString();

    const emailHtml = `<!DOCTYPE html><html><body style="background:#000;color:#fff;font-family:Arial,sans-serif;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">
<div style="border-bottom:2px solid #c81b1c;padding-bottom:16px;margin-bottom:32px;">
<h1 style="color:#c81b1c;font-size:24px;margin:0;">Hawkline Solutions</h1>
<p style="color:#949494;font-size:13px;margin:4px 0 0;">New 7-Day Trial Request</p>
</div>
<p style="font-size:16px;color:#fff;margin:0 0 24px;">A new trial request has been submitted on your website:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;width:130px;">NAME</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;font-weight:600;">${escapeHtml(name)}</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(email)}</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">PHONE</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(phone)}</td></tr>
 ${businessName ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">BUSINESS</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(businessName)}</td></tr>` : ""}
 ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">SERVICE</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(service)}</td></tr>` : ""}
 ${companySize ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">COMPANY SIZE</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(companySize)}</td></tr>` : ""}
 ${storeCount ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">STORES</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(storeCount)}</td></tr>` : ""}
 ${bestTimeToCall ? `<tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">BEST TIME</td><td style="padding:10px 0;border-bottom:1px solid #333;color:#fff;">${escapeHtml(bestTimeToCall)}</td></tr>` : ""}
 ${message ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">MESSAGE</td><td style="padding:10px 0;color:#ddd;">${escapeHtml(message)}</td></tr>` : ""}
</table>
<p style="margin-top:32px;color:#666;font-size:11px;">Request ID: ${trialId} | Received: ${timestamp}</p>
</div></body></html>`;

    let emailSent = false;
    let emailError: string | null = null;

    const resendInstance = getResend();
    if (resendInstance) {
      try {
        const { error } = await resendInstance.emails.send({
          from: `Hawkline Solutions <${FROM_EMAIL}>`,
          to: [FOUNDER_EMAIL],
          subject: `New Trial Request - ${name}`,
          html: emailHtml,
          replyTo: email,
        });
        if (error) {
          emailError = String(error);
        } else {
          emailSent = true;
        }
      } catch (err) {
        emailError = String(err);
      }
    } else {
      emailError = "RESEND_API_KEY not configured properly. Email not sent.";
    }

    return NextResponse.json({
      ok: true,
      id: trialId,
      emailSent,
      emailError,
      message: emailSent
        ? "Thank you! Your trial request has been received. We will contact you within 24 hours."
        : "Your request has been received. Our team will reach out shortly.",
    });
  } catch (err) {
    console.error("Trial request error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "Hawkline Solutions Trial API", version: "3.0" });
}