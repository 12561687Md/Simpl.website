import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScanTool from "./components/ScanTool";

export const metadata: Metadata = {
  title: "SIMPL — Your Digital Presence, Handled",
  description:
    "SIMPL monitors your website, Google Business Profile, SEO, and online presence 24/7. Type your URL and get your free SIMPL Score in seconds.",
  openGraph: {
    title: "SIMPL — Your Digital Presence, Handled",
    description:
      "Find out what's broken with your online presence. Free scan, real results, in seconds.",
  },
  alternates: { canonical: "https://simpl.pro" },
};

const SURFACES = [
  {
    code: "01 / Discoverability",
    href: "/discoverability",
    title: "Whether Google can find you at all.",
    tag: "Index, GBP, maps, schema",
  },
  {
    code: "02 / Performance",
    href: "/performance",
    title: "Whether your site actually works.",
    tag: "Uptime, vitals, forms, checkout",
  },
  {
    code: "03 / Reputation",
    href: "/reputation",
    title: "What people say when you're not in the room.",
    tag: "Reviews, sentiment, mentions",
  },
  {
    code: "04 / Spend",
    href: "/spend",
    title: "Where your marketing dollars actually go.",
    tag: "Branded, waste, bids, audit",
  },
];

const FINDINGS = [
  { num: "01", biz: "Indexing regression", cost: "Lost traffic", finding: "Service pages drop out of Google's index after a site update." },
  { num: "02", biz: "Profile suspension", cost: "Lost calls", finding: "Google Business Profile gets suspended over a duplicate or violation." },
  { num: "03", biz: "Silent breakage", cost: "Lost revenue", finding: "Contact forms or order flows stop working after a plugin or platform update." },
  { num: "04", biz: "Reputation drift", cost: "Reputation", finding: "Negative reviews accumulate without responses while conversion declines." },
  { num: "05", biz: "Branded search leak", cost: "Paid leak", finding: "Competitors bid on your brand name and intercept traffic you already earned." },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 96px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
            <span>SIMPL.PRO · Monitoring · Protection · Repair</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(40px, 6.4vw, 81px)", lineHeight: 1.04, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 1000 }}>
            Your business is always online.<br />
            <span style={{ color: "var(--muted)" }}>SIMPL makes sure it&apos;s always working.</span>
          </h1>
          <p style={{ marginTop: 40, maxWidth: 620, fontSize: 19, lineHeight: 1.55 }}>
            We watch your site, your listings, your reviews, and your ads. We fix what we can. We tell you when you need to decide something.
          </p>
          <div style={{ marginTop: 56 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <span>Try the scan — type your domain</span>
              <Link href="/scan" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 1, fontSize: 11 }}>How it works ↗</Link>
            </div>
            <ScanTool />
          </div>
        </section>

        {/* Coverage */}
        <section id="coverage" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>Coverage</div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800 }}>
              Four surfaces. Watched continuously. Quietly.
            </h2>
            <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
              SIMPL doesn&apos;t replace your site or your ads or your team. It watches the four places where things break and tells you what&apos;s wrong before the next quarterly review.
            </p>
            <div style={{ marginTop: 72, display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", background: "var(--rule)", border: "1px solid var(--rule)" }}>
              {SURFACES.map((s) => (
                <Link key={s.href} href={s.href} className="finding-row" style={{ background: "var(--bg)", padding: "44px 36px 40px", minHeight: 280, display: "flex", flexDirection: "column", gap: 18, textDecoration: "none", color: "var(--fg)" }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>{s.code}</div>
                  <div style={{ fontSize: 24, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{s.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>{s.tag}</div>
                  <div className="mono" style={{ marginTop: "auto", fontSize: 12, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>Read more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>Who is this for</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            It depends on what you&apos;re afraid of.
          </h2>
          <div style={{ marginTop: 56, maxWidth: 780, display: "grid", gap: 40 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Home services</h3>
              <p style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3, margin: "0 0 16px" }}>When the phone stops ringing, you&apos;re the last to know why.</p>
              <div style={{ paddingLeft: 24, borderLeft: "2px solid var(--accent)", color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>
                When your Google Maps listing drops, SIMPL sees it the same day. You hear about it before the phone stops ringing.
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Small business</h3>
              <p style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3, margin: "0 0 16px" }}>Small things break quietly. Then revenue follows.</p>
              <div style={{ paddingLeft: 24, borderLeft: "2px solid var(--accent)", color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>
                When a plugin update breaks your contact form, SIMPL notices the silence. You hear about it before a week of leads disappears.
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Agencies</h3>
              <p style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3, margin: "0 0 16px" }}>Forty client sites. One person watching them. You already know how that ends.</p>
              <div style={{ paddingLeft: 24, borderLeft: "2px solid var(--accent)", color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>
                When one client&apos;s site quietly de-indexes on a Friday afternoon, SIMPL catches it. You handle it before Monday&apos;s call.
              </div>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What SIMPL catches */}
        <section id="findings" style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>What SIMPL catches</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            The kinds of things that go wrong quietly.
          </h2>
          <div style={{ marginTop: 64, borderTop: "1px solid var(--rule)" }}>
            {FINDINGS.map((f) => (
              <div key={f.num} className="finding-row" style={{ display: "grid", gridTemplateColumns: "48px minmax(180px, 1.1fr) minmax(0, 3fr) auto", gap: 28, alignItems: "baseline", padding: "28px 0", borderBottom: "1px solid var(--rule)" }}>
                <div className="mono" style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.12em" }}>{f.num}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{f.biz}</div>
                </div>
                <div style={{ fontSize: 17, lineHeight: 1.5 }}>{f.finding}</div>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 14, whiteSpace: "nowrap" }}>{f.cost}</div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* SIMPL Score */}
        <section style={{ position: "relative", padding: "182px 0", textAlign: "center", overflow: "hidden" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", position: "relative" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 40 }}>The SIMPL Score</div>
            <div className="mono" style={{ fontSize: "clamp(120px, 20vw, 220px)", lineHeight: 0.85, letterSpacing: "-0.05em", color: "var(--accent)", fontWeight: 300 }}>72</div>
            <div className="mono" style={{ fontSize: 14, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>/ 100</div>
            <p style={{ maxWidth: 560, margin: "56px auto 0", fontSize: 19, lineHeight: 1.55 }}>
              Every site gets a SIMPL Score from 0 to 100. Most business owners have never seen theirs.
            </p>
            <div style={{ marginTop: 36 }}>
              <Link href="/scan" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--fg)", paddingBottom: 4, fontSize: 15 }}>
                See yours<span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Pricing */}
        <section id="pricing" style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>Pricing</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Three plans. No add-ons.
          </h2>
          <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", border: "1px solid var(--rule)" }}>
            {[
              { name: "Solo", price: "$49", cadence: "/mo", blurb: "One business. One domain. The four surfaces, watched continuously." },
              { name: "Pro", price: "$129", cadence: "/mo", blurb: "Solo, plus auto-remediation for the top 30 finding types." },
              { name: "Agency", price: "Custom", cadence: "", blurb: "Ten or more sites. White-label dashboards, API, billing rollups." },
            ].map((t, i) => (
              <div key={t.name} style={{ padding: "48px 36px 40px", borderRight: i < 2 ? "1px solid var(--rule)" : 0, display: "flex", flexDirection: "column", gap: 28, minHeight: 340 }}>
                <div className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{t.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 56, letterSpacing: "-0.03em", fontWeight: 400, lineHeight: 1 }}>{t.price}</span>
                  {t.cadence && <span className="mono" style={{ color: "var(--muted)", fontSize: 14 }}>{t.cadence}</span>}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.5, flex: 1 }}>{t.blurb}</div>
                <Link href="/start" style={{ alignSelf: "stretch", background: "transparent", color: "var(--fg)", border: "1px solid var(--fg)", padding: "14px 22px", fontSize: 14, textDecoration: "none", textAlign: "center", borderRadius: 2 }}>
                  Start trial
                </Link>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Closing CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(36px, 5.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 880 }}>
            Still here? Start the scan.<br />
            <span style={{ color: "var(--muted)" }}>Same field. Same thirty seconds. Different outcome if you close the tab.</span>
          </h2>
          <div style={{ marginTop: 56 }}>
            <ScanTool compact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
