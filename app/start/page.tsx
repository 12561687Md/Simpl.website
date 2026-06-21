import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Choose your SIMPL plan — from basic monitoring to the complete digital presence package. 14-day free trial, no card required.",
  alternates: { canonical: "https://simpl.pro/start" },
};

const TIERS = [
  { name: "Solo", price: "$49", cadence: "/ month", desc: "One business. One domain. The four surfaces, watched continuously.", bullets: ["Hourly scans across all four surfaces", "Email + SMS alerts for findings", "Monthly health report", "Cancel anytime"], highlight: false },
  { name: "Pro", price: "$129", cadence: "/ month", desc: "Solo, plus the things SIMPL fixes for you instead of telling you about.", bullets: ["Everything in Solo", "Auto-remediation for top 30 finding types", "Priority alerts (within 15 minutes)", "Quarterly review with a human"], highlight: true },
  { name: "Agency", price: "Custom", cadence: "", desc: "For people watching ten or more sites. White-label dashboards, API, billing rollups.", bullets: ["Up to unlimited domains", "White-label client dashboards", "API + webhooks for your stack", "Dedicated support contact"], highlight: false },
];

export default function StartPage() {
  return (
    <div>
      <Header />
      <main>
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 96px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>Start</div>
          <h1 style={{ margin: 0, fontSize: "clamp(40px, 6.4vw, 81px)", lineHeight: 1.04, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 1000 }}>
            Three ways in.<br /><span style={{ color: "var(--muted)" }}>None of them require a sales call.</span>
          </h1>
          <p style={{ marginTop: 40, maxWidth: 680, fontSize: 19, lineHeight: 1.55 }}>
            Run a free scan. Pick a plan and turn on monitoring. Or send a note.
          </p>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px 120px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            <span style={{ color: "var(--accent)" }}>01</span> Just looking — run a free scan
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 41px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 720 }}>
            Type a domain. See your SIMPL Score. Decide from there.
          </h2>
          <div style={{ marginTop: 48 }}><ScanTool compact /></div>
        </section>

        <section id="plans" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
              <span style={{ color: "var(--accent)" }}>02</span> Ready — pick a plan
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 41px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 720 }}>
              Three tiers. One question — how much do you want SIMPL to do without asking?
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 580, marginTop: 20 }}>14-day trial on every plan. No card up front.</p>
            <div style={{ marginTop: 64, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {TIERS.map((t) => (
                <div key={t.name} style={{ display: "flex", flexDirection: "column", gap: 18, background: "var(--bg)", border: `1px solid ${t.highlight ? "var(--accent)" : "var(--rule)"}`, padding: "32px 28px 28px", minHeight: 360, position: "relative" }}>
                  {t.highlight && <div className="mono" style={{ position: "absolute", top: 16, right: 16, fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>Most picked</div>}
                  <div style={{ fontSize: 18, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 40, fontWeight: 400 }}>{t.price}</span>
                    {t.cadence && <span style={{ color: "var(--muted)", fontSize: 14 }}>{t.cadence}</span>}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>{t.desc}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10, marginTop: "auto" }}>
                    {t.bullets.map((b) => <li key={b} style={{ fontSize: 14 }}>+ {b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            <span style={{ color: "var(--accent)" }}>03</span> Something specific — send a note
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 41px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 720 }}>
            Agency, white-label, multi-site — write a paragraph, hear back same day.
          </h2>
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
            <ContactForm />
            <div style={{ display: "grid", gap: 32 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Reply window</div>
                <div style={{ fontSize: 17, lineHeight: 1.5 }}>Same business day, almost always within four hours.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>From</div>
                <div style={{ fontSize: 17, lineHeight: 1.5 }}>A person. Not a sequence. Not a calendar link first.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Direct</div>
                <a href="mailto:hi@simpl.pro" className="mono" style={{ fontSize: 14, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>hi@simpl.pro</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer tagline="Three ways in. None of them require a sales call." />
    </div>
  );
}
