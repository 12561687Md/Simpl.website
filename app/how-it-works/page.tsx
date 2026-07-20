import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How It Works | Simpl",
  description: "From a free scan to a working plan: exactly what happens, in order.",
  alternates: { canonical: "https://simpl.pro/how-it-works" },
};

const STEPS = [
  {
    n: "01",
    h: "You scan your business. Free.",
    p: "Type your business name or your URL. No signup for the surface score. Simpl checks Website Foundation, SEO & Rankings, Content & Pages, Advertising & Socials, CRM & Reputation, and your Google Business Profile, six categories, one number.",
  },
  {
    n: "02",
    h: "You see exactly what's broken.",
    p: "A grade from A to F on every category, findings ranked by severity, and plain English throughout. Not \"optimize meta descriptions,\" but \"Google can't tell what your site is about.\"",
  },
  {
    n: "03",
    h: "We build a real plan, not a pitch.",
    p: "The free breakdown maps every finding against what it's actually costing you and the order to fix it in. Same breakdown whether you sign with us or not, then a free strategy call if you want to talk it through.",
  },
  {
    n: "04",
    h: "You pick a tier, or none at all.",
    p: "Core gets your listing and SEO in order. Team adds a free website build and content. Pro adds paid ads and monthly strategy. Or take the findings and fix them yourself, the report is yours either way.",
  },
  {
    n: "05",
    h: "We execute, and you watch the score move.",
    p: "One team handles the work directly, no account manager relay, no five vendors. Monthly reporting shows the delta, not just activity, whether you're actually winning more customers than last month.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <Header />
      <main>
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "150px 32px 60px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            How it works
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.06, letterSpacing: "-0.025em", fontWeight: 500, maxWidth: 900 }}>
            Five steps from &ldquo;what&apos;s broken&rdquo; to &ldquo;it&apos;s fixed.&rdquo;
          </h1>
          <p style={{ marginTop: 32, maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            No demo call required to see where you stand. Here&apos;s the exact sequence, start to finish.
          </p>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 32px 120px" }}>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  background: "var(--bg)",
                  padding: "36px 36px",
                  display: "grid",
                  gridTemplateColumns: "60px minmax(220px, 1fr) minmax(0, 2fr)",
                  gap: 28,
                  alignItems: "baseline",
                }}
              >
                <div className="mono" style={{ color: "var(--fg)", fontSize: 13 }}>{s.n}</div>
                <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{s.h}</h2>
                <div style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6 }}>{s.p}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <Link
              href="/"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "14px 26px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
            >
              Start with your free scan →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
