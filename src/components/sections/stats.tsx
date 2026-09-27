"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
}

const STATS: Stat[] = [
  { value: 300, suffix: "+", label: "Clients", detail: "Retail businesses monitored" },
  { value: 99, suffix: "%", label: "Satisfaction", detail: "Founder-verified retention" },
  { value: 5, prefix: "$", suffix: "M+", label: "Revenue tracked", detail: "Processed through our layer" },
];

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatItem({ stat, visible, delay }: { stat: Stat; visible: boolean; delay: number }) {
  const count = useCountUp(stat.value, 2000, visible);
  return (
    <div
      className={`relative md:px-12 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {visible && (
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-mono-prem text-[10px] uppercase tracking-[0.22em] text-[#c81b1c]/60">
            ▸ metric_
          </span>
        </div>
      )}
      <p className="font-mono-prem text-white text-5xl lg:text-7xl font-bold tracking-tighter tabular-nums">
        {stat.prefix}{count}{stat.suffix && <span className="text-[#c81b1c]">{stat.suffix}</span>}
      </p>
      <p className="font-display text-white text-lg lg:text-2xl mt-3 tracking-tight">
        {stat.label}
      </p>
      <p className="font-mono-prem text-xs text-white/40 mt-2">{stat.detail}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-black py-20 lg:py-28 border-y border-white/10 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-radial-red opacity-40" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />

      {/* Top scan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c81b1c] to-transparent opacity-60" />

      <div ref={ref} className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative md:px-12 ${
                i < STATS.length - 1 ? "md:border-r border-white/10" : ""
              }`}
            >
              <StatItem stat={stat} visible={visible} delay={i * 150} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c81b1c] to-transparent opacity-40" />
    </section>
  );
}
