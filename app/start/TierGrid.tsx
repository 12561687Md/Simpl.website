"use client";

import Link from "next/link";

const TIERS = [
  {
    name: "Simpl.scan",
    price: "Free",
    from: false,
    cadence: "",
    tag: "See what's broken",
    desc: "Your score out of 100, and the five things costing you the most.",
    bullets: [
      "SIMPL Score with a grade in every category",
      "Your five biggest problems, ranked by what they cost",
      "Full report with every finding, emailed free",
    ],
    highlight: false,
    cta: "See my score",
    href: "/",
    contact: false,
  },
  {
    name: "Simpl.core",
    price: "$497",
    from: true,
    cadence: "/ month",
    tag: "Get found",
    desc: "Your Google listing, your site's SEO, and tracking that shows what's working.",
    bullets: [
      "Your Google listing claimed, filled out, and watched",
      "Show up when people ask AI who to call",
      "Every call and form tracked to where it came from",
      "Your $247 strategy audit, included",
      "Monthly report: what moved, what's next",
    ],
    highlight: false,
    cta: "Get found",
    href: "#contact",
    contact: true,
  },
  {
    name: "Simpl.team",
    price: "$997",
    from: true,
    cadence: "/ month",
    tag: "Get booked",
    desc: "Core, plus a new website and the content that feeds it.",
    bullets: [
      "A new website, built and launched. $0 on a 3-month start",
      "Content written and posted for you",
      "Social posts written and scheduled",
      "Review requests that actually go out",
      "See exactly where you rank on Google and Maps",
    ],
    highlight: true,
    cta: "Get booked",
    href: "#contact",
    contact: true,
  },
  {
    name: "Simpl.pro",
    price: "$1,997",
    from: true,
    cadence: "/ month",
    tag: "Get your time back",
    desc: "Team, plus the work that turns traffic into booked jobs.",
    bullets: [
      "Landing pages built for the jobs you actually want",
      "More booked jobs out of the same traffic",
      "AI Response/Quoting Agent setup waived, you just cover the monthly",
      "A strategy call every month",
      "Multiple locations covered",
      "Priority turnaround on everything",
    ],
    highlight: false,
    cta: "Get my time back",
    href: "#contact",
    contact: true,
  },
];

function scrollToContact(e: React.MouseEvent) {
  e.preventDefault();
  document.querySelector("[data-section='contact']")?.scrollIntoView({ behavior: "smooth" });
}

export default function TierGrid() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {TIERS.map((t, i) => (
        <div key={t.name} className="grid-tier-row" style={{
          background: "var(--bg)",
          border: `1px solid ${t.highlight ? "var(--accent)" : "var(--rule)"}`,
          padding: "28px 32px",
          display: "grid",
          gridTemplateColumns: "minmax(160px, 200px) minmax(0, 1fr) auto",
          gap: "24px 36px",
          alignItems: "start",
          position: "relative",
        }}>
          {t.highlight && (
            <div className="mono" style={{ position: "absolute", top: -1, right: 24, background: "var(--accent)", color: "var(--accent-ink)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 12px", fontWeight: 600 }}>
              Best value
            </div>
          )}

          {/* Left: name + price */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg)", marginBottom: 6, opacity: 0.7 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
            {t.from && (
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
                Starting at
              </div>
            )}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 300 }}>{t.price}</span>
              {t.cadence && <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>{t.cadence}</span>}
            </div>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.tag}</div>
          </div>

          {/* Middle: description + bullets */}
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--fg)", margin: "0 0 14px" }}>{t.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
              {t.bullets.map((b) => (
                <div key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>+ {b}</div>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {t.contact ? (
              <a
                href="#contact"
                onClick={scrollToContact}
                aria-label={`${t.cta}: contact us about ${t.name}`}
                className={`tier-cta ${t.highlight ? "tier-cta-solid" : "tier-cta-ghost"}`}
              >
                {t.cta} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link href={t.href} aria-label={`${t.cta}: start now, free audit`} className="tier-cta tier-cta-ghost">
                {t.cta} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
