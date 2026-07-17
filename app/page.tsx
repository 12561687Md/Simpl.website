import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import FloatingCTA from "./components/FloatingCTA";
import CategoryShowcase from "./components/CategoryShowcase";
import WhyOwnersHireUs from "./components/WhyOwnersHireUs";
import TrustStats from "./components/TrustStats";
import ScanTool from "./components/ScanTool";
import ScrollReveal from "./components/ScrollReveal";
import OutcomePillars from "./components/OutcomePillars";
import FounderSection from "./components/FounderSection";

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
    grade: "B",
    hook: "Slow load times, missing SSL, broken mobile layouts.",
    detail: "Visitors leave before they even read your homepage.",
    fix: "We catch the silent killers: speed issues, expired certificates, and mobile breakage that's costing you visitors right now.",
    href: "/performance",
    hrefLabel: "Performance",
  },
  {
    name: "On-Page SEO",
    grade: "C",
    hook: "Missing titles, no meta descriptions, zero schema markup.",
    detail: "Google can't figure out what your site is about, so it ranks someone else.",
    fix: "We map the exact SEO signals Google uses to rank you, flagging hidden gaps before your competitors outrank you.",
    href: "/discoverability",
    hrefLabel: "Discoverability",
  },
  {
    name: "Content & Pages",
    grade: "D",
    hook: "No services page, no about page, no testimonials, no blog.",
    detail: "Your site exists but it doesn't sell. Visitors land, look around, and leave.",
    fix: "SIMPL identifies the essential pages your site is missing and prioritizes them by how much traffic they'll recover.",
    href: "/services/organic-growth",
    hrefLabel: "Organic growth",
  },
  {
    name: "Social Presence",
    grade: "D",
    hook: "No Facebook, no Instagram, no LinkedIn linked on the site.",
    detail: "Customers search for you on social and find nothing. That's a trust problem.",
    fix: "We flag every platform you're invisible on and show which ones actually matter for your industry.",
    href: "/reputation",
    hrefLabel: "Reputation",
  },
  {
    name: "Crawlability",
    grade: "B",
    hook: "No sitemap, broken internal links, robots.txt blocking Google.",
    detail: "Your pages exist but search engines can't reach them.",
    fix: "We check the technical infrastructure most people never touch: robots.txt, sitemaps, canonicals, internal link health.",
    href: "/services/quick-wins",
    hrefLabel: "Quick wins",
  },
  {
    name: "Google Business Profile",
    grade: "C",
    hook: "Low reviews, no photos, missing hours, no owner responses.",
    detail: "Your listing is live but it's losing you calls every day.",
    fix: "We verify your GBP, grade every field, and show exactly what's keeping you out of the local 3-pack.",
    href: "/services/local-seo",
    hrefLabel: "Local SEO",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SIMPL",
          "url": "https://simpl.pro",
          "description": "Digital presence platform that scans, scores, and fixes businesses' online presence.",
          "contactPoint": { "@type": "ContactPoint", "email": "team@simpl.pro", "contactType": "customer service" }
        }) }} />

        {/* Hero + Scan Tool */}
        <HomeHero />
        <FloatingCTA />

        {/* 2nd section: reasons owners hire us, paired with the looping phone. */}
        <WhyOwnersHireUs />

        {/* Outcome pillars: what the work is actually for (calls / jobs / time). */}
        <OutcomePillars />

        {/* What We Score */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <ScrollReveal>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>What we score</div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800 }}>
                Six categories. Most businesses are failing at least three.
              </h2>
              <p style={{ marginTop: 20, maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
                Every SIMPL Score breaks down into six areas. Each one is graded independently. The question isn&apos;t whether you&apos;re failing. It&apos;s which ones.
              </p>
            </ScrollReveal>
            <div style={{ marginTop: 40 }}>
              <CategoryShowcase categories={CATEGORIES} />
            </div>
          </div>
        </section>

        {/* SIMPL Score */}
        <section data-section="simpl-score" style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
          <ScrollReveal>
          <div className="grid-score" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>The SIMPL Score</div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, marginBottom: 20 }}>
                One number that tells you<br />if your online presence is working.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 12 }}>
                We scan six areas of your digital presence and grade each one. Most sites we&apos;ve scanned score between 40 and 65.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
                The businesses that score higher have one thing in common: they knew where the problems were before their customers did.
              </p>
              <a href="/scan" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
                Run your free scan<span>→</span>
              </a>
            </div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 40px rgba(155,255,26,0.06)" }}>
              <div style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#E05252", opacity: 0.6 }} />
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#E0A852", opacity: 0.6 }} />
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#9BFF1A", opacity: 0.6 }} />
                <span className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginLeft: 8 }}>simpl.report</span>
              </div>
              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
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
                    <div className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{c.cat}</div>
                    <div style={{ fontSize: 16, fontWeight: 400, color: c.grade.startsWith("D") || c.grade.startsWith("F") ? "#E0A852" : "#9BFF1A" }}>{c.grade}</div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What you get */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <ScrollReveal>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>What you get</div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800 }}>
              Start with a free scan. Let us know what you find.
            </h2>
          </ScrollReveal>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
            Most people start by scanning their site and reading the free report. Others want us to fix everything. You decide how far to go.
          </p>
          <div className="grid-tiers" style={{ marginTop: 40, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {[
              { name: "Scan", tag: "Free", desc: "See what's broken" },
              { name: "Core", tag: "From $497/mo", desc: "Get found" },
              { name: "Team", tag: "From $997/mo", desc: "Get booked" },
              { name: "Pro", tag: "From $1,997/mo", desc: "Get your time back" },
            ].map((t) => (
              <div key={t.name} style={{ background: "var(--bg)", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>Simpl.{t.name.toLowerCase()}</div>
                <div style={{ fontSize: 20, fontWeight: 400 }}>{t.tag}</div>
                <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
          {/* Standalone offer: the personalized audit. Sits apart from the tiers
              because it's a one-time deliverable, not a monthly plan. */}
          <div style={{ marginTop: 28, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", padding: "24px 28px", border: "1px solid var(--rule)", borderRadius: 10, background: "var(--bg-soft)" }}>
            <div style={{ maxWidth: 620 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Personalized audit &amp; breakdown · $247, free with any tier</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
                Want more than a scan? We build a full, personalized breakdown of your business online: where leads are leaking, how you stack up against your competitors, and the exact order to fix it in. Yours to keep.
              </p>
            </div>
            <Link href="/start" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "12px 20px", fontSize: 13.5, fontWeight: 700, borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>
              Get your breakdown →
            </Link>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/start" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--fg)", paddingBottom: 4, fontSize: 15 }}>
              Find the right fit<span>→</span>
            </Link>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Section 4 reserved for testimonials + reviews (goes live once we have
            real ones; never fabricated). See docs/standards/TRUST_SIGNALS.md. */}

        {/* What we stand for + a real person: the beliefs block is now merged
            into the founder section (one combined section, not two). */}
        <FounderSection />

        {/* Trust */}
        <section style={{ borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <ScrollReveal>
              <TrustStats />
            </ScrollReveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <ScrollReveal>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
              You&apos;ve read this far, which means something&apos;s nagging you.<br />
              <span style={{ color: "var(--muted)" }}>Find out what it is. Thirty seconds.</span>
            </h2>
            <div style={{ marginTop: 48 }}>
              <ScanTool compact />
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
