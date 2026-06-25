import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Fractional CMO & Strategy",
  description:
    "Continuous data-driven direction to scale your entire digital presence. Monthly audits, competitor intelligence, and full attribution reporting.",
  alternates: { canonical: "https://simpl.pro/services/strategy" },
};

const INCLUDES = [
  "Monthly health audits across all six scoring categories",
  "Risk mitigation and regression prevention",
  "Competitor intelligence and market monitoring",
  "Market expansion blueprints",
  "Full attribution reporting across all channels",
  "Quarterly strategy reviews with priority roadmaps",
  "Cross-channel budget allocation guidance",
  "Executive-level performance dashboards",
];

export default function Strategy() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            05 / Fractional CMO & Strategy
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Fractional CMO & Strategy
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Continuous data-driven direction to scale your entire digital presence.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            The strategic layer that keeps everything aligned.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {INCLUDES.map((item) => (
              <div key={item} style={{ padding: "16px 20px", background: "var(--bg-soft)", border: "1px solid var(--rule)", fontSize: 15, lineHeight: 1.5 }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* The compounding effect */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            The compounding effect
          </div>
          <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Growth without oversight quietly destroys itself.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Reputation drift, technical regressions, algorithm updates, competitor moves. Any one of these can undo months of progress overnight. A fractional CMO watches the full picture so nothing slips. Monthly audits catch problems early. Quarterly reviews keep your strategy ahead of the market. And continuous attribution ensures every dollar goes where it works hardest.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* The full stack */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
              The full stack
            </div>
            <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
              Every layer builds on the one before it.
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Quick wins fix the foundation. Local SEO gets you found. Paid ads scale demand. Organic growth builds lasting assets. And strategy ties it all together. That is how you build a digital presence that compounds instead of one that constantly needs repair.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { label: "Quick Wins", href: "/services/quick-wins" },
                { label: "Local SEO", href: "/services/local-seo" },
                { label: "Paid Ads", href: "/services/paid-ads" },
                { label: "Organic Growth", href: "/services/organic-growth" },
              ].map((s) => (
                <a key={s.href} href={s.href} style={{ padding: "8px 16px", border: "1px solid var(--rule)", color: "var(--fg)", textDecoration: "none", fontSize: 14, borderRadius: 2, transition: "border-color 200ms ease, color 200ms ease" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Start with the scan. We will show you the full picture.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Every engagement starts with understanding where you stand today.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
