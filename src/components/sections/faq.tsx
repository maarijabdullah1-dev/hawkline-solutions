"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What exactly does the 7-day free trial include?",
    a: "Full platform access — every feature, every report, every alert. No credit card required. Founder Maarij Abdullah personally handles your onboarding call on day one. You'll receive your first daily report by 9 PM on the same day you go live. After 7 days, you decide — keep going with a paid plan or walk away with all the insights you've already generated.",
    category: "Trial",
  },
  {
    q: "How quickly can I go live after signing up?",
    a: "Most stores are live within 24 hours of the discovery call. Standard POS integrations take under 2 hours. Camera and shift management integrations typically complete within 4 hours. Our team handles all technical setup — no engineering required from your side.",
    category: "Setup",
  },
  {
    q: "Do I need to install any hardware or software?",
    a: "No. Hawkline is a software layer that integrates with your existing POS system, security cameras, and shift management tools. If your store has standard IP cameras and a modern POS, integration is fully remote. We'll confirm compatibility during your discovery call.",
    category: "Setup",
  },
  {
    q: "How are theft alerts delivered to me?",
    a: "Real-time alerts are delivered via three channels simultaneously: (1) Push notification to the Hawkline mobile app, (2) Email to your registered address, (3) WhatsApp message for critical events. You can configure thresholds and channels in your dashboard. Most alerts arrive within 30 seconds of the detected event.",
    category: "Alerts",
  },
  {
    q: "What types of theft can Hawkline actually detect?",
    a: "Five primary categories: (1) Cash skimming at POS, (2) Fake refunds and voided transactions, (3) Unauthorized discounts to friends/family, (4) Backroom inventory theft, (5) Sales rep collusion patterns. Each alert includes video footage, transaction details, and rep identification.",
    category: "Security",
  },
  {
    q: "How does the sales rep performance monitoring work?",
    a: "Each transaction is logged with rep ID, timestamp, amount, and video timestamp. The system builds per-rep scorecards tracking: invoice count, average ticket size, refund ratio, discount frequency, and customer overcharge patterns. Anomalies flag automatically. You can compare reps across stores and shifts.",
    category: "Monitoring",
  },
  {
    q: "Is my data secure? Who can access it?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Access is role-based — only you and the team members you authorize can view data. Founder Maarij Abdullah has access for support purposes only, with full audit logging. We are SOC2-ready and never sell or share your data with third parties.",
    category: "Security",
  },
  {
    q: "What happens if I cancel after the trial?",
    a: "You keep every report, alert log, and insight generated during the trial. We export your data as CSV/PDF and email it to you. No lock-in — your data is yours. If you decide to return within 90 days, we'll restore your historical context so you don't lose continuity.",
    category: "Trial",
  },
  {
    q: "How much does Hawkline cost after the free trial?",
    a: "Pricing scales with the number of stores and services you need. Single-store operators typically pay $199/month for full access. Multi-store chains receive volume discounts. The founder will walk you through pricing during your discovery call based on your specific needs. There are no setup fees.",
    category: "Pricing",
  },
  {
    q: "Can Hawkline integrate with my existing POS system?",
    a: "We support all major POS systems including Shopify POS, Square, Lightspeed, Toast, Clover, Vend, and most custom-built systems via API. If you have a proprietary POS, our team will build a custom integration at no extra cost during your trial.",
    category: "Setup",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];
  const filtered = filter === "All" ? FAQS : FAQS.filter((f) => f.category === filter);

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="relative mx-auto max-w-[1505px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-4">
            <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-[#c81b1c] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c81b1c] animate-pulse-red" />
              <span className="w-8 h-px bg-[#c81b1c]" />
              faq
            </p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
              Questions,
              <br />
              <span className="text-white/40">answered.</span>
            </h2>
            <p className="font-mono-prem text-white/60 text-sm leading-relaxed mb-8">
              Common questions from founders evaluating Hawkline. Can't find what
              you're looking for?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono-prem text-xs text-[#c81b1c] hover:text-white border-b border-[#c81b1c]/30 hover:border-white pb-1 transition-colors"
            >
              Talk to the founder directly →
            </a>

            {/* Category filters */}
            <div className="mt-12">
              <p className="font-mono-prem text-[10px] uppercase tracking-wider text-white/40 mb-3">
                filter_by_category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setOpenIdx(null); }}
                    style={{ touchAction: 'manipulation' }}
                    className={`font-mono-prem text-[11px] uppercase tracking-wider px-3 py-1.5 border transition-all ${
                      filter === cat
                        ? "border-[#c81b1c] bg-[#c81b1c]/10 text-[#c81b1c]"
                        : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - FAQ items */}
          <div className="lg:col-span-8">
            <div className="space-y-px bg-white/5 border border-white/10">
              {filtered.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div
                    key={`${filter}-${i}`}
                    className="bg-black transition-colors"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      style={{ touchAction: 'manipulation' }}
                      className="w-full text-left p-6 lg:p-8 flex items-start gap-4 group"
                    >
                      <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-colors ${
                        isOpen ? "border-[#c81b1c] bg-[#c81b1c]/10" : "border-white/20"
                      }`}>
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#c81b1c]" />
                        ) : (
                          <Plus className="w-4 h-4 text-white/60 group-hover:text-[#c81b1c]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono-prem text-[10px] uppercase tracking-wider text-[#c81b1c]/60">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-mono-prem text-[9px] uppercase tracking-wider text-white/30 px-2 py-0.5 border border-white/10">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`font-display font-semibold text-lg lg:text-xl tracking-tight transition-colors ${
                          isOpen ? "text-white" : "text-white/90 group-hover:text-white"
                        }`}>
                          {faq.q}
                        </h3>
                      </div>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? '500px' : '0' }}
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-[72px]">
                        <p className="font-mono-prem text-sm text-white/70 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
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
