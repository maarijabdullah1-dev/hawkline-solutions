"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Terminal, Shield, Zap } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_132544_b6ef0174-ed95-45ad-9a2f-ccb8acfbdce8.mp4";

export function Hero() {
  const masterRef = useRef<HTMLVideoElement>(null);
  const slaveRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState("");
  const fullText = "> initializing hawkline.security...";

  useEffect(() => {
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (!master || !slave) return;
    const onTimeUpdate = () => {
      if (slave.readyState >= 2 && Math.abs(slave.currentTime - master.currentTime) > 0.12) {
        try { slave.currentTime = master.currentTime; } catch {}
      }
    };
    master.addEventListener("timeupdate", onTimeUpdate);
    return () => master.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(function type() {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
        setTimeout(type, 35);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col"
    >
      {/* BG video with parallax */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "url(#grade)",
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.05)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <video
          ref={masterRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center top"
          src={VIDEO_URL}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          filter: "url(#grade2)",
          mixBlendMode: "plus-lighter",
          opacity: 0.4,
          maskImage: "linear-gradient(180deg, transparent 21.5%, #000 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 21.5%, #000 100%)",
        }}
      >
        <video
          ref={slaveRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center top"
          src={VIDEO_URL}
        />
      </div>

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-cyber-grid opacity-60" />

      {/* Scan line overlay */}
      <div className="scan-overlay" />

      {/* Heavy scrims for premium look */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* SVG color-grade filter defs */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="grade" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.0018 0.1205 0.2485 0.3472 0.4199 0.4798 0.5473 0.6048 0.6483 0.7201 0.7707 0.8084 0.8595 0.8993 0.9132 0.9162 0.9238 0.9300" />
              <feFuncG type="table" tableValues="0.0023 0.0936 0.1727 0.2814 0.3826 0.4617 0.4808 0.5706 0.6390 0.6390 0.6524 0.6945 0.7367 0.7789 0.8211 0.8632 0.9054 0.9300" />
              <feFuncB type="table" tableValues="0.0021 0.1039 0.1887 0.2954 0.3938 0.4581 0.4763 0.5374 0.5813 0.5835 0.6104 0.6642 0.7181 0.7719 0.8257 0.8795 0.9065 0.9300" />
            </feComponentTransfer>
          </filter>
          <filter id="grade2" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.0016 0.1060 0.2187 0.3055 0.3695 0.4222 0.4816 0.5322 0.5705 0.6337 0.6782 0.7114 0.7564 0.7914 0.8063 0.8063 0.8129 0.8184" />
              <feFuncG type="table" tableValues="0.0015 0.0608 0.1319 0.1829 0.2525 0.3001 0.3125 0.3709 0.4153 0.4153 0.4332 0.4606 0.4880 0.5154 0.5428 0.5702 0.5977 0.6045" />
              <feFuncB type="table" tableValues="0.0013 0.0623 0.1132 0.1772 0.2393 0.2858 0.2858 0.3224 0.3488 0.3501 0.3824 0.4147 0.4471 0.4793 0.5116 0.5439 0.5277 0.5580" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Foreground content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1505px] mx-auto w-full px-6 lg:px-12 pt-24">
        {/* Terminal-style status line */}
        <div className="animate-fade-up mb-8 flex items-center gap-3" style={{ animationDelay: '0.2s' }}>
          <span className="flex items-center gap-2 font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c]">
            <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
            system_online
          </span>
          <span className="w-12 h-px bg-gradient-to-r from-[#c81b1c] to-transparent" />
          <span className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40">
            v1.0 · retail_security_layer
          </span>
        </div>

        {/* Main headline with glitch */}
        <h1
          className="font-display font-bold text-white text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] tracking-tight max-w-5xl"
          style={{
            textShadow: "0 0 40px rgba(255,255,255,0.1), 0 4px 30px rgba(0,0,0,0.8)",
          }}
        >
          <span className="block animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Security built into
          </span>
          <span
            className="block glitch text-glow-red animate-fade-up"
            data-text="every system layer."
            style={{ animationDelay: '0.5s' }}
          >
            every system layer.
          </span>
        </h1>

        {/* Typing terminal line */}
        <div className="mt-8 mb-6 font-mono-prem text-sm text-[#c81b1c]/80 typing-cursor animate-fade-in" style={{ animationDelay: '1s' }}>
          {typed}
        </div>

        <p
          className="font-mono-prem text-base lg:text-lg text-white/80 max-w-xl leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          Engineered to stay resilient, controlled, and uncompromised under
          pressure. Catch theft, monitor sales reps, and get real-time
          operational intelligence — all in one premium platform.
        </p>

        {/* CTAs with magnetic effect */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.9s' }}>
          <a
            href="#trial"
            className="magnetic-btn group relative inline-flex items-center justify-center gap-3 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold text-base px-8 py-4 rounded-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-5 h-5" />
              Start 7-Day Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#services"
            className="group inline-flex items-center justify-center gap-3 border border-white/20 hover:border-[#c81b1c] hover:bg-[#c81b1c]/5 text-white font-display font-semibold text-base px-8 py-4 rounded-none transition-all"
          >
            <Terminal className="w-5 h-5 text-[#c81b1c]" />
            Explore Services
            <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          {[
            { icon: Shield, label: 'SOC2 Ready' },
            { icon: Zap, label: 'Real-time alerts' },
            { icon: Terminal, label: '24/7 monitoring' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#c81b1c]" />
                <span className="font-mono-prem text-xs uppercase tracking-wider text-white/50">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono-prem text-[10px] uppercase tracking-[0.22em]">scroll_to_explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c81b1c] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
