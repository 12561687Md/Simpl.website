import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorBio from "../components/engine/AuthorBio";
import { Section, QA, Hero, FinalCta } from "../components/engine/ui";
import { SITE, CASE_STUDY } from "../lib/site";
import { webPage, person, ldJson, pageMeta } from "../lib/schema";

/* Primary keyword: "B2B client acquisition partner" (brand page). */
const PATH = "/about";
const TITLE = "About Simpl: A B2B Client Acquisition Partner | Simpl";
const DESCRIPTION =
  "Simpl is a B2B client acquisition partner based in Raleigh, NC. You work directly with the person who builds your Account Engine. No account managers.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const BELIEFS = [
  { h: "Proof on every line.", b: "If we can't link a fact to its record, it doesn't go in your portal. Your rep should never repeat something we can't back up." },
  { h: "Sell what's built.", b: "Anything still rolling out is labeled that way. We never call a feature done until it is." },
  { h: "Yours, not rented.", b: "Your portal, your lists and your data belong to you, under your name, exportable any time." },
  { h: "No overhead in your invoice.", b: "You're not paying for an account manager, a sales team or an office. You work directly with the person who builds it." },
];

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "AboutPage" }), person())} />

        <Hero
          crumbs={[{ name: "About", path: PATH }]}
          eyebrow="About Simpl"
          h1={<>A B2B client acquisition partner that <em>shows its work.</em></>}
          sub="We build the engine. You make the calls."
          lead="Simpl started by scanning and fixing how businesses show up online. Then we built a portal for a network integrator that sells into senior living and commercial buildings, and the question changed from &quot;how do we get found&quot; to &quot;who should we call this week?&quot; The Account Engine is the answer, and it is what we build now."
        />

        <Section tone="paper" label="How we work">
          <QA
            eyebrow="How we work"
            q="Who will you actually work with?"
            a="The person who builds your engine. Not an account manager relaying messages, not a junior team learning on your market. One call to map your market, one person accountable for what ships."
          />
          <div className="eg-g2">
            {BELIEFS.map((b) => (
              <div key={b.h} className="eg-card">
                <h3 className="eg-h3">{b.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{b.b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, maxWidth: 760 }} id="matt-dubois">
            <AuthorBio />
          </div>
        </Section>

        <Section tone="deep" label="What we build">
          <QA
            eyebrow="What we build"
            q="What does Simpl build?"
            a="For B2B companies: the Account Engine, CRM and follow-up, and a 24/7 AI receptionist and support line. For local service businesses: local SEO, websites, Google Business Profile management and PPC."
          />
          <div className="eg-chips">
            <Link href="/services/account-engine" className="eg-chip">Account Engine</Link>
            <Link href="/services/crm-follow-up" className="eg-chip">CRM & follow-up</Link>
            <Link href="/services/ai-receptionist" className="eg-chip">AI receptionist</Link>
            <Link href="/services/local-seo" className="eg-chip">Local SEO</Link>
            <Link href="/industries" className="eg-chip">Industries</Link>
            <Link href={CASE_STUDY.href} className="eg-chip">Noovis case study</Link>
          </div>
          <p className="eg-body" style={{ marginTop: 30, maxWidth: 760 }}>
            Simpl Systems LLC is based in {SITE.city} and works with companies across the United States. Reach us at{" "}
            <a className="eg-link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
