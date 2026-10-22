import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import { Section, QA, FaqList, Crumbs, Eyebrow, FinalCta } from "../components/engine/ui";
import { LOCAL_SERVICES } from "../lib/site";
import { faqPage, webPage, ldJson, pageMeta } from "../lib/schema";

/* Primary keyword: "free website audit" (880/mo, KD 83: hard, long game).
   Secondary: website audit tool, free SEO audit, digital presence audit. */
const PATH = "/free-tools";
const TITLE = "Free Website Audit: Your SEO Score in 60 Seconds | Simpl";
const DESCRIPTION =
  "Free website audit for service businesses: your site, Google listing, SEO and AI search visibility scored 0 to 100 from live data. No credit card.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const CHECKS = [
  { h: "Website foundation", b: "Uptime, SSL, speed and mobile basics." },
  { h: "Crawlability", b: "Whether Google and AI crawlers can read your site at all." },
  { h: "On-page SEO", b: "Titles, descriptions, headings and structured data." },
  { h: "Content and pages", b: "Service pages, trust signals and calls to action." },
  { h: "Social presence", b: "Whether your profiles exist, link back and match." },
  { h: "Google Business Profile", b: "Completeness, reviews and how you show on the map." },
];

const FAQS = [
  {
    q: "Is the website audit really free?",
    a: "Yes. The scan is free, takes about 60 seconds and needs no credit card. You see your score right away, and the full report with every finding unlocks with your email.",
  },
  {
    q: "What is a digital presence audit?",
    a: "A digital presence audit checks everything a customer sees before they contact you: your website, how you rank in Google and AI answers, your Google Business Profile, your reviews and your social profiles. The free scan covers the measurable parts; the full walkthrough comes with a free strategy call.",
  },
  {
    q: "Where does the score come from?",
    a: "Every finding is measured from live data on your site and your Google listing. Nothing is estimated or invented, and the scan never shows a ranking or competitor it can't verify.",
  },
  {
    q: "I sell B2B. Is this for me?",
    a: "It works as a health check for any company's website. If you sell to buildings, facilities or regulated businesses, the bigger win is usually the Account Engine, which finds the accounts with a reason to buy now.",
  },
];

export default function FreeToolsPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Simpl free website audit",
              url: `https://www.simpl.pro${PATH}`,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              isAccessibleForFree: true,
              description: DESCRIPTION,
            },
            faqPage(FAQS)
          )}
        />
        <section className="eg-hero tone-ink" style={{ paddingBottom: 80 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Free website audit", path: PATH }]} />
            <Eyebrow>Free tools</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 960 }}>
              Free website audit: <em>your score in about 60 seconds.</em>
            </h1>
            <p className="eg-lead">
              Type your website and see how it scores, 0 to 100, across six categories. Every finding in this free website audit is measured from live data and ranked by
              what to fix first. No credit card, no call.
            </p>
            <div style={{ marginTop: 36, maxWidth: 760 }}>
              <ScanTool compact />
            </div>
            <p style={{ marginTop: 18, fontSize: 14.5, color: "var(--muted)" }}>
              Want the guided version with your Google listing? <Link href="/start-now" className="eg-link">Find your business and scan it</Link>.
            </p>
          </div>
        </section>

        <Section tone="paper" label="What it checks">
          <QA eyebrow="What it checks" q="What does the free website audit check?" a="Six categories that decide whether a customer finds you and trusts what they find." />
          <div className="eg-g3">
            {CHECKS.map((c, i) => (
              <div key={c.h} className="eg-card">
                <span className="eg-num">0{i + 1}</span>
                <h3 className="eg-h3">{c.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="mist" label="The full audit">
          <QA
            eyebrow="The full audit"
            q="Want the full digital presence audit?"
            a="Unlock your scan report with your email and the personalized breakdown is yours, free. The next step is a free strategy call where we walk through it and scope what to fix first."
          />
          <div className="eg-chips">
            {LOCAL_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-chip">{s.label} <span aria-hidden="true">&rarr;</span></Link>
            ))}
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q="Free website audit FAQ" />
          <FaqList faqs={FAQS} />
          <div className="eg-card feature" style={{ marginTop: 40 }}>
            <h2 className="eg-h3" style={{ fontSize: 22 }}>Selling B2B?</h2>
            <p className="eg-body">
              Your website matters, but your next deal is more likely sitting in a permit, an inspection or an ownership change.{" "}
              <Link href="/services/account-engine" className="eg-link">See how the Account Engine finds it</Link>.
            </p>
          </div>
        </Section>

        <FinalCta
          heading="Rather talk it through?"
          body="Book a free call and we will walk through your site, your Google listing and what to fix first, in plain English."
          primary={{ label: "Book a call", href: "/book" }}
        />
      </main>
      <Footer />
    </div>
  );
}
