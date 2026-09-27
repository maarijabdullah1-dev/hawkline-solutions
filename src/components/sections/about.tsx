"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Lock, Zap, Target } from "lucide-react";

const VALUES = [
  {
    icon: Eye,
    title: "Total visibility",
    description:
      "Every transaction, every shift, every discrepancy — surfaced before it costs you money. We believe founders should never operate in the dark.",
    code: "layer.visibility = true",
  },
  {
    icon: Lock,
    title: "Uncompromised integrity",
    description:
      "Built like a security product, not a dashboard. Data is encrypted at rest and in transit, with role-based access from day one.",
    code: "encryption: AES-256",
  },
  {
    icon: Zap,
    title: "Real-time, not retrospective",
    description:
      "Most tools tell you what went wrong last week. We tell you what's going wrong right now — so you can intervene before the loss compounds.",
    code: "alert.delay < 30s",
  },
  {
    icon: Target,
    title: "Founder-first design",
    description:
      "Built by a founder for founders. Every alert, every report, every screen answers one question: is my business losing money right now?",
    code: "design.target = 'founder'",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="relative bg-black py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-40" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left */}
          <div className={`lg:col-span-5 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
              <span className="w-8 h-px bg-[#c81b1c]" />
              about_hawkline
            </p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-8">
              We build the layer most retail businesses skip.
            </h2>
            <div className="space-y-5 font-mono-prem text-white/70 text-base leading-relaxed">
              <p>
                <span className="text-[#c81b1c]">{'>'}</span> Hawkline Solutions was founded on a single observation: most
                retail losses don't come from one big event — they come from a
                thousand small blind spots stacked over months. A rep who
                overcharges here. A backroom shift there. A store that opens
                twenty minutes late. None of it shows up in your P&amp;L until
                it's already a habit.
              </p>
              <p>
                <span className="text-[#c81b1c]">{'>'}</span> We exist to close that gap. Our platform sits between your POS,
                your cameras, and your team — turning raw operational signals
                into clear, actionable intelligence that reaches you before the
                damage compounds. Whether you run a single store or a hundred,
                the principle is the same: what you can see, you can fix.
              </p>
              <p>
                <span className="text-[#c81b1c]">{'>'}</span> Built and operated by founders who've felt the cost of blind
                spots firsthand — Hawkline is the layer we wish we'd had.
              </p>
            </div>

            {/* Terminal-style stat block */}
            <div className="mt-10 p-6 bg-black border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-[#c81b1c]" />
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c81b1c]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="font-mono-prem text-[10px] text-white/40 ml-2">hawkline@mission:~$</span>
              </div>
              <div className="font-mono-prem text-xs text-white/70 space-y-1">
                <p><span className="text-[#c81b1c]">$</span> cat /etc/mission.txt</p>
                <p className="text-white/50">→ make retail blind spots unprofitable</p>
                <p><span className="text-[#c81b1c]">$</span> cat /etc/audience.txt</p>
                <p className="text-white/50">→ founders who refuse to lose money</p>
                <p><span className="text-[#c81b1c]">$</span> <span className="typing-cursor">_</span></p>
              </div>
            </div>
          </div>

          {/* Right - values grid */}
          <div className={`lg:col-span-7 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 relative">
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-[#c81b1c] z-10" />
              <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-[#c81b1c] z-10" />

              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group relative bg-black p-8 hover:bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1"
                    style={{
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-[#c81b1c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                    <div className="w-12 h-12 flex items-center justify-center bg-[#c81b1c]/10 border border-[#c81b1c]/30 group-hover:bg-[#c81b1c]/20 group-hover:scale-110 transition-all mb-5">
                      <Icon className="w-6 h-6 text-[#c81b1c]" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-3 tracking-tight">
                      {v.title}
                    </h3>
                    <p className="font-mono-prem text-sm text-white/60 leading-relaxed mb-4">
                      {v.description}
                    </p>
                    <div className="font-mono-prem text-[10px] text-[#c81b1c]/60 border-t border-white/5 pt-3">
                      {v.code}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
