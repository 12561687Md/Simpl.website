import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/mi/Reveal";
import { Shell, PageHero, SecHead, RecordCard, CountCard, Faq, FinalCta } from "../../components/mi/kit";
import { INDUSTRY_PAGES, getIndustry } from "../../lib/industries";
import { RECORDS, STATS } from "../../lib/records";
import { SITE } from "../../lib/site";
import { pageMeta, webPage, service, faqPage, ldJson } from "../../lib/schema";

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMeta({ path: `/industries/${ind.slug}`, title: ind.title, description: ind.description });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;
  const records = ind.records.map((k) => RECORDS[k]);
  const stats = ind.stats.map((k) => STATS[k]);
  const others = INDUSTRY_PAGES.filter((i) => i.slug !== ind.slug);

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          webPage({ path, name: ind.title, description: ind.description }),
          service({ name: `Market intelligence for ${ind.label.toLowerCase()}`, path, serviceType: "Market intelligence", audience: ind.who, description: ind.description }),
          faqPage(ind.faqs)
        )}
      />
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }, { name: ind.label, path }]}
        h1={ind.h1}
        lead={ind.lead}
      >
        <div className="m-ctas">
          <Link href={SITE.primaryCta.href} className="m-btn primary">See your market <span className="arr" aria-hidden="true">&rarr;</span></Link>
          <Link href="/how-it-works#sample" className="m-textlink">Read a sample brief</Link>
        </div>
      </PageHero>

      <section className="m-sec" aria-labelledby="watch">
        <div className="m-wrap m-split">
          <SecHead h2="The records we watch." id="watch">
            <p className="m-body">For {ind.who.charAt(0).toLowerCase() + ind.who.slice(1)}</p>
          </SecHead>
          <Reveal as="ul" className="m-triggers">
            {ind.triggers.map((t) => (
              <li key={t.t}><span className="t">{t.t}</span><span className="w">{t.w}</span></li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="example">
        <div className="m-wrap">
          <SecHead h2="What the record shows." id="example">
            <p className="m-body">Real public records, pulled in November 2026. Every number links to where it came from.</p>
          </SecHead>
          <div className="m-split even" style={{ alignItems: "start" }}>
            {records.length > 0 ? (
              <div style={{ display: "grid", gap: 48 }}>
                {records.map((r) => <RecordCard key={r.id} r={r} />)}
              </div>
            ) : null}
            <div style={{ display: "grid", gap: 24 }}>
              {stats.map((s) => (
                <CountCard key={s.id} main={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="why">
        <div className="m-wrap m-split">
          <SecHead h2="Why it gets you the call." id="why">
            <p className="m-body">{ind.read}</p>
          </SecHead>
          <Reveal>
            <div className="m-quote">
              <p>{ind.opener}</p>
              <div className="who">{ind.openerNote || "An opener built from the public record on this page."}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="ind-faq">
        <div className="m-wrap m-split">
          <SecHead h2="Questions from your trade." id="ind-faq" />
          <Faq faqs={ind.faqs} />
        </div>
      </section>

      <section className="m-sec tight" aria-labelledby="other">
        <div className="m-wrap">
          <h2 className="m-label" id="other" style={{ margin: "0 0 18px", fontWeight: 400 }}>Other trades</h2>
          <div className="m-chips">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="m-chip" style={{ textDecoration: "none", fontSize: 13, padding: "8px 14px" }}>{o.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta sourcePage={path} h2={<>See your {ind.label.toLowerCase()} market.</>} defaultTrade={ind.label} />
    </Shell>
  );
}
