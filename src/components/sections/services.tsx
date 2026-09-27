"use client";

import { useState, useRef } from "react";
import {
  ShieldCheck,
  Eye,
  BarChart3,
  ArrowRight,
  Check,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Activity,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  status: string;
  features: {
    title: string;
    detail: string;
    icon: React.ElementType;
    metric?: string;
  }[];
}

const SERVICES: Service[] = [
  {
    id: "qa",
    icon: ShieldCheck,
    title: "QA Service",
    tagline: "Daily reports. Cash variance. Rep performance.",
    status: "active_monitoring",
    description:
      "Full-day reports that track cash variance, monitor sales rep invoice behavior, and flag any transaction where a customer is being overcharged. Every invoice, every transaction, every discrepancy — captured.",
    features: [
      {
        title: "Cash Variance Reports",
        detail: "Daily end-of-day reconciliation that flags any discrepancy between expected and actual cash, with itemized breakdowns by register, rep, and shift.",
        icon: DollarSign,
        metric: "<0.5% tolerance",
      },
      {
        title: "Sales Rep Performance",
        detail: "Per-rep scorecards: invoice count, average ticket size, refund ratio, and customer overcharge alerts — all in one live dashboard.",
        icon: Users,
        metric: "Live dashboard",
      },
      {
        title: "Invoice Integrity",
        detail: "Each invoice is scanned for pricing accuracy. If a rep is overcharging customers, the system flags it in real time and emails you.",
        icon: FileText,
        metric: "Real-time alerts",
      },
      {
        title: "Transaction Auditing",
        detail: "Every POS transaction is logged with timestamp, rep ID, and amount — searchable for up to 24 months.",
        icon: Activity,
        metric: "24-month history",
      },
    ],
  },
  {
    id: "surveillance",
    icon: Eye,
    title: "Live Surveillance",
    tagline: "Theft detection. Rep duty. Store hours.",
    status: "watching_24_7",
    description:
      "Real-time monitoring that detects theft, ensures sales reps stay on the floor during duty, and verifies your store opened on time. No more blind spots in your operation.",
    features: [
      {
        title: "Theft Detection",
        detail: "AI-driven monitoring flags suspicious behavior at POS, backroom, and storage zones — with instant alerts sent to your phone.",
        icon: AlertTriangle,
        metric: "AI-powered",
      },
      {
        title: "Sales Rep Theft Watch",
        detail: "Cross-references rep transactions with video footage to detect skimming, fake refunds, and unauthorized discounts.",
        icon: ShieldCheck,
        metric: "Cross-referenced",
      },
      {
        title: "Backroom Duty Compliance",
        detail: "Alerts you the moment a sales rep leaves the floor during active duty hours — no more hiding in the back.",
        icon: Users,
        metric: "Instant alerts",
      },
      {
        title: "Daily Timesheet + Store Hours",
        detail: "Auto-tracked rep attendance with verified store opening time. You'll know exactly when your store actually opened.",
        icon: Clock,
        metric: "Auto-tracked",
      },
    ],
  },
  {
    id: "reporting",
    icon: BarChart3,
    title: "Reporting",
    tagline: "Hourly. Daily. Weekly. Monthly. Competition.",
    status: "streaming_data",
    description:
      "Granular sales and performance reports that surface trends, competition insights, and operational gaps — delivered on the cadence your business actually runs on.",
    features: [
      {
        title: "Hourly Sales Reports",
        detail: "See exactly which hours drive revenue and which drain it. Optimize staffing, promotions, and inventory in real time.",
        icon: Clock,
        metric: "Hour-by-hour",
      },
      {
        title: "Daily Sales Reports",
        detail: "End-of-day summaries delivered to your inbox by 9 PM — total revenue, rep breakdown, top SKUs, and variance alerts.",
        icon: FileText,
        metric: "9 PM delivery",
      },
      {
        title: "Weekly Performance",
        detail: "Rep-wise weekly scorecards with trend lines, comparison to prior weeks, and coaching recommendations.",
        icon: TrendingUp,
        metric: "Trend analysis",
      },
      {
        title: "Competition Reports",
        detail: "Benchmark your pricing, footfall, and conversion against local competitors — sourced from public data and partner networks.",
        icon: Activity,
        metric: "Benchmarked",
      },
    ],
  },
];

