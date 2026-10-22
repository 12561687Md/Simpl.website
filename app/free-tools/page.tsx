import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import { Section, Eyebrow, QA, FaqList, Crumbs } from "../components/engine/ui";
import { EASY_WINS } from "../lib/site";
import { breadcrumb, faqPage, ldJson } from "../lib/schema";

const TITLE = "Free Website Audit and Digital Presence Scan | Simpl";
const DESCRIPTION =
  "Free website audit in about 60 seconds: your site, Google Business Profile, SEO and AI search visibility scored 0 to 100, with every finding measured from live data. No credit card.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/free-tools" },
  alternates: { canonical: "https://www.simpl.pro/free-tools" },
};

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
    a: "A digital presence audit checks everything a buyer sees before they contact you: your website, how you rank in Google and AI answers, your Google Business Profile, your reviews and your social profiles. The free scan covers the measurable parts; the full audit walkthrough comes with a free strategy call.",
  },
  {
    q: "Where does the score come from?",
    a: "Every finding is measured from live data on your site and your Google listing. Nothing is estimated or invented, and the scan never shows a ranking or competitor it can't verify.",
  },
  {
    q: "I sell B2B. Is this for me?",
    a: "It's useful as a health check for any company's website. If you sell high-ticket B2B, the bigger win is usually the Account Engine, which finds the accounts with a reason to buy now.",
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
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Simpl free website and presence scan",
              url: "https://www.simpl.pro/free-tools",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description: DESCRIPTION,
            },
            breadcrumb([{ name: "Free tools", path: "/free-tools" }]),
            faqPage(FAQS)
          )}
        />
        <section className="eg-hero" style={{ paddingBottom: 64 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Free tools", path: "/free-tools" }]} />
            <Eyebrow>Free tools</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 940 }}>
              Free website audit. <span className="dim">Your score in about 60 seconds.</span>
            </h1>
            <p className="eg-lead">
              Type your website and see how it scores, 0 to 100, across six categories. Every finding is measured from live data and ranked by what to fix
              first. No credit card, no call.
            </p>
            <div style={{ marginTop: 36, maxWidth: 760 }}>
              <ScanTool compact />
            </div>
            <p style={{ marginTop: 18, fontSize: 14.5, color: "var(--muted)" }}>
              Want the guided version with your Google listing? <Link href="/start-now" className="eg-link">Find your business and scan it</Link>.
            </p>
          </div>
        </section>

        <Section band>
          <QA eyebrow="What it checks" q="What does the free website audit check?" a="Six categories that decide whether a buyer finds you and trusts what they find." />
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

        <Section>
          <QA
            eyebrow="The full audit"
            q="Want the full digital presence audit?"
            a="Unlock your scan report with your email and the personalized breakdown is yours, free. The next step is a free strategy call where we walk through it and scope what to fix first: website, SEO and AI search, Google Business Profile or ads."
          />
          <div className="eg-chips">
            {EASY_WINS.map((s) => (
              <Link key={s.href} href={s.href} className="eg-chip">{s.label} <span aria-hidden="true">&rarr;</span></Link>
            ))}
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Questions" q="Free tools FAQ" />
          <FaqList faqs={FAQS} />
          <div className="eg-card" style={{ marginTop: 40, borderColor: "var(--accent-line)" }}>
            <h2 className="eg-h3" style={{ fontSize: 22 }}>Selling high-ticket B2B?</h2>
            <p className="eg-body">
              Your website matters, but your next deal is more likely sitting in a permit, an inspection or an ownership change.{" "}
              <Link href="/services/account-engine" className="eg-link">See how the Account Engine finds it</Link>.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
