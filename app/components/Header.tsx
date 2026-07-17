"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveRight, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RippleLink } from "@/components/ui/ripple-link";

const NAV_LINKS = [
  { href: "/scan", label: "Free Scan" },
  { href: "/about", label: "Why SIMPL" },
];

const SERVICE_LINKS = [
  { href: "/services/quick-wins", label: "Quick Wins" },
  { href: "/services/local-seo", label: "Local SEO" },
  { href: "/services/paid-ads", label: "Paid Ads" },
  { href: "/services/organic-growth", label: "Organic Growth" },
  { href: "/services/strategy", label: "Strategy" },
];

function Logo() {
  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "var(--fg)", fontWeight: 500, fontSize: 15, display: "inline-flex", alignItems: "center", flexShrink: 0 }}
    >
      <span style={{ letterSpacing: "0.28em" }}>SIMPL</span>
      <span className="pulse-dot" style={{ color: "var(--accent)", fontSize: 18, fontWeight: 600, lineHeight: 1, marginLeft: 2 }}>.</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isServicesActive = pathname.startsWith("/services");
  const activeStyle = (on: boolean) => (on ? { color: "var(--accent)" } : undefined);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        backdropFilter: "saturate(140%) blur(14px)",
        WebkitBackdropFilter: "saturate(140%) blur(14px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="mx-auto flex min-h-[72px] max-w-[1120px] flex-row items-center gap-4 px-8 lg:grid lg:grid-cols-3">
        {/* Left: nav (desktop) */}
        <div className="hidden flex-row items-center justify-start gap-2 lg:flex">
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex flex-row justify-start gap-1">
              {NAV_LINKS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className={navigationMenuTriggerStyle()} style={activeStyle(pathname === item.href)}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Services mega-dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger style={activeStyle(isServicesActive)}>Services</NavigationMenuTrigger>
                <NavigationMenuContent className="!w-[460px] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex flex-col">
                        <p className="text-base" style={{ color: "var(--fg)" }}>Services</p>
                        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                          Pick the lane that fits what&apos;s broken. Every engagement starts with your SIMPL Score.
                        </p>
                      </div>
                      <RippleLink
                        href="/what-am-i-missing"
                        className="cta-primary mt-8 inline-flex items-center justify-center rounded-[3px]"
                        style={{ color: "var(--accent-ink)", padding: "9px 16px", fontSize: 13, fontWeight: 600 }}
                      >
                        What am I missing? →
                      </RippleLink>
                    </div>
                    <div className="flex h-full flex-col justify-start text-sm">
                      {SERVICE_LINKS.map((s) => (
                        <NavigationMenuLink asChild key={s.href}>
                          <Link
                            href={s.href}
                            className="flex flex-row items-center justify-between rounded px-3 py-2 transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--accent)]"
                            style={{ color: pathname === s.href ? "var(--accent)" : "var(--fg)" }}
                          >
                            <span>{s.label}</span>
                            <MoveRight className="h-4 w-4" style={{ color: "var(--muted)" }} />
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/start" className={navigationMenuTriggerStyle()} style={activeStyle(pathname === "/start")}>
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center: logo */}
        <div className="flex flex-1 items-center lg:flex-none lg:justify-center">
          <Logo />
        </div>

        {/* Right: primary CTA (desktop) + hamburger (mobile) */}
        <div className="flex items-center justify-end gap-3">
          <RippleLink
            href="/what-am-i-missing"
            className="cta-primary hidden lg:inline-flex"
            style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "10px 18px", fontSize: 14, letterSpacing: "0.02em", borderRadius: 2 }}
          >
            What am I missing? →
          </RippleLink>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden"
            style={{ background: "transparent", border: 0, color: "var(--fg)", cursor: "pointer", padding: 8, display: "inline-flex", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{ borderTop: "1px solid var(--rule)", background: "var(--bg)", padding: "16px 32px 22px", display: "flex", flexDirection: "column", gap: 4 }}
        >
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ color: pathname === item.href ? "var(--accent)" : "var(--fg)", textDecoration: "none", fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
              {item.label}
            </Link>
          ))}
          <div style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", padding: "16px 0 4px" }}>
            Services
          </div>
          {SERVICE_LINKS.map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)}
              style={{ color: pathname === s.href ? "var(--accent)" : "var(--fg)", textDecoration: "none", fontSize: 16, padding: "12px 0 12px 12px", borderBottom: "1px solid var(--rule)" }}>
              {s.label}
            </Link>
          ))}
          <Link href="/start" onClick={() => setMenuOpen(false)}
            style={{ color: pathname === "/start" ? "var(--accent)" : "var(--fg)", textDecoration: "none", fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
            Pricing
          </Link>
          <RippleLink href="/what-am-i-missing" className="cta-primary"
            style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "12px 18px", fontSize: 15, borderRadius: 2, marginTop: 14, textAlign: "center", justifyContent: "center" }}>
            What am I missing? →
          </RippleLink>
        </div>
      )}
    </header>
  );
}
