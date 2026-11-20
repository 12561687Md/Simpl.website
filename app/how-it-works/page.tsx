import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/mi/Reveal";
import { Shell, PageHero, SecHead, FinalCta, SourceLine } from "../components/mi/kit";
import { RECORDS } from "../lib/records";
import { pageMeta, webPage, service, faqPage, ldJson } from "../lib/schema";

const PATH = "/how-it-works";
const TITLE = "How Simpl Works, With a Sample Account Brief | Simpl";
const DESCRIPTION =
  "How Simpl turns public inspection, violation and permit records into a ranked list of buildings to call, plus a sample account brief built from a real San Francisco record.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const FAQS = [
  { q: "What does my team see each day?", a: "A ranked list of buildings in your territory, strongest reason first. Each row has the date, a one-line reason and the record link. Open a building and you get its brief: the record history, the owner on record, and the line to open the call with." },
  { q: "How long before we see our market?", a: "The first look happens on the call: we show you what the public record holds for your trade and territory. Setup timing depends on which records your territory publishes and which we have to request, and we say it in writing before you sign." },
  { q: "Can we check your work?", a: "That's the point. Every reason links to the agency's own page. If a record ever disagrees with what we showed, tell us and we fix it." },
];

const SF = RECORDS.sanfrancisco;
const TIMELINE = [
  { d: "Jun 30, 2026", e: "Notice of violation filed, 7 items", q: "Item #3, service fire alarm (909 sfhc): \"central fire alarm system is blinking yellow warning light. have licensed fire alarm company service / certify fire alarm system - required each year.\"", hot: true },
  { d: "Jul 16, 2026", e: "Inspected; first notice of violation sent", q: "\"Inspected premise and found code violations.\"" },
  { d: "Aug 18, 2026", e: "Reinspection 1: fire alarm still outstanding", q: "\"found outstanding item: #3,6. Completed items: #2,4,5.\" Final warning letter sent." },
  { d: "Oct 6, 2026", e: "Reinspection 2: same items outstanding", q: "Referred to a Director's hearing the next day." },
  { d: "Nov 12, 2026", e: "Director's hearing decision", q: "\"Owner not present or represented. 15 DAY OA issued.\"" },
  { d: "Nov 17, 2026", e: "Order of abatement posted on the premises", q: "\"Posted OA on premise.\"", hot: true },
];

export default function HowItWorks() {
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
          service({ name: "Market intelligence for commercial building services", path: PATH, serviceType: "Market intelligence", audience: "Commercial building service companies", description: DESCRIPTION }),
          faqPage(FAQS)
        )}
      />
      <PageHero
        crumbs={[{ name: "How it works", path: PATH }]}
        h1={<>Every reason to call, <span className="m-blue">with the receipt.</span></>}
        lead="We read the records, rank the buildings, and hand your team who to call. Below is exactly what one account looks like, built from a real public record."
      >
        <div className="m-ctas">
          <Link href="#sample" className="m-btn ghost">Jump to the sample brief</Link>
        </div>
      </PageHero>

      <section className="m-sec" aria-labelledby="steps">
        <div className="m-wrap">
          <SecHead h2="Three steps. You only do the last one." id="steps" />
          <Reveal className="m-steps">
            <div className="m-step">
              <div className="k">01 / Read</div>
              <h3>We read every record.</h3>
              <p className="m-body">City and county violations, state inspections and certificates, permits, recertification and retrofit deadlines, federal inspection files. Checked every night. When a record isn&apos;t online, we file a public records request.</p>
            </div>
            <div className="m-step">
              <div className="k">02 / Rank</div>
              <h3>We rank who needs you and why.</h3>
              <p className="m-body">By what you can see: how serious the record is, how recent, how close the deadline. No secret score. Every row says its reason in one line and shows the record date and the date we checked it.</p>
            </div>
            <div className="m-step">
              <div className="k">03 / Call</div>
              <h3>We hand you who to call.</h3>
              <p className="m-body">The building, the owner on record where the source names one, the reason, the excerpt that matters, and the link. Your rep opens with a fact, and the owner can check it while you talk.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="sample-h" id="sample">
        <div className="m-wrap">
          <SecHead h2="A sample brief." id="sample-h">
            <p className="m-body">
              What one building looks like for a fire alarm company. Every line below is from San Francisco&apos;s public record. <b>This is a sample built from public data, not a client&apos;s account.</b>
            </p>
          </SecHead>

          <Reveal className="m-dossier">
            <div className="hdr">
              <div>
                <div className="m-label">Account brief · Sample</div>
                <h3>1449 Powell St, San Francisco</h3>
                <div className="m-body" style={{ fontSize: 15 }}>Multi-unit residential (occupancy R-2) · DBI complaint 202658590</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="m-label">Reason to call</div>
                <div className="m-blue" style={{ fontSize: 17, marginTop: 6 }}>Fire alarm service ordered</div>
              </div>
            </div>
            <div className="facts">
              <div><div className="m-label">Newest record</div><div className="v m-mono">Nov 17, 2026</div></div>
              <div><div className="m-label">Deadline</div><div className="v">15-day order of abatement, issued Nov 13, 2026</div></div>
              <div><div className="m-label">What&apos;s outstanding</div><div className="v">Fire alarm service and certification (item #3)</div></div>
              <div><div className="m-label">Who to ask for</div><div className="v">Owner or property manager. The city suppresses the owner name on this record.</div></div>
            </div>
            <div className="body">
              <div className="tl">
                <div className="m-label">Record history</div>
                <ol className="m-tl">
                  {TIMELINE.map((t) => (
                    <li key={t.d + t.e} className={t.hot ? "hot" : undefined}>
                      <div className="d">{t.d}</div>
                      <div className="e">{t.e}</div>
                      <div className="q">{t.q}</div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="side">
                <div className="m-label">Open the call with</div>
                <p className="m-body" style={{ color: "var(--m-fg)", fontSize: 16.5, marginTop: 12 }}>
                  &ldquo;The city&apos;s notice says your fire alarm panel needs a licensed company to service and certify it, and an abatement order was posted on the 17th. We can be there this week.&rdquo;
                </p>
                <div className="m-label" style={{ marginTop: 28 }}>Why it ranks high</div>
                <ul className="m-body" style={{ fontSize: 15, paddingLeft: 18, marginTop: 10 }}>
                  <li>The fire item survived two reinspections while other items got fixed.</li>
                  <li>A hearing ordered the work on a 15-day clock.</li>
                  <li>The notice names the exact work: service and certify the alarm.</li>
                </ul>
                <a className="m-btn ghost" style={{ marginTop: 22, height: 46 }} href={SF.open.url} target="_blank" rel="noopener noreferrer">Open the record <span aria-hidden="true">&#8599;</span></a>
              </div>
            </div>
          </Reveal>
          <SourceLine sources={[SF.open, { name: "DataSF notices of violation", url: "https://data.sf.gov/resource/nbtm-fbw5.json?complaint_number=202658590" }]} pulled={SF.pulled} definition="Item #3 is matched to the fire alarm by the notice's sequence order. Inspector names are on the city page and left off here" />
        </div>
      </section>

      <section className="m-sec" aria-labelledby="hiw-faq">
        <div className="m-wrap m-split">
          <SecHead h2="What teams ask next." id="hiw-faq" />
          <div className="m-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta sourcePage={PATH} h2={<>Want a brief like this for <span className="m-blue">your</span> territory?</>} />
    </Shell>
  );
}
