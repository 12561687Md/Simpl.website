import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import FloatingCTA from "./components/FloatingCTA";
import ScanTool from "./components/ScanTool";

export const metadata: Metadata = {
  title: "SIMPL | Your Digital Presence, Handled",
  description:
    "SIMPL monitors your website, Google Business Profile, SEO, and online presence 24/7. Type your URL and get your free SIMPL Score in seconds.",
  openGraph: {
    title: "SIMPL | Your Digital Presence, Handled",
    description:
      "Find out what's broken with your online presence. Free scan, real results, in seconds.",
  },
  alternates: { canonical: "https://simpl.pro" },
};

const CATEGORIES = [
  {
    name: "Website Foundation",
    grade: "Most sites: B",
    problem: "Slow load times, missing SSL, broken mobile layouts. Visitors leave before they even read your homepage.",
    fix: "SIMPL checks uptime, speed, SSL, mobile-friendliness, and security headers. Flags anything that's costing you visitors.",
  },
  {
    name: "On-Page SEO",
    grade: "Most sites: C",
    problem: "Missing titles, no meta descriptions, broken heading structure, zero schema markup. Google can't figure out what your site is about.",
    fix: "We audit every page for the SEO signals Google actually uses to rank you, and show you exactly what's missing.",
  },
  {
    name: "Content & Pages",
    grade: "Most sites: D",
    problem: "No services page, no about page, no testimonials, no blog. Your site exists but it doesn't sell.",
    fix: "SIMPL maps every page a business website needs and tells you which ones are missing, with priority order.",
  },
  {
    name: "Social Presence",
    grade: "Most sites: D",
    problem: "No Facebook, no Instagram, no LinkedIn linked on the site. Customers can't find you where they spend their time.",
    fix: "We detect every social profile linked to your site and flag the platforms you're invisible on.",
  },
  {
    name: "Crawlability",
    grade: "Most sites: B",
    problem: "No sitemap, broken internal links, robots.txt blocking Google. Your pages exist but search engines can't reach them.",
    fix: "SIMPL checks your robots.txt, sitemap, canonical tags, and internal links: the infrastructure most people never look at.",
  },
  {
    name: "Google Business Profile",
    grade: "Most sites: C",
    problem: "Low reviews, no photos, missing hours, no owner responses. Your listing is live but it's not working for you.",
    fix: "We find your GBP, verify it's yours, and grade every field: reviews, photos, hours, phone, website link.",
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
        {/* Hero + Scan Tool */}
        <HomeHero />
        <FloatingCTA />

        {/* What We Score */}
        <section id="coverage" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>What we score</div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800 }}>
              Six categories. Most businesses are failing at least three.
            </h2>
            <p style={{ marginTop: 20, maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
              Every SIMPL Score breaks down into six areas. Each one is graded independently, so you know exactly where the problems are and what to fix first.
            </p>
            <div style={{ marginTop: 40, display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", background: "var(--rule)", border: "1px solid var(--rule)" }}>
              {CATEGORIES.map((c, i) => (
                <div key={c.name} style={{ background: "var(--bg)", padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>
                      {String(i + 1).padStart(2, "0")} / {c.name}
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{c.grade}</div>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.55 }}>{c.problem}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--accent)", opacity: 0.85 }}>{c.fix}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>Who is this for</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            It depends on what you&apos;re afraid of.
          </h2>
          <div style={{ marginTop: 40, maxWidth: 780, display: "grid", gap: 32 }}>
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
        <section id="findings" style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>What SIMPL catches</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            The kinds of things that go wrong quietly.
          </h2>
          <div style={{ marginTop: 40, borderTop: "1px solid var(--rule)" }}>
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
        <section style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>The SIMPL Score</div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, marginBottom: 20 }}>
                One number that tells you<br />if your online presence is working.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 12 }}>
                We scan your website, your SEO, your Google Business Profile, your social presence, and your content, then grade each one.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
                Most business owners have never seen theirs. The ones who have are already fixing what&apos;s broken.
              </p>
              <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
                Run your free scan<span>→</span>
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative", width: 200, height: 200 }}>
                <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="var(--rule)" strokeWidth="4" />
                  <circle cx="100" cy="100" r="90" fill="none" stroke="var(--accent)" strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 90} strokeDashoffset={2 * Math.PI * 90 * 0.28}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 64, fontWeight: 200, color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.04em" }}>B</span>
                  <span className="mono" style={{ fontSize: 16, color: "var(--muted)", marginTop: 4 }}>72%</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, width: "100%", maxWidth: 280 }}>
                {[
                  { cat: "SEO", grade: "B" },
                  { cat: "Content", grade: "D" },
                  { cat: "Social", grade: "B" },
                  { cat: "Website", grade: "A" },
                  { cat: "GBP", grade: "A-" },
                  { cat: "Crawl", grade: "A" },
                ].map((c) => (
                  <div key={c.cat} style={{ textAlign: "center", padding: "8px 4px", background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 4 }}>
                    <div className="mono" style={{ fontSize: 8, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{c.cat}</div>
                    <div style={{ fontSize: 16, fontWeight: 400, color: c.grade.startsWith("D") || c.grade.startsWith("F") ? "#E0A852" : "#8FB4A8" }}>{c.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* How it works */}
        <section id="pricing" style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>How it works</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800 }}>
            Six tiers. Start free. Scale when it makes sense.
          </h2>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
            From a free scan to a full autonomous agent team. Pick where you are, we&apos;ll meet you there.
          </p>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {[
              { name: "Scanner", tag: "Free", desc: "See what's broken" },
              { name: "Report", tag: "$", desc: "See everything" },
              { name: "Core", tag: "$$", desc: "We fix it" },
              { name: "Agent", tag: "$$$", desc: "Full optimization" },
              { name: "Pro", tag: "$$$$", desc: "Growth mode" },
              { name: "Install", tag: "$$$$$", desc: "Your own agent team" },
            ].map((t) => (
              <div key={t.name} style={{ background: "var(--bg)", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>Simpl.{t.name.toLowerCase()}</div>
                <div style={{ fontSize: 20, fontWeight: 400 }}>{t.tag}</div>
                <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/start" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--fg)", paddingBottom: 4, fontSize: 15 }}>
              See all tiers<span>→</span>
            </Link>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Trust */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
              <div>
                <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>30s</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>Average scan time. Type your URL, get your score before your coffee gets cold.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>6</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>Categories scored. Website, SEO, content, social, crawlability, and Google Business Profile.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>25+</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>Checks per scan. From SSL certificates to schema markup to Google reviews.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>0</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>Data sold. Your scan results are yours. We don&apos;t spam, store credentials, or share your info.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Still here? Start the scan.<br />
            <span style={{ color: "var(--muted)" }}>Thirty seconds. Free. No signup.</span>
          </h2>
          <div style={{ marginTop: 48 }}>
            <ScanTool compact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
