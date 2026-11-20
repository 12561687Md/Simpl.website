import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "./components/mi/Reveal";
import { Shell, SecHead, RecordCard, Fig, CountCard, Faq, Terms, FinalCta, WHY_LESS } from "./components/mi/kit";
import { RECORDS, STATS, LEDGER } from "./lib/records";
import { INDUSTRIES, SITE } from "./lib/site";
import { pageMeta, webPage, faqPage, service, ldJson } from "./lib/schema";

const PATH = "/";
const TITLE = "Simpl: Market Intelligence for Commercial Building Services";
const DESCRIPTION =
  "Simpl reads public inspection, violation, certificate and permit records, ranks the buildings that need your trade and why, and hands your team who to call, with the record attached.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const HOME_FAQS = [
  {
    q: "What do I actually get?",
    a: "A ranked list of buildings in your territory that have a dated, public reason to need your trade: a failed inspection, a lapsed certificate, an unsafe facade filing, a citation, a permit, a deadline. Each one comes with the record link, the date, the line from the record that matters, and the owner on record where the source names one.",
  },
  {
    q: "Where does the data come from?",
    a: "Public records only: city and county violation and inspection data, state elevator and inspection records, building permits, recertification portals and federal inspection files. When a record is not published online, we file a public records request for it. Every reason we show links to the agency's own page or dataset.",
  },
  {
    q: "Is this a lead list?",
    a: "No. A lead list is a name and a phone number. We hand you a reason to call, dated and sourced, so the first sentence on the call is a fact the owner can check. That's the difference between a cold call and a useful one.",
  },
  {
    q: "How fresh is it?",
    a: "We check sources every night. Each agency updates on its own schedule (some daily, some monthly), so every row shows the date of the record and the date we pulled it. Nothing is presented as newer than it is.",
  },
  {
    q: "Do you score buildings with a secret formula?",
    a: "No black-box scores. Buildings are ranked by things you can see: how serious the record is, how recent it is, and how close the deadline is. The reason is always written out, with the record one click away.",
  },
  {
    q: "What does it cost?",
    a: "Pricing is set per territory and given on a 15-minute call. The terms are fixed: a flat price per territory, month to month after setup, no credits, no lookup or usage caps, and no auto-renew trap.",
  },
  {
    q: "My trade isn't listed. Can you still help?",
    a: "Probably. If the work in your trade is triggered by an inspection, a violation, a permit or a deadline, there is usually a public record of it. Tell us your trade and territory and we'll tell you honestly what the records support.",
  },
];

