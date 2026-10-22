import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, QA, Hero, FinalCta } from "../components/engine/ui";
import { INDUSTRY_DATA } from "../lib/industries";
import { webPage, itemList, ldJson, pageMeta } from "../lib/schema";

/* Primary keyword: "commercial leads" (90/mo). Secondary: commercial sales leads by industry. */
const PATH = "/industries";
const TITLE = "Commercial Leads by Industry, From Public Records | Simpl";
const DESCRIPTION =
  "Commercial leads for teams that sell to buildings and facilities: low voltage, senior living, building systems, facility services and healthcare.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const ALSO = [
  "Manufacturers and distributors selling into facilities",
  "Commercial telecom and connectivity",
  "Property management technology",
  "Hospitality technology",
  "Education technology and E-Rate vendors",
  "Multifamily services",
];

export default function IndustriesHub() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
            itemList("Industries", INDUSTRY_DATA.map((i) => ({ name: i.name, path: `/industries/${i.slug}` })))
          )}
        />

        <Hero
          crumbs={[{ name: "Industries", path: PATH }]}
          eyebrow="Industries"
          h1={<>Commercial leads for teams that sell to <em>buildings and facilities.</em></>}
          sub="If your buyers leave a public paper trail, we can rank them."
          lead="Inspections, permits, licenses, ownership changes and bids are all public. Each industry below has its own reasons to call and its own decision makers, and every Account Engine is built around yours."
        />

        <Section tone="paper" label="Industries">
          <div className="eg-g3">
            {INDUSTRY_DATA.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="eg-card link">
                <span className="mono-label" style={{ display: "block", marginBottom: 12 }}>{i.eyebrow}</span>
                <h2 className="eg-h3" style={{ fontSize: 21 }}>{i.name}</h2>
                <p className="eg-body" style={{ fontSize: 15 }}>{i.sub}</p>
                <span className="go">See the signals <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
            <div className="eg-card">
              <span className="mono-label" style={{ display: "block", marginBottom: 12 }}>Also</span>
              <h2 className="eg-h3" style={{ fontSize: 21 }}>Other B2B markets</h2>
              <ul className="eg-list" style={{ gap: 8 }}>
                {ALSO.map((a) => (
                  <li key={a} style={{ fontSize: 14.5 }}><span>{a}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section tone="deep" label="How we decide fit">
          <QA
            eyebrow="Is your market a fit?"
            q="Three questions decide it."
            a="Do your buyers show up in a public record (licenses, inspections, permits, property or procurement)? Is one new account worth a lot to you? Do you sell over weeks or months, not minutes? Three yeses and the engine will find you calls worth making."
          />
          <div className="eg-links">
            <Link href="/services/account-engine" className="eg-link">How the Account Engine works &rarr;</Link>
            <Link href="/case-studies/noovis" className="eg-link">See it running for a network integrator &rarr;</Link>
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
