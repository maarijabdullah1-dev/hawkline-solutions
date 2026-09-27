import { NextRequest, NextResponse } from "next/server";

// On-page searchable content index
const SEARCH_INDEX = [
  // Services
  {
    type: "service",
    title: "QA Service",
    description: "Full-day reports including cash variance and overall sales rep performance.",
    keywords: "qa quality assurance cash variance sales rep invoice transaction overcharge performance report daily",
    href: "#services",
  },
  {
    type: "service",
    title: "Live Surveillance",
    description: "Theft detection, sales rep monitoring, backroom duty checks, daily timesheets, store opening time verification.",
    keywords: "surveillance live theft monitoring sales rep backroom duty timesheet store opening hours camera",
    href: "#services",
  },
  {
    type: "service",
    title: "Reporting",
    description: "Daily sales, hourly, monthly, weekly performance, and competition reports.",
    keywords: "reporting daily sales hourly monthly weekly performance competition analytics insights",
    href: "#services",
  },
  // Service detail features
  {
    type: "feature",
    title: "Cash Variance Detection",
    description: "Catch every discrepancy between expected and actual cash at the end of each day.",
    keywords: "cash variance discrepancy money difference daily",
    href: "#services",
  },
  {
    type: "feature",
    title: "Sales Rep Performance",
    description: "Track each sales rep's invoice count, transaction quality, and customer overcharge detection.",
    keywords: "sales rep performance invoice transaction overcharge customer",
    href: "#services",
  },
  {
    type: "feature",
    title: "Theft Detection",
    description: "AI-driven monitoring to flag suspicious behavior at POS, backroom, and storage zones.",
    keywords: "theft steal stealing suspicious ai camera",
    href: "#services",
  },
  {
    type: "feature",
    title: "Daily Timesheet",
    description: "Auto-tracked sales rep attendance with store opening time verification.",
    keywords: "timesheet attendance opening time store hours shift",
    href: "#services",
  },
  {
    type: "feature",
    title: "Backroom Duty Compliance",
    description: "Ensure sales reps stay on the floor during active duty hours.",
    keywords: "backroom duty compliance floor sales rep",
    href: "#services",
  },
  // About
  {
    type: "page",
    title: "About Hawkline Solutions",
    description: "Premium retail security and operations intelligence platform founded by Maarij Abdullah.",
    keywords: "about company mission founder maarij abdullah",
    href: "#about",
  },
  // Trial
  {
    type: "offer",
    title: "7-Day Free Trial",
    description: "Book a 7-day free trial — no credit card required. Cancel anytime.",
    keywords: "trial free 7 days book demo offer",
    href: "#trial",
  },
  // Founder
  {
    type: "page",
    title: "Founder — Maarij Abdullah",
    description: "Reach the founder at connect@hawklinesolutions.com or +92 330 8194875.",
    keywords: "founder maarij abdullah contact email phone connect hawkline",
    href: "#founder",
  },
  // Contact
  {
    type: "page",
    title: "Contact",
    description: "Email: connect@hawklinesolutions.com — Phone: 0330-8194875",
    keywords: "contact email phone reach hawkline solutions",
    href: "#contact",
  },
];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() || "";
  if (!q || q.length < 2) {
    return NextResponse.json({ ok: true, results: [], query: q });
  }

  const results = SEARCH_INDEX.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
    return q.split(/\s+/).every((token) => haystack.includes(token));
  }).slice(0, 12);

  return NextResponse.json({ ok: true, results, count: results.length, query: q });
}
