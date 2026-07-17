"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RippleLink } from "@/components/ui/ripple-link";

const NAV_ITEMS = [
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

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        backdropFilter: "saturate(140%) blur(14px)",
        WebkitBackdropFilter: "saturate(140%) blur(14px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "var(--fg)",
            fontWeight: 500,
            fontSize: 15,
            display: "inline-flex",
            alignItems: "center",
            gap: 0,
            flexShrink: 0,
          }}
        >
          <span style={{ letterSpacing: "0.28em" }}>SIMPL</span>
          <span className="pulse-dot" style={{ color: "var(--accent)", fontSize: 18, fontWeight: 600, lineHeight: 1, marginLeft: 2 }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${pathname === item.href ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span
              className={`nav-link${isServicesActive ? " active" : ""}`}
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginTop: 1 }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {servicesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: 8,
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    borderRadius: 4,
                    minWidth: 200,
                    overflow: "hidden",
                  }}
                >
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      style={{
                        display: "block",
                        padding: "12px 24px",
                        color: pathname === s.href ? "var(--accent)" : "var(--fg)",
                        textDecoration: "none",
                        fontSize: 14,
                        transition: "color 200ms ease, background 200ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                        e.currentTarget.style.background = "var(--accent-soft)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = pathname === s.href ? "var(--accent)" : "var(--fg)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/start"
            className={`nav-link${pathname === "/start" ? " active" : ""}`}
          >
            Pricing
          </Link>

          <RippleLink
            href="/what-am-i-missing"
            className="cta-primary"
            style={{
              color: "var(--accent-ink)",
              textDecoration: "none",
              padding: "10px 18px",
              fontSize: 14,
              letterSpacing: "0.02em",
              borderRadius: 2,
              marginLeft: 8,
            }}
          >
            What am I missing? →
          </RippleLink>
        </nav>

        {/* Mobile: Start button + hamburger */}
        <div className="mobile-nav" style={{ alignItems: "center", gap: 12 }}>
          <RippleLink
            href="/what-am-i-missing"
            className="cta-primary"
            style={{
              color: "var(--accent-ink)",
              textDecoration: "none",
              padding: "8px 14px",
              fontSize: 13,
              borderRadius: 2,
            }}
          >
            What am I missing? →
          </RippleLink>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--fg)",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              minWidth: 48,
              minHeight: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: "var(--fg)", borderRadius: 1, transition: "transform 0.2s ease", transformOrigin: "center", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "var(--fg)", borderRadius: 1, transition: "opacity 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "var(--fg)", borderRadius: 1, transition: "transform 0.2s ease", transformOrigin: "center", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-nav" style={{
          borderTop: "1px solid var(--rule)",
          background: "var(--bg)",
          padding: "16px 32px 20px",
          flexDirection: "column",
          gap: 4,
        }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: pathname === item.href ? "var(--accent)" : "var(--fg)",
                textDecoration: "none",
                fontSize: 16,
                padding: "12px 0",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              padding: "16px 0 4px",
            }}
          >
            Services
          </div>
          {SERVICE_LINKS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: pathname === s.href ? "var(--accent)" : "var(--fg)",
                textDecoration: "none",
                fontSize: 16,
                padding: "12px 0 12px 12px",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/start"
            onClick={() => setMenuOpen(false)}
            style={{
              color: pathname === "/start" ? "var(--accent)" : "var(--fg)",
              textDecoration: "none",
              fontSize: 16,
              padding: "12px 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            Pricing
          </Link>
        </div>
      )}
    </header>
  );
}
