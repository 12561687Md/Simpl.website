import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Section, Eyebrow, QA, Hero, FaqList, FinalCta, Soon, Related } from "../../components/engine/ui";
import { faqPage, service, webPage, ldJson, pageMeta } from "../../lib/schema";

/* Primary keyword: "CRM implementation services" (170/mo).
   Secondary: sales follow up, sales follow-up sequence, B2B CRM setup. */
const PATH = "/services/crm-follow-up";
const TITLE = "CRM Implementation Services and Sales Follow-Up | Simpl";
const DESCRIPTION =
  "CRM implementation services for B2B sales teams: every account worth a call lands in your CRM with the follow-up already running, until they reply.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const SEQUENCE = [
  { d: "Day 1", h: "A short, specific email", b: "Written around the account's reason to call, with the record linked. No templates that read like templates." },
  { d: "Day 3", h: "The call", b: "The rep calls with the reason and the brief in front of them. The outcome is logged in one click." },
  { d: "Day 7", h: "A useful follow-up", b: "Something worth reading: the inspection deadline, a fix that worked elsewhere, a date that matters to them." },
  { d: "Day 14+", h: "Until they reply or opt out", b: "Spaced follow-ups by email and phone, paused the moment they answer, stopped the moment they ask." },
];

const FAQS = [
  {
    q: "What do CRM implementation services include?",
    a: "Setting up the CRM around how you actually sell: pipeline stages, fields, users, tasks and the follow-up sequences, plus the connection that brings every good account in from the Account Engine with its reason and decision maker attached. We run it with you after launch.",
  },
  {
    q: "How many times should you follow up with a B2B prospect?",
    a: "More than most teams do. A sequence of several spaced touches across email and phone, stopping the moment the prospect replies or opts out, is the standard we build. The right number depends on deal size and how long your buyers take to decide; we set it with you and adjust it on what actually gets replies.",
  },
  {
    q: "Do we have to switch CRMs?",
    a: "No. If you already pay for a CRM such as Salesforce or HubSpot, we connect the engine to it and build the sequences there. If you don't have one, we set one up under your company's name and run it.",
  },
  {
    q: "Is this cold email spam?",
    a: "No. Every message goes to a business contact with a specific, verifiable reason to hear from you, follows the CAN-SPAM rules (honest subject lines, a real address, a working opt-out that is honored), and stops when they ask. We don't buy lists and we don't blast.",
  },
  {
    q: "Is it live yet?",
    a: "CRM and follow-up are rolling out now as an add-on to the Account Engine. We give you the date your sequences go live on the first call, and we never call it done until it is.",
  },
];

function SequenceMock() {
  return (
    <figure style={{ margin: 0 }}>
      <div className="pm-frame" role="img" aria-label="Sample follow-up sequence for one account: email, call, follow-up and the reply, with the reason to call attached. Fictional data.">
        <div className="pm-screen" style={{ gridTemplateColumns: "minmax(0,1fr)" }} aria-hidden="true">
          <div className="pm-body" style={{ padding: "2em 2.2em" }}>
            <div className="pm-hello">
              <div>
                <h4>Harbor Crest Apartments</h4>
                <p>New owner, re-bidding vendors · Asset manager confirmed</p>
              </div>
              <span className="pm-tag src">&#8599; Deed record</span>
            </div>
            <div className="pm-card">
              <div className="pm-lbl"><span>Follow-up sequence</span><b>Step 3 of 6</b></div>
              <div className="pm-time">
                <div><span>Day 1</span><i /><span>Email sent: &quot;Congratulations on the purchase&quot;</span></div>
                <div><span>Day 3</span><i /><span>Call: left a message, logged in one click</span></div>
                <div><span>Day 7</span><i /><span>Follow-up: vendor review checklist for new owners</span></div>
                <div><span>Day 9</span><i className="w" /><span>Reply received. Sequence paused automatically</span></div>
              </div>
            </div>
            <div className="pm-card best">
              <div className="pm-lbl"><span>Next step</span><b>Today</b></div>
              <div className="pm-why" style={{ marginTop: 0 }}>Book a site walk with the asset manager. Brief and record attached.</div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="pm-cap">Sample sequence. Account and people are fictional.</figcaption>
    </figure>
  );
}

export default function CrmFollowUpPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
            service({ name: "CRM implementation and sales follow-up", path: PATH, serviceType: "CRM implementation services", description: DESCRIPTION, audience: "B2B sales teams" }),
            faqPage(FAQS)
          )}
        />

        <Hero
          layout="split"
          crumbs={[{ name: "Services", path: "/services" }, { name: "CRM & follow-up", path: PATH }]}
          eyebrow="Rolling out now"
          h1={<>CRM implementation services that <em>follow up for you.</em></>}
          sub="Every good account, followed up until it answers."
          lead="The Account Engine finds the accounts with a reason to buy. This makes sure none of them go cold: each one lands in your CRM with the sequence already running, and your team sees exactly who is due today."
          visual={<SequenceMock />}
        />

        <Section tone="paper" label="The sequence">
          <QA
            eyebrow="The sequence"
            q="What does sales follow-up actually look like?"
            a="Email first, wait, call, then follow up until they reply or opt out. Every touch carries the account's reason to call, so it reads like a person who did their homework, because the homework is done."
          />
          <div className="eg-g4">
            {SEQUENCE.map((s) => (
              <div key={s.d} className="eg-card">
                <span className="eg-num">{s.d}</span>
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
              </div>
            ))}
          </div>
          <p className="eg-body" style={{ marginTop: 24, maxWidth: 780 }}>
            The cadence is a starting point we tune with you. The reasoning behind it:{" "}
            <Link className="eg-link" href="/blog/b2b-sales-follow-up-cadence">how many times to follow up in B2B</Link>.
          </p>
        </Section>

        <Section tone="deep" label="What is included">
          <div className="eg-split">
            <div>
              <Eyebrow>What&apos;s included <Soon /></Eyebrow>
              <h2 className="eg-h2">Set up, written and run for you.</h2>
              <p className="eg-answer">You don&apos;t get a login and a manual. You get a working follow-up system and the people who keep it working.</p>
            </div>
            <ul className="eg-list">
              <li><span><b>CRM setup</b> in the one you have, or one under your name</span></li>
              <li><span><b>Pipeline stages</b> that match how you actually sell</span></li>
              <li><span><b>Sequences written for each reason to call,</b> in your voice</span></li>
              <li><span><b>Engine to CRM sync:</b> good accounts arrive with their reason and their decision maker</span></li>
              <li><span><b>Call tasks and reminders</b> so reps see who is due today</span></li>
              <li><span><b>Opt-outs honored automatically,</b> every time</span></li>
              <li><span><b>A monthly review</b> of replies, meetings and what to change</span></li>
            </ul>
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q="CRM and follow-up FAQ" />
          <FaqList faqs={FAQS} />
          <p className="eg-body" style={{ marginTop: 24 }}>
            For the rules we follow, see the{" "}
            <a className="eg-link" href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" target="_blank" rel="noopener noreferrer">FTC&apos;s CAN-SPAM guide</a>.
          </p>
        </Section>

        <Related
          links={[
            { href: "/services/account-engine", label: "The Account Engine", desc: "Where the accounts worth a call come from." },
            { href: "/blog/b2b-sales-follow-up-cadence", label: "How many times to follow up in B2B", desc: "A cadence that gets replies without burning the account." },
            { href: "/services/ai-receptionist", label: "AI receptionist", desc: "Every inbound call answered, any hour." },
          ]}
        />

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
