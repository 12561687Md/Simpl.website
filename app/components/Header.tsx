"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { NAV, SITE } from "../lib/site";

/**
 * Site header (market intelligence site, 2026-11-20). Logo, four links, one
 * CTA. Below 1080px the links fold into a menu button; the CTA stays visible.
 */
export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = (href: string): "page" | undefined => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  return (
    <header className={`m-head${scrolled ? " scrolled" : ""}`}>
      <div className="m-wrap">
        <div className="bar">
          <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex" }}>
            <SimplWordmark size={26} />
          </Link>
          <nav className="main" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="right">
            <Link href={SITE.primaryCta.href} className="m-btn primary">
              {SITE.primaryCta.label}
            </Link>
            <button type="button" className="burger" aria-expanded={open} aria-controls="m-mnav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <nav id="m-mnav" className="m-mnav" hidden={!open} aria-label="Menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>
              {n.label}
            </Link>
          ))}
          <Link href="/login">Client login</Link>
        </nav>
      </div>
    </header>
  );
}
