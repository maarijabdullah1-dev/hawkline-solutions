"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneCall, Cable, Radio, FileBarChart, ArrowRight, Check } from "lucide-react";

interface Step {
  num: string;
  title: string;
  duration: string;
  tagline: string;
  description: string;
  deliverable: string;
  icon: React.ElementType;
  code: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Discovery Call",
    duration: "Day 1 · 30 min",
    tagline: "Founder-led — not a sales rep",
    description:
      "A direct call with Maarij Abdullah, founder of Hawkline. He listens to how your store actually runs — peak hours, shift patterns, your POS, your team size — and identifies exactly where money is leaking. You walk away with a clear plan, even if you don't sign up.",
    deliverable: "Custom loss-prevention plan for your store",
    icon: PhoneCall,
    code: "init.discovery()",
  },
  {
    num: "02",
    title: "Connect Your Stack",
    duration: "Day 1-2 · ~2 hours",
    tagline: "We do the setup — you do nothing",
    description:
      "Our team handles every integration remotely: POS, security cameras, shift management, attendance. No code, no software to install, no downtime. Most stores are fully connected within 2 hours. You'll get a live confirmation when each layer goes online.",
    deliverable: "All systems connected + tested end-to-end",
    icon: Cable,
    code: "connect.stack(layers)",
  },
  {
    num: "03",
    title: "Go Live & Monitor",
    duration: "Day 2-7 · Live monitoring",
    tagline: "Your store starts getting watched — instantly",
    description:
      "Hawkline goes live. Every transaction, every shift change, every suspicious movement gets captured. You receive your first daily report by 9 PM on the same day you go live. Real-time alerts start flowing to your phone within hours.",
    deliverable: "First 9 PM report + instant alerts live",
    icon: Radio,
    code: "monitor.live = true",
  },
  {
    num: "04",
    title: "Insights & Reports",
    duration: "Day 7+ · Ongoing",
    tagline: "From raw data to founder-ready insights",
    description:
      "Hourly, daily, weekly, and monthly reports land in your inbox automatically. Spot trends before they cost you. Catch theft before it scales. Benchmark against competitors. Every report is built to answer one question: where is my money going?",
    deliverable: "Ongoing reports + monthly strategy review",
    icon: FileBarChart,
    code: "report.deliver(cadence)",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-vignette" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c81b1c] to-transparent opacity-50" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-24">
          <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
            <span className="w-8 h-px bg-[#c81b1c]" />
            how_it_works
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-6xl tracking-tight leading-[1.05]">
            From signup to insights
            <br />
            <span className="text-white/40">in under 7 days.</span>
          </h2>
          <p className="font-mono-prem text-white/60 text-base lg:text-lg mt-6 max-w-2xl leading-relaxed">
            A clear, founder-led onboarding. No engineering required from your
            side — we handle every step, you receive the insights.
          </p>
        </div>

        {/* === LINEAR VERTICAL TIMELINE === */}
        <div ref={ref} className="relative">
          {/* Vertical line on the left */}
          <div className="absolute left-[28px] md:left-[40px] top-0 bottom-0 w-px bg-gradient-to-b from-[#c81b1c]/60 via-[#c81b1c]/30 to-transparent" />

          <div className="space-y-8 lg:space-y-12">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className={`relative flex gap-6 md:gap-10 transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* === LEFT: Icon + Number === */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="relative">
                      {/* Glow */}
                      <div className="absolute inset-0 w-16 h-16 -m-4 bg-[#c81b1c]/30 blur-2xl animate-pulse-red" />
                      {/* Icon box */}
                      <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center bg-black border-2 border-[#c81b1c]">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#c81b1c]" />
                        {/* Step number badge */}
                        <div className="absolute -top-3 -right-3 w-7 h-7 md:w-8 md:h-8 bg-[#c81b1c] flex items-center justify-center font-mono-prem text-[10px] md:text-xs font-bold text-white">
                          {s.num}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* === RIGHT: Content Card === */}
                  <div className="flex-1 group">
                    <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/10 hover:border-[#c81b1c]/40 transition-all duration-300 p-6 lg:p-8 overflow-hidden">
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-[#c81b1c]" />

                      {/* Corner accents */}
                      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#c81b1c]/60" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#c81b1c]/60" />

                      {/* Header: Duration + Tagline */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                        <span className="font-mono-prem text-[10px] uppercase tracking-[0.22em] text-[#c81b1c]">
                          {s.duration}
                        </span>
                        <span className="font-mono-prem text-[10px] text-white/40 italic">
                          · {s.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-white text-2xl lg:text-3xl mb-3 tracking-tight">
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p className="font-mono-prem text-sm text-white/60 leading-relaxed mb-5">
                        {s.description}
                      </p>

                      {/* Deliverable */}
                      <div className="flex items-start gap-2 mb-4 p-3 bg-black border-l-2 border-[#c81b1c]">
                        <Check className="w-4 h-4 text-[#c81b1c] flex-shrink-0 mt-0.5" />
                        <p className="font-mono-prem text-xs text-white/70">
                          <span className="text-white/40">deliverable:</span>{" "}
                          <span className="text-white">{s.deliverable}</span>
                        </p>
                      </div>

                      {/* Code line */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-[#c81b1c]/30 font-mono-prem text-[10px]">
                        <span className="text-[#c81b1c]">$</span>
                        <span className="text-[#c81b1c]/80">{s.code}</span>
                        <span className="text-white/30 animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <p className="font-mono-prem text-[10px] uppercase tracking-[0.22em] text-[#c81b1c]/60 mb-4">
            ▸ ready_when_you_are
          </p>
          <a
            href="#trial"
            className="magnetic-btn group inline-flex items-center gap-3 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold text-base px-10 py-5 rounded-none transition-all relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start your 7-day trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <p className="font-mono-prem text-[11px] text-white/40 mt-4 uppercase tracking-wider">
            no_credit_card · cancel_anytime · founder_onboarding
          </p>
        </div>
      </div>
    </section>
  );
}
