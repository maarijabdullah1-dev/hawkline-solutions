"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  AlertCircle,
  Terminal,
  Lock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const SERVICES = [
  { value: "qa", label: "QA Service — Cash variance + rep performance" },
  { value: "surveillance", label: "Live Surveillance — Theft + duty monitoring" },
  { value: "reporting", label: "Reporting — Hourly/daily/weekly/monthly" },
  { value: "all", label: "All three services (recommended)" },
  { value: "not-sure", label: "Not sure yet — help me decide" },
];

const TRIAL_PERKS = [
  {
    icon: Clock,
    title: "7 days, full access",
    detail: "Every feature, every report, every alert — no credit card required.",
    code: "trial.duration = '7d'",
  },
  {
    icon: ShieldCheck,
    title: "Founder-led onboarding",
    detail: "Maarij personally sets up your account and walks you through day 1.",
    code: "onboarding.human = true",
  },
  {
    icon: Sparkles,
    title: "Keep the insights",
    detail: "Even after the trial, you keep all generated reports and benchmarks.",
    code: "data.exportable = true",
  },
];

export function Trial() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "",
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(true);
      toast.success("Trial request received! Check your email.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Could not submit: ${msg}. Please try again or email us directly.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="trial"
      className="relative bg-black py-24 lg:py-32 border-t border-white/10 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-red opacity-40" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />

      {/* Animated scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c81b1c] to-transparent animate-scan" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — pitch */}
          <div className="lg:col-span-5">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
              <span className="w-8 h-px bg-[#c81b1c]" />
              start_trial
            </p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight mb-6">
              See exactly what
              <br />
              <span className="text-glow-red">you've been missing.</span>
            </h2>
            <p className="font-mono-prem text-white/70 text-base lg:text-lg leading-relaxed mb-10">
              <span className="text-[#c81b1c]">{'>'}</span> Seven days. Every feature. No credit card. You'll get a personal
              call from the founder within 24 hours of submitting — and we'll
              set up your monitoring together on day one.
            </p>

            <div className="space-y-5">
              {TRIAL_PERKS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className="group flex items-start gap-4 p-4 bg-black/50 border border-white/5 hover:border-[#c81b1c]/30 transition-all hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#c81b1c]/10 border border-[#c81b1c]/30 group-hover:bg-[#c81b1c]/20 group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5 text-[#c81b1c]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-semibold text-white text-base mb-1">
                        {perk.title}
                      </p>
                      <p className="font-mono-prem text-sm text-white/60 leading-relaxed mb-2">
                        {perk.detail}
                      </p>
                      <p className="font-mono-prem text-[10px] text-[#c81b1c]/60">
                        {perk.code}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Lock, label: 'SOC2 Ready' },
                { icon: Zap, label: '< 30s alerts' },
                { icon: Terminal, label: 'Founder-led' },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-2 px-3 py-1.5 bg-black border border-white/10">
                    <Icon className="w-3.5 h-3.5 text-[#c81b1c]" />
                    <span className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6 lg:p-10 relative overflow-hidden">
              {/* Top red rule with glow */}
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#c81b1c] glow-red-strong" />

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c81b1c]/40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c81b1c]/40" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#c81b1c]/40" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c81b1c]/40" />

              {/* Subtle grid */}
              <div className="absolute inset-0 bg-cyber-grid-sm opacity-20 pointer-events-none" />

              {success ? (
                <div className="py-16 text-center relative">
                  <div className="w-24 h-24 mx-auto bg-[#c81b1c]/10 border border-[#c81b1c]/30 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-[#c81b1c]/20 animate-pulse" />
                    <CheckCircle2 className="w-12 h-12 text-[#c81b1c] relative" />
                  </div>
                  <p className="font-mono-prem text-[10px] uppercase tracking-[0.22em] text-[#c81b1c]/60 mb-3">
                    ▸ request_received
                  </p>
                  <h3 className="font-display font-bold text-white text-3xl mb-3">
                    Request received
                  </h3>
                  <p className="font-mono-prem text-white/70 max-w-md mx-auto leading-relaxed mb-8">
                    Thank you, {form.name.split(" ")[0] || "there"}. Your trial
                    request has been sent to Maarij directly. You'll hear back
                    within 24 hours — usually much sooner.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="mailto:connect@hawklinesolutions.com"
                      className="font-mono-prem text-xs text-white/60 px-4 py-2 border border-white/10 hover:border-[#c81b1c] hover:text-white transition-colors"
                    >
                      connect@hawklinesolutions.com
                    </a>
                    <a
                      href="tel:+923308194875"
                      className="font-mono-prem text-xs text-white/60 px-4 py-2 border border-white/10 hover:border-[#c81b1c] hover:text-white transition-colors"
                    >
                      0330-8194875
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        businessName: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="mt-6 font-mono-prem text-xs text-white/40 hover:text-white underline underline-offset-4"
                  >
                    $ submit_another_request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6 relative">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-[#c81b1c]" />
                      <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                        hawkline@trial:~$ ./initiate
                      </p>
                    </div>
                    <h3 className="font-display font-bold text-white text-2xl lg:text-3xl mb-2 tracking-tight">
                      Book your free trial
                    </h3>
                    <p className="font-mono-prem text-sm text-white/50">
                      <span className="text-[#c81b1c]">{'>'}</span> All fields marked with * are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                        full_name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="e.g. Maarij Abdullah"
                        className="bg-black border-white/15 text-white placeholder:text-white/30 rounded-none focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 h-12 font-mono-prem"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                        business_name
                      </Label>
                      <Input
                        id="businessName"
                        value={form.businessName}
                        onChange={(e) => update("businessName", e.target.value)}
                        placeholder="e.g. Acme Retail Co."
                        className="bg-black border-white/15 text-white placeholder:text-white/30 rounded-none focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 h-12 font-mono-prem"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                        email_address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@business.com"
                        className="bg-black border-white/15 text-white placeholder:text-white/30 rounded-none focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 h-12 font-mono-prem"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                        phone_number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="bg-black border-white/15 text-white placeholder:text-white/30 rounded-none focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 h-12 font-mono-prem"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                      which_service?
                    </Label>
                    <Select
                      value={form.service}
                      onValueChange={(v) => update("service", v)}
                    >
                      <SelectTrigger className="bg-black border-white/15 text-white rounded-none h-12 focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 font-mono-prem text-sm">
                        <SelectValue placeholder="Select a service (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/15 text-white rounded-none">
                        {SERVICES.map((s) => (
                          <SelectItem
                            key={s.value}
                            value={s.value}
                            className="focus:bg-[#c81b1c]/20 focus:text-white rounded-none font-mono-prem text-sm"
                          >
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono-prem text-[10px] uppercase tracking-wider text-white/60">
                      message_(optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="e.g. We run 3 retail stores and have noticed cash discrepancies on weekends."
                      rows={4}
                      className="bg-black border-white/15 text-white placeholder:text-white/30 rounded-none focus-visible:border-[#c81b1c] focus-visible:ring-[#c81b1c]/30 resize-none font-mono-prem text-sm"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#c81b1c]/5 border-l-2 border-[#c81b1c]">
                    <AlertCircle className="w-5 h-5 text-[#c81b1c] flex-shrink-0 mt-0.5" />
                    <p className="font-mono-prem text-xs text-white/70 leading-relaxed">
                      <span className="text-[#c81b1c]">{'>'}</span> Your request goes directly to{" "}
                      <span className="text-white">Maarij Abdullah</span> (founder)
                      at{" "}
                      <a
                        href="mailto:connect@hawklinesolutions.com"
                        className="text-[#c81b1c] hover:underline"
                      >
                        connect@hawklinesolutions.com
                      </a>
                      . Expect a reply within 24 hours.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="magnetic-btn w-full bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold text-base h-14 rounded-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Start My 7-Day Free Trial
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {!submitting && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    )}
                  </Button>

                  <p className="font-mono-prem text-[10px] text-white/30 text-center uppercase tracking-wider">
                    no_credit_card · cancel_anytime · founder_onboarding
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
