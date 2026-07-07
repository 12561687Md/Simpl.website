"use client";

import Link from "next/link";

const TIERS = [
  {
    name: "Simpl.scanner",
    price: "Free",
    cadence: "",
    tag: "See what's broken",
    desc: "Run a free diagnostic on any website in 30 seconds. No signup, no email, no credit card. You get a score out of 100 and your five biggest problems, ranked by how much they cost you. Most businesses score between 40 and 65. Where do you fall?",
    bullets: [
      "SIMPL Score (0 to 100) with category grades",
      "Top 5 issues ranked by revenue impact",
      "Business identity and industry detection",
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
    cadence: "/ month",
    tag: "We fix it",
    desc: "Most of what's in your report, we can fix in the first 30 days. Hand us the findings and we handle the rest: GBP optimization, on-page SEO, schema markup, the technical work that actually moves your ranking. You stop Googling how to fix things. We start fixing them.",
    bullets: [
      "GBP claimed, optimized, and monitored",
      "On-page SEO fixes across your site",
      "Schema markup so Google understands your business",
      "Monthly progress report with before and after scores",
    ],
    highlight: false,
    cta: "Let's fix this",
    href: "#contact",
    contact: true,
  },
  {
    name: "Simpl.team",
    price: "$997",
    cadence: "/ month",
    tag: "Full optimization",
    desc: "Stop losing leads to competitors who showed up first. Core fixes the foundation, but most businesses need more than SEO patches. We rebuild what's broken: your website, your content, your social presence, your local visibility. This is the full digital presence, handled by our team so you can run your business.",
    bullets: [
      "Everything in Core",
      "Website audit, fixes, and ongoing improvements",
      "Content strategy and creation",
      "Social media setup and management",
      "Local SEO and citation building",
    ],
    highlight: true,
    cta: "Let's fix this",
    href: "#contact",
    contact: true,
  },
  {
    name: "Simpl.pro",
    price: "$1,997",
    cadence: "/ month",
    tag: "Growth mode",
    desc: "For businesses ready to grow, not just fix. Everything our team handles, plus paid advertising, advanced content, and direct consulting with our strategists. You stop wondering what to do next. We bring the plan, the execution, and the numbers to prove it's working.",
    bullets: [
      "Everything in Simpl.team",
      "Google Ads and Meta Ads management",
      "LSA and RSA campaign setup",
      "Content creation and posting",
      "Monthly strategy consulting",
    ],
    highlight: false,
    cta: "Let's fix this",
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
              Most Popular
            </div>
          )}

          {/* Left: name + price */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6, opacity: 0.7 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
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
              <a href="#contact" onClick={scrollToContact} style={{
                padding: "10px 20px", fontSize: 13, borderRadius: 3, textDecoration: "none", whiteSpace: "nowrap", cursor: "pointer",
                ...(t.highlight
                  ? { background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600 }
                  : { border: "1px solid var(--rule)", color: "var(--fg)" }),
              }}>
                {t.cta} →
              </a>
            ) : (
              <Link href={t.href} style={{
                padding: "10px 20px", fontSize: 13, borderRadius: 3, textDecoration: "none", whiteSpace: "nowrap",
                border: "1px solid var(--rule)", color: "var(--fg)",
              }}>
                {t.cta} →
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
