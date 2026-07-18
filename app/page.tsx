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
import TeamSection from "./components/TeamSection";

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
    name: "SEO & Rankings",
    grade: "C",
    hook: "Missing titles, zero schema markup, and no idea where you actually rank.",
    detail: "Google can't figure out what your site is about, so it ranks someone else, and you find out from a slow month instead of a number.",
    fix: "We map the exact SEO signals Google uses to rank you and track your real position for the searches that matter, not just whether the page loads.",
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
    name: "Advertising & Socials",
    grade: "D",
    hook: "No Facebook, no Instagram, and no clear read on whether ad spend is working.",
    detail: "Customers search for you on social and find nothing, and every dollar spent on ads with no way to tell what it bought is a dollar you can't account for.",
    fix: "We flag every platform you're invisible on and show exactly where ad spend is going, so nothing burns quietly in the background.",
    href: "/spend",
    hrefLabel: "Spend",
  },
  {
    name: "CRM & Reputation",
    grade: "B",
    hook: "Leads that never got a follow-up, and reviews trickling in at random.",
    detail: "A lead goes cold the moment nobody follows up, and your reputation online is whatever happens to get posted, not what your actual customers think.",
    fix: "We track every lead so none go cold, and build a steady, real system for turning happy customers into five-star reviews.",
    href: "/reputation",
    hrefLabel: "Reputation",
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
                Start now, free audit<span>→</span>
              </a>
            </div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 40px rgba(137,207,240,0.06)" }}>
              <div style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#E05252", opacity: 0.6 }} />
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#E0A852", opacity: 0.6 }} />
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--ok)", opacity: 0.6 }} />
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
              {/* Real links, not decoration: each badge goes to that category's
                  actual deep-dive page, so this "mock" report is also doing real
                  internal-linking work instead of being a dead-end graphic. */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, width: "100%", maxWidth: 280 }}>
                {[
                  { cat: "SEO", grade: "B", href: "/discoverability" },
                  { cat: "Content", grade: "D", href: "/services/organic-growth" },
                  { cat: "Social", grade: "B", href: "/spend" },
                  { cat: "Website", grade: "A", href: "/performance" },
                  { cat: "GBP", grade: "A-", href: "/services/local-seo" },
                  { cat: "Crawl", grade: "A", href: "/discoverability" },
                ].map((c) => (
                  <Link key={c.cat} href={c.href} className="no-underline" style={{ textAlign: "center", padding: "8px 4px", background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 4, transition: "border-color 150ms ease" }}>
                    <div className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{c.cat}</div>
                    <div style={{ fontSize: 16, fontWeight: 400, color: c.grade.startsWith("D") || c.grade.startsWith("F") ? "#E0A852" : "var(--ok)" }}>{c.grade}</div>
                  </Link>
                ))}
              </div>
              {/* Top findings: the report's actual job isn't the grade, it's what
                  the grade is hiding. Two real-shaped findings, same severity-
                  color + fix language as the live ScanReport, so this mock isn't
                  just a score badge, it previews the report itself. */}
              <div style={{ width: "100%", maxWidth: 280, display: "grid", gap: 8, marginTop: 4 }}>
                {[
                  { severity: "#E0A852", title: "No blog or FAQ content", fix: "Add 3-5 pages targeting what customers actually search for." },
                  { severity: "#E05252", title: "Missing schema markup", fix: "Google can't confirm your business type, hours, or service area." },
                ].map((f) => (
                  <div key={f.title} style={{ borderLeft: `3px solid ${f.severity}`, background: "var(--bg-soft)", padding: "8px 10px", borderRadius: "0 4px 4px 0" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35 }}>{f.title}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4, marginTop: 2 }}>{f.fix}</div>
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
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--fg)", textTransform: "uppercase" }}>Simpl.{t.name.toLowerCase()}</div>
                <div style={{ fontSize: 20, fontWeight: 400 }}>{t.tag}</div>
                <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
          {/* Standalone offer: the free strategy call. The personalized
              breakdown itself is already free the moment someone unlocks
              their scan report, so this sits apart from the tiers as the
              next step, a conversation, not a priced deliverable
              (docs/funnel/OFFER_STACK.md, decided 2026-07-17). */}
          <div style={{ marginTop: 28, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", padding: "24px 28px", border: "1px solid var(--rule)", borderRadius: 10, background: "var(--bg-soft)" }}>
            <div style={{ maxWidth: 620 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Free strategy call</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
                Already unlocked your report? Get on a call and we&apos;ll walk through where leads are leaking, how you stack up against your competitors, and the exact order to fix it in.
              </p>
            </div>
            <Link href="/start-now" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "12px 20px", fontSize: 13.5, fontWeight: 700, borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>
              Book your call →
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

        {/* What we stand for + a real team: the beliefs block is now merged
            into the team section (one combined section, not two). */}
        <TeamSection />

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
