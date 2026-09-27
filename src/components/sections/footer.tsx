"use client";

import { Logo } from "@/components/logo";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/10 pt-20 pb-8"
    >
      <div className="mx-auto max-w-[1505px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Logo size={40} className="text-white" />
              <span className="font-display font-bold text-white text-xl tracking-tight">
                Hawkline<span className="text-[#c81b1c]">.</span>
              </span>
            </div>
            <p className="font-mono-prem text-white/60 text-sm leading-relaxed max-w-md mb-6">
              Premium QA, live surveillance, and reporting services for retail
              businesses that refuse to lose money to blind spots. Founded by
              Maarij Abdullah.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#trial"
                className="inline-flex items-center gap-2 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold text-sm px-5 py-2.5 rounded-none transition-colors group"
              >
                Start free trial
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="mailto:connect@hawklinesolutions.com"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-display font-semibold text-sm px-5 py-2.5 rounded-none transition-colors"
              >
                Email us
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {[
                { label: "QA Service", href: "#services" },
                { label: "Live Surveillance", href: "#services" },
                { label: "Reporting", href: "#services" },
                { label: "Cash Variance", href: "#services" },
                { label: "Theft Detection", href: "#services" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-mono-prem text-sm text-white/70 hover:text-[#c81b1c] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40 mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Founder", href: "#founder" },
                { label: "Free Trial", href: "#trial" },
                { label: "Contact", href: "#contact" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-mono-prem text-sm text-white/70 hover:text-[#c81b1c] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40 mb-5">
              Get in touch
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:connect@hawklinesolutions.com"
                  className="group flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 text-[#c81b1c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40 mb-0.5">
                      Company
                    </p>
                    <p className="font-mono-prem text-sm text-white/80 group-hover:text-[#c81b1c] transition-colors break-all">
                      connect@hawklinesolutions.com
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+923308194875"
                  className="group flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 text-[#c81b1c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40 mb-0.5">
                      Phone
                    </p>
                    <p className="font-mono-prem text-sm text-white/80 group-hover:text-[#c81b1c] transition-colors">
                      0330-8194875
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40 mb-0.5">
                      Founder
                    </p>
                    <p className="font-mono-prem text-sm text-white/80">
                      Maarij Abdullah
                    </p>
                    <p className="font-mono-prem text-xs text-white/50 break-all mt-1">
                      maarijabdullah1@gmail.com
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono-prem text-xs text-white/40">
            © {new Date().getFullYear()} Hawkline Solutions. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 font-mono-prem text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status: All systems operational</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
