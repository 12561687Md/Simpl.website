import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import ContactForm from "./ContactForm";
import TierGrid from "./TierGrid";

export const metadata: Metadata = {
  title: "Get Started | SIMPL",
  description: "From a free scan to a full team running your digital presence. Five ways to work with SIMPL. Pick where you are.",
  alternates: { canonical: "https://simpl.pro/start" },
};

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
            Whether you just want to see your score or you want a team running your entire digital presence, there&apos;s a tier for that.
          </p>
        </section>

        {/* Product Ladder */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>What&apos;s included</div>

            <TierGrid />

            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, textAlign: "center", letterSpacing: "0.06em" }}>
              Every engagement starts with a conversation, not a checkout page.
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
        <section data-section="contact" style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Ready?</span> · send a note
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620, marginBottom: 48 }}>
            Tell us what you need. Hear back same day.
          </h2>
          <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
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
