"use client";

import { Mail, Phone, ArrowUpRight, Linkedin, Twitter, Cpu, Activity } from "lucide-react";

export function Founder() {
  return (
    <section
      id="founder"
      className="relative bg-black py-24 lg:py-32 border-t border-white/10 overflow-hidden"
    >
      {/* Premium glows */}
      <div className="absolute inset-0 bg-radial-red-strong opacity-50" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left — premium portrait with glitch + scan */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Animated outer ring */}
              <div className="absolute -inset-4 border border-[#c81b1c]/30 animate-rotate-slow" />
              <div className="absolute -inset-2 border border-[#c81b1c]/20" />

              {/* Main container */}
              <div className="absolute inset-0 bg-cyber-grid-sm overflow-hidden border border-white/10 relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-radial-red-strong opacity-60" />

                {/* Scan line */}
                <div className="absolute inset-0 scan-overlay" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#c81b1c] z-10" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#c81b1c] z-10" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#c81b1c] z-10" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c81b1c] z-10" />

                {/* Monogram with glitch */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display font-bold text-[140px] sm:text-[180px] leading-none text-white/95 tracking-tighter relative glitch"
                       data-text="MA">
                      M<span className="text-[#c81b1c]">A</span>
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse" />
                      <p className="font-mono-prem text-[10px] uppercase tracking-[0.3em] text-white/60">
                        founder_ceo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between font-mono-prem text-[10px]">
                    <div className="flex items-center gap-2 text-white/60">
                      <Activity className="w-3 h-3 text-[#c81b1c]" />
                      <span>status: available</span>
                    </div>
                    <div className="text-[#c81b1c]/60">
                      <Cpu className="w-3 h-3 inline mr-1" />
                      hawkline_v1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — info */}
          <div className="lg:col-span-7">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
              <span className="w-8 h-px bg-[#c81b1c]" />
              the_founder
            </p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight mb-4">
              <span className="glitch" data-text="Maarij Abdullah">Maarij Abdullah</span>
            </h2>
            <p className="font-mono-prem text-white/60 text-sm uppercase tracking-wider mb-8">
              founder &amp; ceo · hawkline solutions
            </p>

            <blockquote className="relative border-l-2 border-[#c81b1c] pl-6 py-4 mb-8 bg-gradient-to-r from-[#c81b1c]/5 to-transparent">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#c81b1c] glow-red-strong" />
              <p className="font-display text-white/90 text-xl lg:text-2xl leading-relaxed italic tracking-tight">
                "I built Hawkline because I lost money to blind spots I couldn't
                see. Every retail founder deserves to know — in real time —
                exactly what's happening inside their store. Not next week. Now."
              </p>
            </blockquote>

            <p className="font-mono-prem text-white/70 text-base leading-relaxed mb-8 max-w-xl">
              <span className="text-[#c81b1c]">{'>'}</span> Maarij leads product and customer success at Hawkline Solutions.
              He works directly with every new trial client during onboarding —
              because the first 7 days set the tone for everything that follows.
            </p>

            {/* Contact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 mb-8 relative">
              <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-[#c81b1c] z-10" />
              <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-[#c81b1c] z-10" />

              <a
                href="mailto:connect@hawklinesolutions.com"
                className="group bg-black p-5 hover:bg-[#0a0a0a] transition-all hover:-translate-y-0.5 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <Mail className="w-5 h-5 text-[#c81b1c]" />
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#c81b1c] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="font-mono-prem text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  company_email
                </p>
                <p className="font-mono-prem text-sm text-white break-all group-hover:text-[#c81b1c] transition-colors">
                  connect@hawklinesolutions.com
                </p>
              </a>

              <a
                href="tel:+923308194875"
                className="group bg-black p-5 hover:bg-[#0a0a0a] transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <Phone className="w-5 h-5 text-[#c81b1c]" />
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#c81b1c] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="font-mono-prem text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  direct_phone
                </p>
                <p className="font-mono-prem text-sm text-white group-hover:text-[#c81b1c] transition-colors">
                  0330-8194875
                </p>
              </a>

              <a
                href="mailto:maarijabdullah1@gmail.com"
                className="group bg-black p-5 hover:bg-[#0a0a0a] transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <Mail className="w-5 h-5 text-white/60" />
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="font-mono-prem text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  personal_email
                </p>
                <p className="font-mono-prem text-sm text-white/80 break-all group-hover:text-white transition-colors">
                  maarijabdullah1@gmail.com
                </p>
              </a>

              <div className="bg-black p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-3">
                    <Linkedin className="w-5 h-5 text-white/60" />
                    <Twitter className="w-5 h-5 text-white/60" />
                  </div>
                </div>
                <p className="font-mono-prem text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  social
                </p>
                <p className="font-mono-prem text-sm text-white/60">
                  @maarijabdullah
                </p>
              </div>
            </div>

            <a
              href="#trial"
              className="magnetic-btn group inline-flex items-center gap-3 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold px-7 py-4 rounded-none transition-all relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Book a call with Maarij
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
