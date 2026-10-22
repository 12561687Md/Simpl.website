import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, Eyebrow, QA, Ctas, FinalCta, Crumbs } from "../components/engine/ui";
import { INDUSTRY_DATA } from "../lib/industries";
import { SITE } from "../lib/site";
import { breadcrumb, ldJson } from "../lib/schema";

const TITLE = "Industries: Growth Engines for High-Ticket B2B Companies | Simpl";
const DESCRIPTION =
  "The Account Engine is built for B2B companies that sell to buildings, facilities and regulated businesses: low voltage and security, senior living technology, building systems, facility services, healthcare technology and more.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/industries" },
  alternates: { canonical: "https://www.simpl.pro/industries" },
};

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
          dangerouslySetInnerHTML={ldJson(breadcrumb([{ name: "Industries", path: "/industries" }]), {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Industries Simpl builds for",
            itemListElement: INDUSTRY_DATA.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, url: `${SITE.url}/industries/${i.slug}` })),
          })}
        />
        <section className="eg-hero" style={{ paddingBottom: 40 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Industries", path: "/industries" }]} />
            <Eyebrow>Industries</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 1000 }}>
              Built for companies whose buyers <span className="dim">leave a public paper trail.</span>
            </h1>
            <p className="eg-lead">
              If you sell high-ticket products, long-lasting services or big contracts to buildings, facilities and regulated businesses, your buyers are
              inspected, permitted, licensed and sold. Every one of those events is a reason to call.
            </p>
            <Ctas />
          </div>
        </section>

        <Section>
          <QA eyebrow="Industries" q="Which industries does the Account Engine work for?" a="Any B2B company whose next deal is announced somewhere official first. These are the markets we build for most." />
          <div className="eg-g3">
            {INDUSTRY_DATA.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="eg-card link">
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>{i.eyebrow}</div>
                <h2 className="eg-h3" style={{ fontSize: 21 }}>{i.h1} {i.h1Dim}</h2>
                <p className="eg-body" style={{ fontSize: 15 }}>{i.signals.slice(0, 3).map((s) => s.h).join(" · ")}</p>
                <span className="go">See how it works <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Also a fit" q="Don't see your industry?" a="If one new account is worth $50,000 or more to you and your buyers show up in public records, it probably works. We'll confirm it with your own top 25 before you pay anything." />
          <ul className="eg-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {ALSO.map((a) => <li key={a}><span>{a}</span></li>)}
          </ul>
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
