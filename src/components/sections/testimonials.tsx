"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Within 48 hours of going live, Hawkline flagged two reps overcharging customers. We recovered more than the annual subscription cost in the first week alone. The founder personally called me the day we set it up.",
    name: "Imran Siddiqui",
    role: "Owner",
    company: "Metro Mart Chain · 12 stores",
    rating: 5,
    initials: "IS",
  },
  {
    quote:
      "The backroom duty alerts caught what we suspected for months — reps hiding during peak hours. Foot traffic conversion went up 23% in the first month after we enforced floor presence.",
    name: "Sarah Chen",
    role: "Operations Director",
    company: "Pacific Retail Group",
    rating: 5,
    initials: "SC",
  },
  {
    quote:
      "I used to wait until month-end to spot cash variances. Now I know about discrepancies before the day ends. The 9 PM email summary is now part of my evening routine — over a cup of coffee.",
    name: "Ahmed Al-Rashid",
    role: "Founder",
    company: "Verge Mobile · 4 stores",
    rating: 5,
    initials: "AR",
  },
  {
    quote:
      "The competition reports alone are worth the subscription. We were underpricing key SKUs by 8% and didn't know it. Hawkline's benchmark showed us the gap — pricing was fixed in a week.",
    name: "Priya Sharma",
    role: "CEO",
    company: "Urban Convenience Stores",
    rating: 5,
    initials: "PS",
  },
  {
    quote:
      "As a multi-store operator, I needed one layer that watches everything. Hawkline does exactly that. The hourly reports let me spot which stores are underperforming in real time — not next quarter.",
    name: "Marcus Bradley",
    role: "President",
    company: "Bradley Retail Holdings",
    rating: 5,
    initials: "MB",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-radial-red opacity-30" />
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
            <span className="w-8 h-px bg-[#c81b1c]" />
            founder_stories
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight">
            What founders say
            <br />
            <span className="text-white/40">after going live.</span>
          </h2>
          <p className="font-mono-prem text-white/60 text-base lg:text-lg mt-6 max-w-2xl leading-relaxed">
            Real outcomes from real retail operators. Every quote below is from a
            founder who received their first alert within 7 days of going live.
          </p>
        </div>

        {/* Featured testimonial */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/10 p-8 lg:p-14 overflow-hidden">
            {/* Decorative grid */}
            <div className="absolute inset-0 bg-cyber-grid-sm opacity-20" />

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c81b1c]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c81b1c]" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-10 h-10 text-[#c81b1c]/40 flex-shrink-0" />
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[activeIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c81b1c] text-[#c81b1c]" />
                  ))}
                </div>
              </div>

              <blockquote className="font-display text-white text-xl lg:text-3xl leading-relaxed mb-8 italic">
                "{TESTIMONIALS[activeIdx].quote}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#c81b1c] text-white font-display font-bold text-xl">
                    {TESTIMONIALS[activeIdx].initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg">
                      {TESTIMONIALS[activeIdx].name}
                    </p>
                    <p className="font-mono-prem text-xs text-white/60">
                      {TESTIMONIALS[activeIdx].role}
                    </p>
                    <p className="font-mono-prem text-[11px] text-[#c81b1c]/80 mt-1">
                      {TESTIMONIALS[activeIdx].company}
                    </p>
                  </div>
                </div>

                <div className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40">
                  testimonial_{String(activeIdx + 1).padStart(2, '0')}/{String(TESTIMONIALS.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial selector */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{ touchAction: 'manipulation' }}
                className={`group flex items-center gap-2 px-3 py-2 border transition-all ${
                  i === activeIdx
                    ? "border-[#c81b1c] bg-[#c81b1c]/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className={`w-7 h-7 flex items-center justify-center font-mono-prem text-[10px] font-bold ${
                  i === activeIdx ? "bg-[#c81b1c] text-white" : "bg-white/5 text-white/60"
                }`}>
                  {t.initials}
                </div>
                <span className={`font-mono-prem text-xs ${i === activeIdx ? "text-white" : "text-white/40"}`}>
                  {t.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10">
          {[
            { value: "300+", label: "Founders onboarded" },
            { value: "24h", label: "Avg response time" },
            { value: "4.9/5", label: "Founder rating" },
            { value: "$5M+", label: "Revenue protected" },
          ].map((item) => (
            <div key={item.label} className="bg-black p-6 text-center">
              <p className="font-mono-prem text-[#c81b1c] text-2xl lg:text-3xl font-bold tracking-tight">
                {item.value}
              </p>
              <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
