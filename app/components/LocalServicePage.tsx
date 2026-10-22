import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Section, Eyebrow, QA, Hero, FaqList, FinalCta, Related, Ctas } from "./engine/ui";
import { faqPage, service, webPage, ldJson } from "../lib/schema";

/**
 * Door two (local businesses): one server-rendered template for Local SEO,
 * Websites, Google Business Profile and PPC. Data in, themed page out, schema
 * built from the same data (schema sync rule).
 */

export interface LocalServiceData {
  path: string;
  crumb: string;
  title: string;
  description: string;
  serviceName: string;
  serviceType: string;
  eyebrow: string;
  h1: ReactNode;
  sub: string;
  lead: string;
  includesHeading: string;
  includes: string[];
  whyEyebrow: string;
  whyHeading: string;
  whyBody: string;
  faqs: { q: string; a: string }[];
  related: { href: string; label: string; desc?: string }[];
}

function AuditMock() {
  return (
    <figure style={{ margin: 0 }}>
      <div className="pm-frame" role="img" aria-label="Sample free website audit result: an overall score with the top fixes for a fictional local business">
        <div className="pm-screen" style={{ gridTemplateColumns: "minmax(0,1fr)" }} aria-hidden="true">
          <div className="pm-body" style={{ padding: "2em 2.2em" }}>
            <div className="pm-hello">
              <div>
                <h4>Website audit: Maple Street Plumbing</h4>
                <p>Sample business (fictional) · Scanned in 58 seconds</p>
              </div>
              <span className="pm-score big">64</span>
            </div>
            <div className="pm-tiles">
              <div className="pm-tile"><b>Mobile speed</b><span>Needs work</span></div>
              <div className="pm-tile"><b>Map listing</b><span>Incomplete</span></div>
              <div className="pm-tile"><b>Reviews</b><span>Steady</span></div>
              <div className="pm-tile"><b>AI search</b><span>Not cited yet</span></div>
            </div>
            <div className="pm-card best">
              <div className="pm-lbl"><span>Fastest wins</span><b>5 found</b></div>
              <div className="pm-change"><i className="w" /><span>Quote form fails on iPhone<small>Every mobile lead lost at the last step</small></span></div>
              <div className="pm-change"><i /><span>No page for &quot;water heater repair&quot;<small>Your most-searched service has nowhere to land</small></span></div>
              <div className="pm-change"><i className="g" /><span>Hours and service area missing on the map listing<small>Ten-minute fix</small></span></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="pm-cap">Sample audit. The business is fictional.</figcaption>
    </figure>
  );
}

export default function LocalServicePage({ d }: { d: LocalServiceData }) {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: d.path, name: d.title, description: d.description }),
            service({ name: d.serviceName, path: d.path, serviceType: d.serviceType, description: d.description, audience: "Local service businesses" }),
            faqPage(d.faqs)
          )}
        />

        <Hero
          layout="split"
          crumbs={[{ name: "Services", path: "/services" }, { name: d.crumb, path: d.path }]}
          eyebrow={d.eyebrow}
          h1={d.h1}
          sub={d.sub}
          lead={d.lead}
          visual={<AuditMock />}
          ctas={<Ctas primary={{ label: "Get your free website audit", href: "/free-tools" }} />}
        />

        <Section tone="paper" label="What is included">
          <QA eyebrow="What's included" q={d.includesHeading} />
          <div className="eg-g3">
            {d.includes.map((item) => (
              <div key={item} className="eg-card" style={{ padding: "22px 24px" }}>
                <ul className="eg-list"><li><span>{item}</span></li></ul>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="deep" label="Why it works">
          <div className="eg-split">
            <div>
              <Eyebrow>{d.whyEyebrow}</Eyebrow>
              <h2 className="eg-h2">{d.whyHeading}</h2>
            </div>
            <p className="eg-answer" style={{ marginTop: 0 }}>{d.whyBody}</p>
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q={`${d.crumb} FAQ`} />
          <FaqList faqs={d.faqs} />
        </Section>

        <Related links={d.related} />

        <FinalCta
          heading="See what's holding your site back."
          body="Run the free website audit: a score, your fastest wins and what each one is worth, in about a minute. If a fix isn't worth doing, we will tell you that too."
          primary={{ label: "Get your free website audit", href: "/free-tools" }}
        />
      </main>
      <Footer />
    </div>
  );
}
