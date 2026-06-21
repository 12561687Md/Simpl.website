"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/scan", label: "The Scan" },
  { href: "/discoverability", label: "Discoverability" },
  { href: "/performance", label: "Performance" },
  { href: "/reputation", label: "Reputation" },
  { href: "/spend", label: "Spend" },
];

export default function Header() {
  const pathname = usePathname();

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
        <nav
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            flexWrap: "wrap",
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
            Start →
          </Link>
        </nav>
      </div>
    </header>
  );
}
