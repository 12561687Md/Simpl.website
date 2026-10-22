import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BrowserFrame, PortalHome, MOCK_CAPTION } from "../../components/portal/Portal";
import { Section, Eyebrow, QA, Hero, FaqList, FinalCta, Related } from "../../components/engine/ui";
import { INDUSTRY_DATA, getIndustry } from "../../lib/industries";
import { CASE_STUDY } from "../../lib/site";
import { faqPage, service, webPage, ldJson, pageMeta } from "../../lib/schema";

export function generateStaticParams() {
  return INDUSTRY_DATA.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return { title: "Not found" };
  return pageMeta({ path: `/industries/${ind.slug}`, title: ind.metaTitle, description: ind.metaDescription });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;
  const idx = INDUSTRY_DATA.findIndex((i) => i.slug === ind.slug);
  const siblings = [INDUSTRY_DATA[(idx + 1) % INDUSTRY_DATA.length], INDUSTRY_DATA[(idx + 2) % INDUSTRY_DATA.length]];

  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path, name: ind.metaTitle, description: ind.metaDescription }),
            service({
              name: `Account Engine for ${ind.name}`,
              path,
              serviceType: `B2B lead generation: ${ind.keyword}`,
              description: ind.metaDescription,
              audience: ind.name,
            }),
            faqPage(ind.faqs)
          )}
        />

        <Hero
          layout="split"
          crumbs={[{ name: "Industries", path: "/industries" }, { name: ind.name, path }]}
          eyebrow={ind.eyebrow}
          h1={<>{ind.h1} <em>{ind.h1Dim}</em></>}
          sub={ind.sub}
          lead={ind.lead}
          visual={
            <BrowserFrame label={`Sample Account Engine home screen for ${ind.name.toLowerCase()} companies, with fictional accounts`} caption={MOCK_CAPTION}>
              <PortalHome rows={ind.rows} />
            </BrowserFrame>
          }
        />

        <Section tone="paper" tight label="Who this is for">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span className="mono-label" style={{ marginRight: 8 }}>Built for teams selling</span>
            {ind.buyers.map((b) => (
              <span key={b} className="eg-chip">{b}</span>
            ))}
          </div>
        </Section>

        <Section tone="paper" className="same" label="Reasons to call">
          <QA eyebrow="Reasons to call" q={ind.signalsQ} a={ind.signalsA} />
          <div className="eg-g3">
            {ind.signals.map((s) => (
              <div key={s.h} className="eg-card">
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
                <div className="eg-src">
                  Source:{" "}
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer">{s.src} &#8599;</a>
                  ) : (
                    s.src
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="deep" label="Who decides">
          <div className="eg-split">
            <div>
              <Eyebrow>Who decides</Eyebrow>
              <h2 className="eg-h2">Who signs, by seat.</h2>
              <p className="eg-answer">
                For every account, the engine looks for the person in each seat that matters for your sale, from public sources, and keeps only the people it can confirm.
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

        <Section tone="mist" label="What you get">
          <div className="eg-split">
            <QA
              eyebrow="What you get"
              q={`What the Account Engine does for ${ind.name.toLowerCase()} teams`}
              a="Your own branded portal with every account in your territory, scored every night on the signals above, a daily list of the best calls, the decision makers by seat, and a source link on every reason."
            >
              <div className="eg-links">
                <Link href="/services/account-engine" className="eg-link">How the Account Engine works &rarr;</Link>
                <Link href={`/blog/${ind.blog.slug}`} className="eg-link">{ind.blog.label} &rarr;</Link>
              </div>
            </QA>
            {ind.slug === "low-voltage-security" ? (
              <div className="eg-card feature">
                <span className="mono-label" style={{ display: "block", marginBottom: 14 }}>Running today</span>
                <h3 className="eg-h3" style={{ fontSize: 22 }}>Noovis, a network and smart-building integrator</h3>
                <p className="eg-body">Noovis designs and installs fiber, structured cabling, security and networked building systems. Its Account Engine watches permits, licensing, ownership and inspection records across six states.</p>
                <p style={{ marginTop: 18 }}><Link href={CASE_STUDY.href} className="eg-link">Read the Noovis case study &rarr;</Link></p>
              </div>
            ) : (
              <ul className="eg-list">
                <li><span><b>Every account in your territory,</b> not a purchased list</span></li>
                <li><span><b>The reasons that predict your sales,</b> defined with you</span></li>
                <li><span><b>A source link on every fact,</b> so your rep can quote it</span></li>
                <li><span><b>Exports</b> to a spreadsheet or your CRM</span></li>
              </ul>
            )}
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q={`${ind.name}: common questions`} />
          <FaqList faqs={ind.faqs} />
        </Section>

        <Related
          heading="Other industries"
          links={[
            ...siblings.map((s) => ({ href: `/industries/${s.slug}`, label: s.name, desc: s.sub })),
            { href: "/industries", label: "All industries", desc: "Every market we build engines for." },
          ]}
        />

        <FinalCta heading="See the top prospects in your territory." />
      </main>
      <Footer />
    </div>
  );
}
