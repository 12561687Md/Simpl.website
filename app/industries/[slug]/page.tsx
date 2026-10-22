import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OG_IMAGE } from "../../lib/og";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import PortalMock from "../../components/engine/PortalMock";
import { Section, Eyebrow, QA, Ctas, FaqList, FinalCta, Crumbs } from "../../components/engine/ui";
import { INDUSTRY_DATA, getIndustry } from "../../lib/industries";
import { breadcrumb, faqPage, service, engineOffers, ldJson } from "../../lib/schema";

export function generateStaticParams() {
  return INDUSTRY_DATA.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return { title: "Not found" };
  const url = `https://www.simpl.pro/industries/${ind.slug}`;
  return {
    title: { absolute: ind.metaTitle },
    description: ind.metaDescription,
    openGraph: { images: OG_IMAGE, title: ind.metaTitle, description: ind.metaDescription, url },
    alternates: { canonical: url },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;
  const siblings = INDUSTRY_DATA.filter((i) => i.slug !== ind.slug);

  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            service({
              name: `Account Engine for ${ind.name}`,
              path,
              serviceType: "Trigger-based B2B prospecting and sales intelligence portal",
              description: ind.metaDescription,
              audience: ind.name,
              offers: engineOffers(),
            }),
            breadcrumb([{ name: "Industries", path: "/industries" }, { name: ind.name, path }]),
            faqPage(ind.faqs)
          )}
        />

        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Industries", path: "/industries" }, { name: ind.name, path }]} />
            <div className="eg-hero-grid">
              <ScrollReveal>
                <Eyebrow>{ind.eyebrow}</Eyebrow>
                <h1 className="eg-h1">
                  {ind.h1} <span className="dim">{ind.h1Dim}</span>
                </h1>
                <p className="eg-lead">{ind.lead}</p>
                <Ctas secondary={{ label: "How the engine works", href: "/services/account-engine" }} />
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}>
                <PortalMock rows={ind.rows} />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "rgba(19,21,23,0.8)" }}>
          <div className="eg-wrap" style={{ padding: "28px 32px", display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginRight: 8 }}>Built for teams selling</span>
            {ind.buyers.map((b) => (
              <span key={b} className="eg-chip" style={{ cursor: "default" }}>{b}</span>
            ))}
          </div>
        </section>

        <Section>
          <QA eyebrow="Reasons to call" q={ind.signalsQ} a={ind.signalsA} />
          <div className="eg-g3">
            {ind.signals.map((s) => (
              <div key={s.h} className="eg-card">
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
                <div className="mono" style={{ marginTop: 14, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Source:{" "}
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>{s.src} &#8599;</a>
                  ) : (
                    s.src
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section band>
          <div className="eg-split">
            <div>
              <Eyebrow>Who decides</Eyebrow>
              <h2 className="eg-h2">Who signs, by seat.</h2>
              <p className="eg-answer">
                For every account, the engine looks for the person in each seat that matters for your sale, from public sources, and keeps only the people it
                can confirm.
              </p>
            </div>
            <div className="eg-g2">
              {ind.seats.map((s) => (
                <div key={s.seat} className="eg-card">
                  <h3 className="eg-h3" style={{ fontSize: 17 }}>{s.seat}</h3>
                  <p className="eg-body" style={{ fontSize: 14.5 }}>{s.why}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <QA
            eyebrow="What you get"
            q={`What does the Account Engine do for ${ind.name.toLowerCase()} companies?`}
            a="Your own branded portal with every account in your territory, scored every night on the signals above, a daily list of the best calls, the decision makers by seat, and proof linked on every reason."
          />
          <div className="eg-ctas" style={{ marginTop: 0 }}>
            <Link href="/services/account-engine" className="eg-link">The full Account Engine &rarr;</Link>
            <Link href="/pricing" className="eg-link">Pricing &rarr;</Link>
            <Link href={`/blog/${ind.blog.slug}`} className="eg-link">Read: {ind.blog.label} &rarr;</Link>
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Questions" q={`${ind.name}: common questions`} />
          <FaqList faqs={ind.faqs} />
        </Section>

        <Section tight>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Other industries</div>
          <div className="eg-chips">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/industries/${s.slug}`} className="eg-chip">{s.name}</Link>
            ))}
          </div>
        </Section>

        <FinalCta
          heading={`See the top 25 accounts in your territory.`}
          body={`Tell us what you sell and where. We'll build a 25-account sample with the reason, the record and who decides for each, and walk you through it. Free, before you pay anything.`}
        />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
