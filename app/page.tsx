import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import SpaceField from "./components/SpaceField";
import FloatingCTA from "./components/FloatingCTA";
import CategoryShowcase from "./components/CategoryShowcase";
import WhyOwnersHireUs from "./components/WhyOwnersHireUs";
import TrustStats from "./components/TrustStats";
import ScanTool from "./components/ScanTool";
import ScrollReveal from "./components/ScrollReveal";
import OutcomePillars from "./components/OutcomePillars";
import TeamSection from "./components/TeamSection";

export const metadata: Metadata = {
  title: "Simpl | Your Digital Presence, Handled",
  description:
    "Simpl monitors your website, Google Business Profile, SEO, and online presence 24/7. Type your URL and get your free Simpl Score in seconds.",
  openGraph: {
    title: "Simpl | Your Digital Presence, Handled",
    description:
      "Find out what's broken with your online presence. Free scan, real results, in seconds.",
  },
  alternates: { canonical: "https://simpl.pro" },
};

// The six services shown in the interactive showcase, matched 1:1 to the nav
// dropdown. Each proves a real service: what it is (hook), why the business
// needs it / the cost of not having it (detail), and the concrete deliverable
// as proof it's real work, not a vague retainer (deliverable). Links go to the
// specific /services page. Keyword-rich for SEO.
const SERVICES = [
  {
    name: "Custom Website",
    tag: "Sites that convert",
    hook: "A fast, modern website built to turn visitors into booked jobs.",
    detail: "An outdated or slow site sends the customers you worked to earn straight to the competitor whose page loads first and looks like they'll answer the phone.",
    deliverable: "A custom, mobile-fast website with the pages, load speed, and calls-to-action engineered to turn traffic into booked work.",
    href: "/services/website-build",
    hrefLabel: "Custom Website",
  },
  {
    name: "Quick Wins & Site Triage",
    tag: "Fast wins first",
    hook: "The fast fixes that win you more customers this week.",
    detail: "Fixing broken forms, expired SSL, dead links, and slow pages turns visitors you already have into calls, the wins most owners are sitting on without knowing it.",
    deliverable: "A prioritized list of what to fix and a first round of fixes shipped fast, so you start winning back visitors before you spend on anything bigger.",
    href: "/services/quick-wins",
    hrefLabel: "Quick Wins",
  },
  {
    name: "Local SEO & AI Search Visibility",
    tag: "Own local search",
    hook: "Get found first in Google Maps, local search, and AI answers.",
    detail: "If you're not in the Google local three-pack and the AI answers customers now trust, you're invisible to the people searching for exactly what you sell, right now.",
    deliverable: "An optimized Google Business Profile, ranked local service pages, and monthly tracking that shows your real position climbing for the searches that bring calls.",
    href: "/services/local-seo",
    hrefLabel: "Local SEO",
  },
  {
    name: "Paid Performance Marketing",
    tag: "Scale with ads",
    hook: "Google and Meta ads that bring back more than they cost.",
    detail: "Boosted posts and guesswork quietly drain your budget. With no real tracking, you can't tell which dollar booked a job and which one just vanished.",
    deliverable: "Managed Google and Meta campaigns with full conversion tracking and a plain-English report on cost per lead, so every dollar is accountable.",
    href: "/services/paid-ads",
    hrefLabel: "Paid Ads",
  },
  {
    name: "Long-Term Organic Growth",
    tag: "Compounding traffic",
    hook: "Content and SEO that compound into free traffic every month.",
    detail: "Lean on ads alone and the leads stop the moment you stop paying. With no organic content, you're renting your traffic instead of owning it.",
    deliverable: "A content engine built around the questions your customers actually search, plus month-over-month growth in rankings and organic leads you don't pay per click for.",
    href: "/services/organic-growth",
    hrefLabel: "Organic Growth",
  },
  {
    name: "Fractional CMO & Strategy",
    tag: "Senior oversight",
    hook: "A senior marketing lead steering the whole thing, without the hire.",
    detail: "Marketing done piecemeal with no strategy means paying for activity instead of results, with no one owning the number that actually matters: booked revenue.",
    deliverable: "A clear quarterly plan, monthly strategy sessions, and one team accountable for turning your marketing into booked revenue.",
    href: "/services/strategy",
    hrefLabel: "Strategy",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      {/* Shared page-wide starfield behind every section, so the whole page
          flows as one space scene. Content sits above it via position/z-index. */}
      <SpaceField />
      <main style={{ position: "relative", zIndex: 1 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Simpl",
          "url": "https://simpl.pro",
          "description": "Digital presence platform that scans, scores, and fixes businesses' online presence.",
          "contactPoint": { "@type": "ContactPoint", "email": "team@simpl.pro", "contactType": "customer service" }
        }) }} />

        {/* Hero + Scan Tool */}
        <HomeHero />
        <FloatingCTA label="Free audit" />

        {/* 2nd section: reasons owners hire us, paired with the looping phone. */}
        <WhyOwnersHireUs />

        {/* Outcome pillars: what the work is actually for (calls / jobs / time). */}
        <OutcomePillars />

        {/* What we do: the six services, matched 1:1 to the nav dropdown */}
        <section>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <ScrollReveal>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>What we do</div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 860 }}>
                One team for your website, local SEO, ads, and the strategy behind them.
              </h2>
              <p style={{ marginTop: 20, maxWidth: 660, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
                Six services that cover every part of getting found and getting booked online, from a faster website to local SEO, paid ads, and long-term organic growth. Each one ships a real deliverable you can point to, not a vague monthly retainer.
              </p>
            </ScrollReveal>
            <div style={{ marginTop: 40 }}>
              <CategoryShowcase categories={SERVICES} />
            </div>
          </div>
        </section>

        {/* The audit sample used to live here in a browser frame. It now runs
            inside the phone up in the "why owners hire us" section, splash ->
            scan -> the real report, so the homepage shows the deliverable once,
            as an app, instead of twice. */}

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Founder + principles, moved into the old "what you get" slot. The
            tiers (and pricing) now live only on the /start pricing page. */}
        <TeamSection />

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Section 4 reserved for testimonials + reviews (goes live once we have
            real ones; never fabricated). See docs/standards/TRUST_SIGNALS.md. */}

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
