import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { Section, Eyebrow, QA, FinalCta, Crumbs } from "../components/engine/ui";
import { breadcrumb, ldJson } from "../lib/schema";
import { SITE } from "../lib/site";

const TITLE = "About Simpl: Growth Engines Built by the Person You Talk To | Simpl";
const DESCRIPTION =
  "Simpl builds custom growth portals for high-ticket B2B companies from Raleigh, NC. No account managers, no sales floor: you work directly with the person who builds your engine.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/about" },
  alternates: { canonical: "https://www.simpl.pro/about" },
};

const BELIEFS = [
  { h: "Proof on every line.", b: "If we can't link a fact to its record, it doesn't go in your portal. Your rep should never repeat something we can't back up." },
  { h: "Sell what's built.", b: "Anything still rolling out is labeled that way, with a date. We never call a feature done until it is." },
  { h: "Yours, not rented.", b: "Your portal, your lists and your data belong to you, at your own address, exportable any time." },
  { h: "No overhead in your invoice.", b: "No account manager, no sales team, no office. That's the whole reason the price is what it is." },
];

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(breadcrumb([{ name: "About", path: "/about" }]), {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Simpl",
            url: `${SITE.url}/about`,
            mainEntity: {
              "@type": "Person",
              name: "Matt DuBois",
              jobTitle: "Founder",
              worksFor: { "@id": `${SITE.url}/#organization` },
            },
          })}
        />
        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "About", path: "/about" }]} />
            <div className="eg-split" style={{ alignItems: "center" }}>
              <ScrollReveal>
                <Eyebrow>About Simpl</Eyebrow>
                <h1 className="eg-h1" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
                  We build the engine. <span className="dim">You make the calls.</span>
                </h1>
                <p className="eg-lead">
                  Simpl started by scanning and fixing how businesses show up online. Then we built a portal for a company that sells network technology into
                  senior living, and the question changed from &quot;how do we get found&quot; to &quot;who should we call this week?&quot; The Account Engine is
                  the answer, and it&apos;s what we build now.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.08}>
                <figure style={{ margin: "0 auto", maxWidth: 340, position: "relative", aspectRatio: "4 / 5", borderRadius: 18, overflow: "hidden", border: "1px solid var(--rule-strong)" }}>
                  <Image src="/team/matt-dubois.png" alt="Matt DuBois, founder of Simpl" fill sizes="340px" style={{ objectFit: "cover", objectPosition: "50% 18%" }} priority />
                  <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "60px 22px 20px", background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.8))" }}>
                    <div style={{ fontWeight: 600, fontSize: 18 }}>Matt DuBois</div>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>Founder, builds every engine</div>
                  </figcaption>
                </figure>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Section band>
          <QA
            eyebrow="How we work"
            q="Who will we actually work with?"
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
        </Section>

        <Section>
          <QA
            eyebrow="What we build"
            q="What does Simpl build?"
            a="Custom growth portals for high-ticket B2B companies: the Account Engine, CRM and follow-up, and 24/7 receptionist and support lines. Websites, SEO, Google Business Profile and ads round it out."
          />
          <div className="eg-chips">
            <Link href="/services/account-engine" className="eg-chip">Account Engine</Link>
            <Link href="/services/crm-follow-up" className="eg-chip">CRM & follow-up</Link>
            <Link href="/services/ai-receptionist" className="eg-chip">AI receptionist</Link>
            <Link href="/services" className="eg-chip">All services</Link>
            <Link href="/industries" className="eg-chip">Industries</Link>
          </div>
          <p className="eg-body" style={{ marginTop: 30, maxWidth: 760 }}>
            Simpl is based in {SITE.city} and works with companies across the United States. Reach us at{" "}
            <a className="eg-link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
