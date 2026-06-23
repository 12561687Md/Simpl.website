import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Get Started | SIMPL",
  description: "From a free scan to a full team running your digital presence. Six ways to work with SIMPL. Pick where you are.",
  alternates: { canonical: "https://simpl.pro/start" },
};

const TIERS = [
  {
    name: "Simpl.scanner",
    price: "Free",
    cadence: "",
    tag: "See what's broken",
    desc: "Run the scan, get your SIMPL Score, see your top issues. No signup, no email, no strings.",
    bullets: ["SIMPL Score (0–100)", "Top 5 findings by severity", "Category grades at a glance", "Business identification"],
    highlight: false,
    cta: "Run a scan",
    href: "/",
  },
  {
    name: "Simpl.report",
    price: "TBD",
    cadence: "",
    tag: "See everything",
    desc: "The complete audit: every finding, every category, priority order. Know exactly what to fix and where to start.",
    bullets: ["Full audit across all 6 categories", "Every finding with severity + priority", "Social presence breakdown", "Delivered to your inbox in seconds"],
    highlight: false,
    cta: "Get your report",
    href: "/",
  },
  {
    name: "Simpl.core",
    price: "TBD",
    cadence: "/ month",
    tag: "We fix it",
    desc: "Hand us the report. We fix the problems: GBP optimization, on-page SEO, schema markup, the stuff that moves the needle.",
    bullets: ["GBP optimization + monitoring", "On-page SEO fixes", "Schema markup implementation", "Monthly progress report"],
    highlight: false,
    cta: "Talk to us",
    href: "#contact",
  },
  {
    name: "Simpl.agent",
    price: "TBD",
    cadence: "/ month",
    tag: "Full optimization",
    desc: "Everything in Core, plus we rebuild what's broken: website, content, social, local SEO. Your entire digital presence, handled.",
    bullets: ["Everything in Core", "Website audit + fixes", "Content strategy + creation", "Social media setup + management", "Local SEO + citation building"],
    highlight: true,
    cta: "Talk to us",
    href: "#contact",
  },
  {
    name: "Simpl.pro",
    price: "TBD",
    cadence: "/ month",
    tag: "Growth mode",
    desc: "Everything in Simpl.agent, plus paid advertising, advanced content, and direct consulting. For businesses ready to grow, not just fix.",
    bullets: ["Everything in Simpl.agent", "Google Ads + Meta Ads management", "LSA / RSA campaign setup", "Content creation + posting", "Monthly strategy consulting"],
    highlight: false,
    cta: "Talk to us",
    href: "#contact",
  },
  {
    name: "Simpl.install",
    price: "Custom",
    cadence: "",
    tag: "Your own SIMPL team",
    desc: "A dedicated SIMPL team, custom-built for your business. Runs 24/7. Monitors, optimizes, and reports without you lifting a finger.",
    bullets: ["Custom team buildout for your business", "24/7 monitoring + execution", "CRM integration (GHL)", "White-label dashboards + reporting", "Dedicated support"],
    highlight: false,
    cta: "Talk to us",
    href: "#contact",
  },
];

export default function StartPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 40 }}>Get Started</div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 900 }}>
            Pick where you are.<br />
            <span style={{ color: "var(--muted)" }}>We&apos;ll meet you there.</span>
          </h1>
          <p style={{ marginTop: 28, maxWidth: 620, fontSize: 17, lineHeight: 1.55 }}>
            Whether you just want to see your score or you want a dedicated team running your entire digital presence, there&apos;s a tier for that.
          </p>
        </section>

        {/* Product Ladder */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>The SIMPL Ladder</div>

            <div style={{ display: "grid", gap: 12 }}>
              {TIERS.map((t, i) => (
                <div key={t.name} style={{
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

                  {/* Left — name + price */}
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

                  {/* Middle — description + bullets */}
                  <div>
                    <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--fg)", margin: "0 0 14px" }}>{t.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                      {t.bullets.map((b) => (
                        <div key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>+ {b}</div>
                      ))}
                    </div>
                  </div>

                  {/* Right — CTA */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {t.href.startsWith("#") ? (
                      <a href={t.href} style={{
                        padding: "10px 20px", fontSize: 13, borderRadius: 3, textDecoration: "none", whiteSpace: "nowrap",
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

            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, textAlign: "center", letterSpacing: "0.06em" }}>
              Pricing available on request. Every engagement starts with a conversation, not a checkout page.
            </div>
          </div>
        </section>

        {/* Free scan */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px 96px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Start here</span> · run a free scan
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620 }}>
            Type a domain. See your SIMPL Score. Decide from there.
          </h2>
          <div style={{ marginTop: 40 }}><ScanTool compact /></div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Contact */}
        <section id="contact" style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Ready?</span> · send a note
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620, marginBottom: 48 }}>
            Tell us what you need. Hear back same day.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
            <ContactForm />
            <div style={{ display: "grid", gap: 28 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Reply window</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>Same business day, usually within four hours.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>From</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>A person. Not a sequence. Not a calendar link.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Direct</div>
                <a href="mailto:hi@simpl.pro" className="mono" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>hi@simpl.pro</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
