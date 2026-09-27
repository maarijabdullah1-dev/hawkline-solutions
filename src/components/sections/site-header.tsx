"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X, Menu, ArrowRight } from "lucide-react";

interface SearchResult {
  type: string;
  title: string;
  description: string;
  href: string;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 180);
    return () => clearTimeout(t);
  }, [query]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Founder", href: "#founder" },
    { label: "Trial", href: "#trial" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1505px] px-6 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <Logo size={36} className="text-white transition-transform group-hover:rotate-90 duration-500" />
            <span className="font-display font-bold text-lg tracking-tight text-white hidden sm:inline">
              Hawkline<span className="text-[#c81b1c]">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono-prem text-[14px] text-white/80 hover:text-white hover:text-[#c81b1c] transition-colors tracking-tight"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-[#c81b1c] active:bg-white/10 transition-colors"
              style={{ touchAction: 'manipulation', minHeight: '44px', minWidth: '44px' }}
            >
              <Search className="w-[20px] h-[20px]" />
            </button>

            <a href="#trial" className="hidden sm:block">
              <Button
                className="bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold tracking-tight px-5 h-11 rounded-none transition-all group"
              >
                Book Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-white active:bg-white/10 transition-colors"
              aria-label="Open menu"
              style={{ touchAction: 'manipulation', minHeight: '44px', minWidth: '44px' }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c81b1c] origin-left transition-transform duration-500" style={{ transform: mobileOpen ? "scaleX(1)" : "scaleX(0)" }} />
        <div className="flex flex-col h-full px-6 pt-6 pb-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Logo size={32} className="text-white" />
              <span className="font-display font-bold text-white">Hawkline<span className="text-[#c81b1c]">.</span></span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-12 h-12 flex items-center justify-center text-white active:bg-white/10 transition-colors"
              style={{ touchAction: 'manipulation', minHeight: '44px', minWidth: '44px' }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="font-mono-prem text-[11px] uppercase tracking-[0.22em] text-white/40 mb-6">Menu</p>

          <nav className="flex flex-col">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display font-bold text-[28px] text-white py-5 border-t border-white/10 first:border-t-0 transition-colors hover:text-[#c81b1c] active:bg-white/5 active:text-[#c81b1c] block"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ${0.08 + i * 0.06}s, transform 0.5s ${0.08 + i * 0.06}s`,
                  touchAction: 'manipulation',
                  minHeight: '56px',
                  display: 'block',
                  width: '100%',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="#trial"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#c81b1c] hover:bg-[#b01617] text-white font-display font-semibold py-4 rounded-none"
            >
              Book Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="font-mono-prem text-[11px] text-white/40 text-center mt-4 tracking-wider">
              300+ clients &nbsp;/&nbsp; 99% satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="bg-black border-white/10 text-white max-w-2xl p-0 rounded-none overflow-hidden">
          <DialogHeader className="p-0">
            <DialogTitle className="sr-only">Search Hawkline Solutions</DialogTitle>
            <DialogDescription className="sr-only">
              Search across services, about, founder, trial, and contact sections.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <Search className="w-5 h-5 text-[#c81b1c] flex-shrink-0" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, features, about, contact…"
              className="bg-transparent border-0 text-white text-lg placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            />
            <kbd className="font-mono-prem text-[10px] text-white/40 px-2 py-1 border border-white/20">ESC</kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.length < 2 ? (
              <div className="px-5 py-10 text-center">
                <p className="font-mono-prem text-xs text-white/40 uppercase tracking-wider mb-3">Suggested</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["QA Service", "Live Surveillance", "Reporting", "Trial", "Founder"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="font-mono-prem text-xs text-white/70 px-3 py-1.5 border border-white/10 hover:border-[#c81b1c] hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchLoading ? (
              <div className="px-5 py-10 text-center font-mono-prem text-sm text-white/50">Scanning…</div>
            ) : results.length === 0 ? (
              <div className="px-5 py-10 text-center font-mono-prem text-sm text-white/50">
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {results.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.href}
                      onClick={() => setSearchOpen(false)}
                      className="block px-5 py-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono-prem text-[10px] uppercase tracking-wider text-[#c81b1c] mt-1 min-w-[60px]">
                          {r.type}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-white group-hover:text-[#c81b1c] transition-colors">
                            {r.title}
                          </p>
                          <p className="text-sm text-white/60 mt-1 line-clamp-2">{r.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#c81b1c] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
