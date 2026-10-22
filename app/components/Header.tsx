"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveRight, Menu, X, LogIn } from "lucide-react";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { RippleLink } from "@/components/ui/ripple-link";
import { GROWTH_SERVICES, EASY_WINS, INDUSTRIES, RESOURCES, SITE, type NavItem } from "../lib/site";

/**
 * Revamp 2026-10: the header leads with the Account Engine. Services (growth
 * stack first, easy wins second), Industries, Pricing, Free tools, Resources,
 * plus a Client login link (to yourcompany.simpl.pro) and the one primary CTA.
 * Nav data lives in app/lib/site.ts.
 */

type MenuKey = "services" | "industries" | "resources" | null;

function MenuLinks({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((s) => (
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
  );
}

const groupLabel: React.CSSProperties = { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 };

function FeaturedCard({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="no-underline"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: 210,
        minHeight: 180,
        borderRadius: 12,
        padding: 18,
        background: "radial-gradient(120% 140% at 100% 0%, rgba(137,207,240,0.35), transparent 60%), linear-gradient(155deg, #1d3a4d, #0f1d27 75%)",
        border: "1px solid var(--accent-line)",
      }}
    >
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: "#fff" }}>{title}</div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = React.useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const linkClass = "no-underline whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]";
  const triggerClass = "flex cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)] bg-transparent border-0";

  const trigger = (k: Exclude<MenuKey, null>, label: string, isActive: boolean) => (
    <button
      type="button"
      aria-expanded={open === k}
      aria-haspopup="true"
      onClick={() => setOpen((v) => (v === k ? null : k))}
      className={triggerClass}
      style={{ color: isActive || open === k ? "var(--accent)" : "var(--muted)", fontFamily: "inherit" }}
    >
      {label}
      <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );

  const panel = (children: React.ReactNode, align: "center" | "right" = "center") => (
    <div
      className={`absolute top-full pt-3 ${align === "center" ? "left-1/2 -translate-x-1/2" : "right-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex overflow-hidden rounded-xl border shadow-2xl" style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}>
        {children}
      </div>
    </div>
  );

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(11,12,13,0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div ref={navRef} className="relative mx-auto flex h-[84px] max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Simpl home" className="no-underline flex flex-shrink-0 items-center">
          <SimplWordmark size={40} />
        </Link>

        <nav aria-label="Main" className="eg-nav-desktop items-center gap-0.5">
          <div className="relative" onMouseEnter={() => setOpen("services")} onMouseLeave={() => setOpen(null)}>
            {trigger("services", "Services", active("/services"))}
            {open === "services" &&
              panel(
                <>
                  <div style={{ display: "flex", gap: 32, padding: "20px 22px" }}>
                    <div style={{ minWidth: 250 }}>
                      <div className="mono" style={groupLabel}>Growth engine</div>
                      <MenuLinks items={GROWTH_SERVICES} pathname={pathname} />
                    </div>
                    <div style={{ minWidth: 230 }}>
                      <div className="mono" style={groupLabel}>Also handled</div>
                      <MenuLinks items={EASY_WINS} pathname={pathname} />
                    </div>
                  </div>
                  <div style={{ borderLeft: "1px solid var(--rule)", padding: 16, display: "flex", alignItems: "center" }}>
                    <FeaturedCard eyebrow="Before you pay anything" title="See your own top 25 accounts, with the reason and the record." href="/top-25" />
                  </div>
                </>
              )}
          </div>

          <div className="relative" onMouseEnter={() => setOpen("industries")} onMouseLeave={() => setOpen(null)}>
            {trigger("industries", "Industries", active("/industries"))}
            {open === "industries" &&
              panel(
                <div style={{ padding: "20px 22px", minWidth: 300 }}>
                  <div className="mono" style={groupLabel}>Who we build for</div>
                  <MenuLinks items={INDUSTRIES} pathname={pathname} />
                  <Link href="/industries" className="no-underline mono" style={{ display: "block", marginTop: 10, padding: "8px 10px", fontSize: 11.5, letterSpacing: "0.06em", color: "var(--accent)" }}>
                    All industries &rarr;
                  </Link>
                </div>
              )}
          </div>

          <Link href="/pricing" className={linkClass} style={{ color: active("/pricing") ? "var(--accent)" : "var(--muted)" }}>Pricing</Link>
          <Link href="/free-tools" className={linkClass} style={{ color: active("/free-tools") ? "var(--accent)" : "var(--muted)" }}>Free tools</Link>

          <div className="relative" onMouseEnter={() => setOpen("resources")} onMouseLeave={() => setOpen(null)}>
            {trigger("resources", "Resources", RESOURCES.some((r) => active(r.href)))}
            {open === "resources" &&
              panel(
                <div style={{ padding: "20px 22px", minWidth: 250 }}>
                  <MenuLinks items={RESOURCES} pathname={pathname} />
                </div>,
                "right"
              )}
          </div>
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="eg-login-link no-underline items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[14px] font-medium transition-colors hover:text-[var(--fg)]"
            style={{ color: active("/login") ? "var(--accent)" : "var(--muted)" }}
          >
            <LogIn className="h-4 w-4" aria-hidden="true" /> Client login
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="eg-nav-toggle items-center justify-center"
            style={{ width: 42, height: 42, borderRadius: 10, border: "1px solid var(--rule-strong)", background: "transparent", color: "var(--fg)", cursor: "pointer" }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <RippleLink
            href={SITE.primaryCta.href}
            trigger="hover"
            className="cta-primary no-underline whitespace-nowrap inline-flex"
            style={{ color: "var(--accent-ink)", padding: "11px 18px", fontSize: 15, fontWeight: 600, borderRadius: 999, textDecoration: "none" }}
          >
            See your top 25
          </RippleLink>
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            background: "rgba(11,12,13,0.98)",
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
            maxHeight: "calc(100vh - 84px)",
            overflowY: "auto",
          }}
        >
          <nav aria-label="Mobile" style={{ padding: "18px 20px 28px", display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Growth engine", items: GROWTH_SERVICES },
              { label: "Also handled", items: EASY_WINS },
              { label: "Industries", items: INDUSTRIES },
              {
                label: "Company",
                items: [
                  { href: "/pricing", label: "Pricing", desc: "" },
                  { href: "/free-tools", label: "Free tools", desc: "" },
                  ...RESOURCES,
                  { href: "/login", label: "Client login", desc: "" },
                ],
              },
            ].map((g) => (
              <div key={g.label}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", margin: "14px 0 6px" }}>{g.label}</div>
                {g.items.map((s) => (
                  <Link key={s.href} href={s.href} className="no-underline" style={{ display: "block", padding: "10px 8px", fontSize: 16, color: active(s.href) ? "var(--accent)" : "var(--fg)", borderRadius: 8 }}>
                    {s.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href={SITE.primaryCta.href}
              className="cta-primary no-underline"
              style={{ marginTop: 18, textAlign: "center", color: "var(--accent-ink)", padding: "14px 20px", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none" }}
            >
              {SITE.primaryCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