export default function Home() {
  const cityStats = [STATS.chicago, STATS.sanfrancisco, STATS.columbus, STATS.cincinnati];
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
          service({
            name: "Market intelligence for commercial building services",
            path: "/how-it-works",
            serviceType: "Market intelligence",
            audience: "Commercial building service companies",
            description: DESCRIPTION,
          }),
          faqPage(HOME_FAQS)
        )}
      />

      {/* Hero */}
      <section className="m-hero">
        <div className="m-wrap m-hero-grid">
          <div>
            <h1 className="m-h1">
              We find the buildings that need you, <span className="m-blue">before your competitors know they exist.</span>
            </h1>
            <p className="m-pos">
              <b>Simpl, the market intelligence partner for commercial building services.</b>
            </p>
            <p className="m-lead">
              We read the public record every night, rank the buildings with a dated reason to need your trade, and hand your team who to call, with the record attached.
            </p>
            <div className="m-ctas">
              <Link href={SITE.primaryCta.href} className="m-btn primary">
                See your market <span className="arr" aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/how-it-works#sample" className="m-textlink">Read a sample brief</Link>
            </div>
          </div>

          <div className="m-ledger" aria-label="Recent public records, examples">
            <div className="top">
              <span className="live m-label"><span className="dot" aria-hidden="true" /> Reasons to call</span>
              <span className="m-label">Public record</span>
            </div>
            <ol>
              {LEDGER.map((r, i) => (
                <li key={r.id} className="m-feed" style={{ animationDelay: `${200 + i * 140}ms` }}>
                  <div className="d">{r.date}</div>
                  <div>
                    <div className="a">{r.address.split(",")[0].toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}, {r.place}</div>
                    <div className="r">{r.why}</div>
                    <div className="s">
                      <a href={r.open.url} target="_blank" rel="noopener noreferrer">{r.open.name}</a>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="foot">Real records, pulled Nov 18 to 19, 2026. Examples from six cities, not a client&apos;s list.</div>
          </div>
        </div>
      </section>

      {/* Buried */}
      <section className="m-sec" aria-labelledby="buried">
        <div className="m-wrap">
          <SecHead h2={<>The reasons to call are already public. <span className="m-blue">They&apos;re just buried.</span></>} id="buried">
            <p className="m-body">
              Four cities, millions of records, free to anyone who digs. Nobody on your team has time to read them, so the buildings that need you sit in a database until someone else gets there first.
            </p>
          </SecHead>
          <Reveal>
            <div className="m-figs">
              {cityStats.map((s) => (
                <Fig key={s.id} s={s} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="m-sec" aria-labelledby="receipts">
        <div className="m-wrap">
          <SecHead h2="Receipts, not scores." id="receipts">
            <p className="m-body">
              Every reason we hand you is dated, quoted from the record, and one click from the agency&apos;s own page. Here are three, exactly as the public record shows them.
            </p>
          </SecHead>
          <div className="m-records">
            <RecordCard r={RECORDS.cincinnati} />
            <RecordCard r={RECORDS.miami} delay={120} />
            <RecordCard r={RECORDS.sanfrancisco} delay={240} />
          </div>

          <div className="m-split even" style={{ marginTop: 72, alignItems: "stretch" }}>
            <CountCard
              main={STATS.mdFailedTwice}
              subs={[STATS.mdComplaint, STATS.mdExpiring]}
              note="Each building comes with the owner on record, the address, and the state's own inspection history."
            />
            <Reveal className="m-count">
              <div className="m-label" style={{ marginBottom: 14 }}>Unincorporated Miami-Dade, county records</div>
              <div className="n">{STATS.miami.value}</div>
              <div className="l">{STATS.miami.label}</div>
              <p className="m-body" style={{ fontSize: 14.5, marginTop: 16 }}>
                Each one owes a recertification report the county is now enforcing. Every case has a public page with the year due and the enforcement status.
              </p>
              <p className="m-src">
                <span className="k">Source:</span> <a href={STATS.miami.source.url} target="_blank" rel="noopener noreferrer">{STATS.miami.source.name}</a>. Pulled {STATS.miami.pulled}. {STATS.miami.definition}. Covers the county&apos;s own jurisdiction only; each city runs its own program.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="m-sec" aria-labelledby="how">
        <div className="m-wrap">
          <SecHead h2="How it works" id="how">
            <p className="m-body">Three steps. You only do the last one.</p>
          </SecHead>
          <Reveal className="m-steps">
            <div className="m-step">
              <div className="k">01</div>
              <h3>We read every record.</h3>
              <p className="m-body">Inspections, violations, certificates, permits and recertification deadlines for your territory, checked every night. Where a record isn&apos;t online, we request it.</p>
              <div className="viz m-chips" aria-label="Example record types">
                <span className="m-chip">Failed inspections</span>
                <span className="m-chip">Lapsed certificates</span>
                <span className="m-chip">Unsafe facade filings</span>
                <span className="m-chip">Citations</span>
                <span className="m-chip">Permits</span>
                <span className="m-chip">Deadlines</span>
              </div>
            </div>
            <div className="m-step">
              <div className="k">02</div>
              <h3>We rank who needs you and why.</h3>
              <p className="m-body">Strongest reason first, closest deadline first. Every row says why in one plain line, so nobody has to trust a score.</p>
              <div className="viz">
                <ul className="m-rank">
                  <li><span className="i">1</span><span className="t">Order of abatement posted</span><span className="due">15-day order</span></li>
                  <li><span className="i">2</span><span className="t">Failed, reinspected, failed again</span><span className="due">still failing</span></li>
                  <li><span className="i">3</span><span className="t">Certificate expires soon</span><span className="due">next 90 days</span></li>
                </ul>
                <div className="m-sample">Illustration</div>
              </div>
            </div>
            <div className="m-step">
              <div className="k">03</div>
              <h3>We hand you who to call.</h3>
              <p className="m-body">The building, the owner on record, the reason, and the record itself. Your rep opens the call with a fact the owner can check.</p>
              <div className="viz m-callrow">
                <span className="t">&ldquo;Your fire escape was marked unsafe and a citation went out in July. Who&apos;s handling the repair?&rdquo;</span>
                <span className="x">An opener built from the Cincinnati record above.</span>
              </div>
            </div>
          </Reveal>
          <div className="m-ctas">
            <Link href="/how-it-works" className="m-textlink">See a full sample brief</Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="m-sec" aria-labelledby="trades">
        <div className="m-wrap">
          <SecHead h2="Built for the trades that buildings are required to call." id="trades">
            <p className="m-body">Each trade has its own records. We watch the ones that mean a building needs you now.</p>
          </SecHead>
          <Reveal as="ul" className="m-trades">
            {INDUSTRIES.map((t, i) => (
              <li key={t.slug}>
                <Link href={t.href}>
                  <span className="i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="n">{t.label}</span>
                  <span className="d">{t.desc}</span>
                  <span className="ar" aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Terms */}
      <section className="m-sec" aria-labelledby="terms">
        <div className="m-wrap m-split">
          <SecHead h2="Honest terms, out loud." id="terms">
            <p className="m-body">The most common complaints about data vendors are credits, caps and contracts that renew themselves. We do none of them.</p>
            <p className="m-body"><b>Why we cost less:</b> {WHY_LESS}</p>
            <div className="m-ctas" style={{ marginTop: 26 }}>
              <Link href="/pricing" className="m-textlink">How pricing works</Link>
            </div>
          </SecHead>
          <Reveal>
            <Terms />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="m-sec" aria-labelledby="faq-h" id="faq">
        <div className="m-wrap m-split">
          <SecHead h2="Straight answers." id="faq-h" />
          <Faq faqs={HOME_FAQS} />
        </div>
      </section>

      <FinalCta sourcePage="/" />
    </Shell>
  );
}
