import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";
import { Section, QA, Crumbs, Eyebrow, Steps, FinalCta } from "../components/engine/ui";
import { webPage, ldJson, pageMeta } from "../lib/schema";

/* Kept live (not 301'd) because emails link to /scan?url=... to start a scan
   directly. Same intent as /free-tools, so it points its canonical there and
   stays out of the index (2026-10-22). Copy refreshed to the revamp 2026-10-23:
   it only claims what the scanner actually measures. */
const PATH = "/scan";
const TITLE = "Free Website Scan: Your Simpl Score | Simpl";
const DESCRIPTION =
  "Free website scan for service businesses: your site, Google listing and search visibility scored 0 to 100 from live data, with the wins ranked. No credit card.";

const base = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });
export const metadata: Metadata = {
  ...base,
  alternates: { canonical: "https://www.simpl.pro/free-tools" },
  robots: { index: false, follow: true },
};

const CHECKS = [
  { h: "Website foundation", b: "Uptime, SSL, speed and how the site holds up on a phone." },
  { h: "Crawlability", b: "Whether Google and AI search tools can read your site at all." },
  { h: "On-page SEO", b: "Titles, descriptions, headings and structured data." },
  { h: "Content and pages", b: "Service pages, trust signals and clear ways to reach you." },
  { h: "Social presence", b: "Whether your profiles exist, link back and match." },
  { h: "Google Business Profile", b: "Completeness, reviews and how you show up on the map." },
];

const STEPS = [
  { k: "Step 01", h: "Type your domain.", b: "No login, no credit card, no questionnaire. One field and a button." },
  { k: "Step 02", h: "We check the live site.", b: "More than 60 signals across six categories, measured from your site and your Google listing as they are right now." },
  { k: "Step 03", h: "You get your Simpl Score.", b: "A score from 0 to 100 and a grade for each category, in plain English. Nothing estimated, nothing invented." },
  { k: "Step 04", h: "You see the wins, in order.", b: "Every finding is ranked by what moves the needle first. Unlock the full report with your email and it is yours to keep." },
  { k: "Step 05", h: "Fix it yourself, or hand it to our team.", b: "Work through the list on your own, or book a free call and we will walk it through with you and scope what to fix first." },
];

export default function ScanPage() {
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
              name: "Simpl free website scan",
              url: `https://www.simpl.pro${PATH}`,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              isAccessibleForFree: true,
              description: DESCRIPTION,
              provider: { "@type": "Organization", name: "Simpl", url: "https://www.simpl.pro" },
            }
          )}
        />
        <section className="eg-hero tone-ink" style={{ paddingBottom: 80 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Free scan", path: PATH }]} />
            <Eyebrow>Free scan</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 960 }}>
              Type your domain. <em>See the wins waiting for you.</em>
            </h1>
            <p className="eg-lead">
              One free scan scores your website and Google listing 0 to 100 across six categories, from live data, and ranks what to fix first. It takes about a minute.
              No credit card, no call.
            </p>
            <div style={{ marginTop: 36, maxWidth: 760 }}>
              <ScanTool />
            </div>
          </div>
        </section>

        <Section tone="paper" label="How the scan works">
          <QA eyebrow="How it works" q="Five steps, about a minute." a="Here is exactly what happens after you hit the button." />
          <Steps steps={STEPS} />
        </Section>

        <Section tone="mist" label="What it checks">
          <QA eyebrow="What it checks" q="Six categories that decide whether customers find you." a="Each one is scored on its own, so you can see where the biggest wins are." />
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

        <FinalCta
          heading="Rather talk it through?"
          body="Book a free call and we will walk through your site, your Google listing and what to fix first, in plain English. No pitch, nothing to sign."
          primary={{ label: "Book a free call", href: "/book" }}
        />
      </main>
      <Footer />
    </div>
  );
}
