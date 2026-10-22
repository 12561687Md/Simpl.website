"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, Phone } from "lucide-react";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { GROWTH_SERVICES, LOCAL_SERVICES, INDUSTRIES, RESOURCES, COMPANY, SITE, CASE_STUDY, type NavItem } from "../lib/site";

/**
 * Site header (revamp 2026-10-22).
 *
 * Two rows, the Shop Positioner pattern, restrained: a thin utility strip
 * (phone, Book a call, Client login) and the main bar (logo, five nav items,
 * one primary CTA). Five items plus the CTA fit at 1280px without wrapping;
 * below 1080px it collapses to a menu button. Nav data lives in app/lib/site.ts.
 */

type MenuKey = "industries" | "services" | "resources" | null;

function Items({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <>
      {items.map((s) => (
        <Link key={s.href} href={s.href} className="item" style={pathname === s.href ? { color: "#89CFF0" } : undefined}>
          <span>
            {s.label}
            <small>{s.desc}</small>
          </span>
          <span aria-hidden="true" style={{ color: "#8A8983" }}>&rarr;</span>
        </Link>
      ))}
    </>
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = React.useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const Drop = ({ k, label, isActive, children }: { k: Exclude<MenuKey, null>; label: string; isActive: boolean; children: React.ReactNode }) => (
    <div onMouseEnter={() => setOpen(k)} onMouseLeave={() => setOpen(null)}>
      <button type="button" aria-expanded={open === k} aria-haspopup="true" onClick={() => setOpen((v) => (v === k ? null : k))} className={isActive || open === k ? "on" : undefined}>
        {label}
        <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open === k && (
        <div className="sh-panel" onClick={(e) => e.stopPropagation()}>
          <div className="box">{children}</div>
        </div>
      )}
    </div>
  );

  return (
    <header className="sh">
      <div className="sh-util">
        <div className="eg-wrap">
          <span className="tag">Client acquisition for B2B teams. Local SEO for service businesses.</span>
          <div className="r">
            <a href={SITE.phoneHref} className="hide-sm ph"><Phone size={13} aria-hidden="true" /> {SITE.phone}</a>
            <Link href={SITE.book.href} className="hide-sm">{SITE.book.label}</Link>
            <Link href={SITE.login.href}><LogIn size={13} aria-hidden="true" /> {SITE.login.label}</Link>
          </div>
        </div>
      </div>

      <div className={`sh-bar${scrolled || mobileOpen ? " scrolled" : ""}`}>
        <div className="eg-wrap" ref={navRef}>
          <Link href="/" aria-label="Simpl home" className="no-underline" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <SimplWordmark size={36} />
          </Link>

          <nav aria-label="Main" className="sh-nav">
            <Link href="/services/account-engine" className={active("/services/account-engine") ? "on" : undefined}>Account Engine</Link>
            <Drop k="industries" label="Industries" isActive={active("/industries")}>
              <div className="col">
                <div className="grp">Who we build for</div>
                <Items items={INDUSTRIES} pathname={pathname} />
                <Link href="/industries" className="item" style={{ color: "#89CFF0", fontSize: 13.5 }}>All industries</Link>
              </div>
            </Drop>
            <Drop k="services" label="Services" isActive={active("/services") && !active("/services/account-engine")}>
              <div className="col">
                <div className="grp">B2B client acquisition</div>
                <Items items={GROWTH_SERVICES} pathname={pathname} />
              </div>
              <div className="col">
                <div className="grp">Local businesses</div>
                <Items items={LOCAL_SERVICES} pathname={pathname} />
                <Link href="/services" className="item" style={{ color: "#89CFF0", fontSize: 13.5 }}>All services</Link>
              </div>
            </Drop>
            <Link href={CASE_STUDY.href} className={active("/case-studies") ? "on" : undefined}>Case study</Link>
            <Drop k="resources" label="Resources" isActive={["/blog", "/faq", "/free-tools", "/about"].some(active)}>
              <div className="col">
                <Items items={[...RESOURCES.filter((r) => r.href !== CASE_STUDY.href), COMPANY[0]]} pathname={pathname} />
              </div>
            </Drop>
          </nav>

          <div className="sh-right">
            <Link href={SITE.primaryCta.href} className="eg-btn primary sh-cta" style={{ ["--btn-bg" as string]: "#89CFF0", ["--btn-fg" as string]: "#071219", ["--btn-glow" as string]: "rgba(137,207,240,0.5)" }}>
              {SITE.primaryCta.label}
            </Link>
            <button type="button" className="sh-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sh-mobile">
          <nav aria-label="Mobile">
            {[
              { label: "B2B client acquisition", items: GROWTH_SERVICES },
              { label: "Industries", items: [...INDUSTRIES, { href: "/industries", label: "All industries", desc: "" }] },
              { label: "Local businesses", items: [...LOCAL_SERVICES, { href: "/services", label: "All services", desc: "" }] },
              { label: "Resources", items: [...RESOURCES, ...COMPANY] },
            ].map((g) => (
              <div key={g.label}>
                <div className="grp">{g.label}</div>
                {g.items.map((s) => (
                  <Link key={s.href} href={s.href} style={active(s.href) ? { color: "#89CFF0" } : undefined}>{s.label}</Link>
                ))}
              </div>
            ))}
            <Link href={SITE.primaryCta.href} className="eg-btn primary" style={{ marginTop: 20, width: "100%", ["--btn-bg" as string]: "#89CFF0", ["--btn-fg" as string]: "#071219", color: "#071219" }}>
              {SITE.primaryCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
