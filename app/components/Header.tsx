"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { RippleLink } from "@/components/ui/ripple-link";

const SERVICE_GROUPS = [
  {
    label: "Start here",
    items: [
      { href: "/services/website-build", label: "Custom Website", desc: "Free when you start on Team" },
      { href: "/services/quick-wins", label: "Quick Wins & Site Triage", desc: "Fix the leaks first" },
      { href: "/services/local-seo", label: "Local SEO & AI Search Visibility", desc: "Own local search" },
    ],
  },
  {
    label: "Scale up",
    items: [
      { href: "/services/paid-ads", label: "Paid Performance Marketing", desc: "Scale with ads" },
      { href: "/services/organic-growth", label: "Long-Term Organic Growth", desc: "Build lasting authority" },
      { href: "/services/strategy", label: "Fractional CMO & Strategy", desc: "Ongoing oversight" },
    ],
  },
];

const ALSO_AVAILABLE = [
  { label: "Google Business Profile", desc: "Own the local map" },
  { label: "AI Response/Quoting Agent", desc: "Never miss a lead" },
  { label: "Free Strategy Call", desc: "Free, once you've unlocked your scan" },
];

const RESOURCE_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/success-stories", label: "Success Stories" },
];

/** Solid gradient promo card shown at the edge of each mega-menu. */
function FeaturedCard({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="no-underline"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minWidth: 190,
        height: 180,
        borderRadius: 12,
        padding: 18,
        background: "radial-gradient(120% 140% at 100% 0%, rgba(255,255,255,0.22), transparent 60%), linear-gradient(155deg, #4372FF, #1A3699 70%)",
        border: "1px solid var(--rule)",
      }}
    >
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: "#fff" }}>{title}</div>
    </Link>
  );
}

/**
 * Simple, normal sticky header: big Simpl wordmark in the top-left, flat nav +
 * two hover mega-menus + CTA on the right. Replaced the old floating centre
 * "puck" that collapsed to a white circle on scroll — this is a standard bar
 * that just sticks to the top. Sits above the shared page starfield via z-index.
 */
export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  // Touch has no mouseleave: close any open menu on a tap outside the nav.
  React.useEffect(() => {
    if (!servicesOpen && !resourcesOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setResourcesOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [servicesOpen, resourcesOpen]);

  // Transparent over the hero (the starfield shows through the nav), then a
  // solid black bar once scrolled past most of the hero, for legibility.
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = (active: boolean) => (active ? "var(--accent)" : "var(--muted)");
  const linkClass = "no-underline whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]";
  const triggerClass = "flex cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(11,12,13,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div ref={navRef} className="relative mx-auto flex h-[92px] max-w-[1220px] items-center justify-between px-5 sm:px-8">
        {/* Big brand mark, top-left, like a normal header. */}
        <Link href="/" aria-label="Simpl home" className="no-underline flex flex-shrink-0 items-center">
          <SimplWordmark size={44} />
        </Link>

        {/* Centered nav (Owner-style), absolutely centred so it stays put
            regardless of the logo / CTA widths. inset-y-0 + items-center keeps
            it vertically centred in the taller bar. Hidden on mobile. */}
        <nav className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {/* Services mega-menu */}
          <div
            className="relative nav-trigger-wrap"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span
              onClick={() => {
                setResourcesOpen(false);
                setServicesOpen((v) => !v);
              }}
              className={triggerClass}
              style={{ color: pathname.startsWith("/services") ? "var(--accent)" : "var(--muted)" }}
            >
              Services
              <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {servicesOpen && (
              <div className="nav-dropdown-anchor absolute left-1/2 top-full -translate-x-1/2 pt-3" onClick={(e) => e.stopPropagation()}>
                <div className="nav-dropdown-panel flex overflow-hidden rounded-xl border shadow-2xl" style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}>
                  <div className="nav-dropdown-groups" style={{ display: "flex", gap: 36, padding: "20px 24px" }}>
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.label} style={{ minWidth: 220 }}>
                        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                          {group.label}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {group.items.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="no-underline flex items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 text-sm transition-colors hover:bg-[var(--bg-elev-2)]"
                              style={{ color: pathname === s.href ? "var(--accent)" : "var(--fg)" }}
                            >
                              <span>
                                <span style={{ display: "block", fontWeight: 500 }}>{s.label}</span>
                                <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{s.desc}</span>
                              </span>
                              <MoveRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--muted)" }} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ minWidth: 200 }}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                        Also available
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {ALSO_AVAILABLE.map((s) => (
                          <Link
                            key={s.label}
                            href="/start-now"
                            className="no-underline flex items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 text-sm transition-colors hover:bg-[var(--bg-elev-2)]"
                            style={{ color: "var(--fg)" }}
                          >
                            <span>
                              <span style={{ display: "block", fontWeight: 500 }}>{s.label}</span>
                              <span className="mono" style={{ display: "block", fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{s.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hide-mobile" style={{ borderLeft: "1px solid var(--rule)", padding: 16, display: "flex", alignItems: "center" }}>
                    <FeaturedCard eyebrow="Not sure where to start?" title="Start now, free audit, see what's actually broken." href="/" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing (/start) intentionally removed from the nav 2026-07-23:
              the page stays live "in reserve" but pricing is now a sales-call
              conversation, not a self-serve browse. Re-add the link here to
              restore it. */}
          <Link href="/how-it-works" className={linkClass} style={{ color: linkColor(pathname === "/how-it-works") }}>
            How it works
          </Link>
          <Link href="/about" className={linkClass} style={{ color: linkColor(pathname === "/about") }}>
            Why Simpl
          </Link>

          {/* Resources mega-menu */}
          <div
            className="relative nav-trigger-wrap"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <span
              onClick={() => {
                setServicesOpen(false);
                setResourcesOpen((v) => !v);
              }}
              className={triggerClass}
              style={{ color: RESOURCE_LINKS.some((r) => r.href === pathname) ? "var(--accent)" : "var(--muted)" }}
            >
              Resources
              <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {resourcesOpen && (
              <div className="nav-dropdown-anchor absolute right-0 top-full pt-3" onClick={(e) => e.stopPropagation()}>
                <div className="nav-dropdown-panel flex overflow-hidden rounded-xl border shadow-2xl" style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}>
                  <div style={{ minWidth: 190, padding: "20px 12px" }}>
                    {RESOURCE_LINKS.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        className="no-underline block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-elev-2)]"
                        style={{ color: pathname === r.href ? "var(--accent)" : "var(--fg)" }}
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>
                  <div className="hide-mobile" style={{ borderLeft: "1px solid var(--rule)", padding: 16, display: "flex", alignItems: "center" }}>
                    <FeaturedCard
                      eyebrow="From the blog"
                      title="How to rank higher on Google Maps, the local 3-pack explained."
                      href="/blog/how-to-rank-higher-on-google-maps"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right zone: primary CTA. */}
        <div className="flex flex-shrink-0 items-center">
          <RippleLink
            href="/start-now"
            className="cta-primary no-underline whitespace-nowrap inline-flex"
            style={{ color: "var(--accent-ink)", padding: "11px 20px", fontSize: 15, fontWeight: 600, borderRadius: 999, textDecoration: "none" }}
          >
            Start Now
          </RippleLink>
        </div>
      </div>
    </header>
  );
}
