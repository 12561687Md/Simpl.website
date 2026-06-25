"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/scan", label: "Free Scan" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/start", label: "Services" },
  { href: "/results", label: "Results" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
            letterSpacing: "0.32em",
            fontSize: 15,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: "var(--pulse)",
              borderRadius: 999,
            }}
          />
          SIMPL
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
          <Link
            href="/start"
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
            Get your score →
          </Link>
        </nav>

        {/* Mobile: Start button + hamburger */}
        <div className="mobile-nav" style={{ alignItems: "center", gap: 12 }}>
          <Link
            href="/start"
            className="cta-primary"
            style={{
              color: "var(--accent-ink)",
              textDecoration: "none",
              padding: "8px 14px",
              fontSize: 13,
              borderRadius: 2,
            }}
          >
            Get your score →
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
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
        </div>
      )}
    </header>
  );
}