export function Services() {
  const [active, setActive] = useState<string>("qa");
  const activeService = SERVICES.find((s) => s.id === active)!;

  return (
    <section id="services" className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-vignette" />

      {/* Top red glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c81b1c] to-transparent opacity-50" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
            <span className="w-8 h-px bg-[#c81b1c]" />
            what_we_do
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-7xl tracking-tight leading-[1.05]">
            Three services.
            <br />
            <span className="text-white/40">One uncompromising standard.</span>
          </h2>
          <p className="font-mono-prem text-white/60 text-base lg:text-lg mt-6 max-w-2xl leading-relaxed">
            Every layer of your retail operation — watched, measured, and
            reported. Built for founders and operators who refuse to lose money
            to blind spots.
          </p>
        </div>

        {/* Service selector cards with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 mb-px relative">
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-[#c81b1c] z-10" />
          <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-[#c81b1c] z-10" />

          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isActive = service.id === active;
            return (
              <button
                key={service.id}
                onClick={() => setActive(service.id)}
                style={{
                  touchAction: 'manipulation',
                  minHeight: '200px',
                  animationDelay: `${0.1 + idx * 0.1}s`,
                }}
                className={`card-3d group relative bg-black p-8 lg:p-10 text-left transition-all duration-500 animate-fade-up ${
                  isActive ? "bg-[#0a0a0a]" : "hover:bg-[#050505]"
                }`}
              >
                {/* Active state top border */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#c81b1c] glow-red-strong" />
                )}

                {/* Status indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#c81b1c] animate-pulse' : 'bg-white/20'}`} />
                  <span className="font-mono-prem text-[9px] uppercase tracking-wider text-white/30">
                    {isActive ? 'ACTIVE' : 'IDLE'}
                  </span>
                </div>

                {/* Icon with glow */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 blur-2xl transition-opacity ${isActive ? 'opacity-60 bg-[#c81b1c]' : 'opacity-0'}`} />
                  <Icon
                    className={`relative w-10 h-10 transition-all ${
                      isActive ? "text-[#c81b1c] scale-110" : "text-white/60 group-hover:text-white group-hover:scale-105"
                    }`}
                  />
                </div>

                <h3
                  className={`font-display font-bold text-2xl lg:text-3xl mb-2 transition-colors tracking-tight ${
                    isActive ? "text-white" : "text-white/80"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="font-mono-prem text-[11px] text-white/40 uppercase tracking-wider mb-5">
                  {service.tagline}
                </p>

                {/* Status code */}
                <div className="font-mono-prem text-[10px] text-[#c81b1c]/60 mb-4">
                  status: <span className="text-[#c81b1c]">{service.status}</span>
                </div>

                <div className="flex items-center gap-2 font-mono-prem text-xs">
                  <span
                    className={`transition-colors ${
                      isActive ? "text-[#c81b1c]" : "text-white/40"
                    }`}
                  >
                    {isActive ? "▸ viewing" : "$ view_details"}
                  </span>
                  <ArrowRight
                    className={`w-3 h-3 transition-transform ${
                      isActive ? "text-[#c81b1c] translate-x-1" : "text-white/40 group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active service detail */}
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-t-0 border-white/10 p-8 lg:p-14 relative overflow-hidden">
          {/* Decorative grid bg */}
          <div className="absolute inset-0 bg-cyber-grid-sm opacity-30 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: overview */}
            <div className="lg:col-span-5">
              <p className="font-mono-prem text-[10px] uppercase tracking-[0.22em] text-[#c81b1c] mb-3">
                ▸ {activeService.status}_layer
              </p>
              <h3 className="font-display font-bold text-white text-3xl lg:text-5xl tracking-tight mb-6">
                {activeService.title}
              </h3>
              <p className="font-mono-prem text-white/70 text-base leading-relaxed mb-8">
                {activeService.description}
              </p>

              <div className="flex items-center gap-3 p-4 bg-black border-l-2 border-[#c81b1c] relative">
                <div className="absolute inset-0 bg-[#c81b1c]/5" />
                <Check className="w-5 h-5 text-[#c81b1c] flex-shrink-0 relative" />
                <p className="font-mono-prem text-sm text-white/80 relative">
                  Live monitoring + instant founder alerts. You'll know before
                  the day ends.
                </p>
              </div>

              <a
                href="#trial"
                className="magnetic-btn group mt-8 inline-flex items-center gap-3 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold px-6 py-4 rounded-none transition-all overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Try this free for 7 days
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>

            {/* Right: features grid */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40">
                  included_features
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                <span className="font-mono-prem text-[10px] text-[#c81b1c]/60">
                  {activeService.features.length}_modules
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10">
                {activeService.features.map((feat, idx) => {
                  const FIcon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="group relative bg-black p-6 hover:bg-[#050505] transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      {/* Hover border glow */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-[#c81b1c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#c81b1c]/10 border border-[#c81b1c]/30 group-hover:bg-[#c81b1c]/20 transition-colors">
                          <FIcon className="w-5 h-5 text-[#c81b1c]" />
                        </div>
                        {feat.metric && (
                          <span className="font-mono-prem text-[9px] uppercase tracking-wider text-[#c81b1c]/60 px-2 py-0.5 border border-[#c81b1c]/20">
                            {feat.metric}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-semibold text-white text-lg mb-2 tracking-tight">
                        {feat.title}
                      </h4>
                      <p className="font-mono-prem text-xs text-white/50 leading-relaxed">
                        {feat.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
