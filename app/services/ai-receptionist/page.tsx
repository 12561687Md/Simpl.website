import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Section, Eyebrow, QA, Hero, FaqList, FinalCta, Soon, Steps, Related } from "../../components/engine/ui";
import { faqPage, service, webPage, ldJson, pageMeta } from "../../lib/schema";

/* Primary keyword: "AI receptionist" (74,000/mo, KD 25).
   Secondary: AI receptionist for business, after hours answering service, 24/7 answering service. */
const PATH = "/services/ai-receptionist";
const TITLE = "AI Receptionist for B2B Service Companies, 24/7 | Simpl";
const DESCRIPTION =
  "An AI receptionist and after-hours answering service for B2B service companies: every call answered, your guides checked, the on-call tech paged.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const FAQS = [
  {
    q: "What does an AI receptionist do for a B2B service company?",
    a: "It answers every call and support ticket at any hour, identifies the customer and the site, checks your own guides and service history for the answer, resolves what it safely can, and pages whoever is on duty for anything urgent, with a written summary so your tech starts informed.",
  },
  {
    q: "How is it different from an after-hours answering service?",
    a: "A traditional answering service takes a message. This line knows your customers, your sites and your guides, so it can solve routine questions on the spot and hand off urgent ones with the details already written down. It runs 24/7 and covers overflow during the day too.",
  },
  {
    q: "What does it never do?",
    a: "It never guesses at an answer it can't find in your guides, never promises a price or a time your team hasn't set, and never sits on an emergency: anything on your urgent list goes straight to a person. Callers can always ask for a human.",
  },
  {
    q: "Does it replace our dispatchers or support staff?",
    a: "No. It covers the hours and the overflow your team can't, so nights, weekends and the morning rush stop going to voicemail. Your people handle what needs a person, with the details already written down.",
  },
  {
    q: "Is it live yet?",
    a: "The AI receptionist and 24/7 support line is rolling out now, as an add-on to the Account Engine or as a standalone build. We give you the go-live date on the first call, and we never call it done until it is.",
  },
];

function CallSummaryMock() {
  return (
    <figure style={{ margin: 0 }}>
      <div className="pm-frame" role="img" aria-label="Sample after-hours call summary: caller, site, issue, what the line did and who was paged. Fictional data.">
        <div className="pm-screen" style={{ gridTemplateColumns: "minmax(0,1fr)" }} aria-hidden="true">
          <div className="pm-body" style={{ padding: "2em 2.2em" }}>
            <div className="pm-hello">
              <div>
                <h4>Call summary, 2:14 AM</h4>
                <p>Support line · Answered on the first ring · 3 min 40 s</p>
              </div>
              <span className="pm-tag hot">On-call paged</span>
            </div>
            <div className="pm-tiles">
              <div className="pm-tile"><b>Ridgeview Commons</b><span>Customer site (fictional)</span></div>
              <div className="pm-tile"><b>Building C</b><span>Access control panel</span></div>
              <div className="pm-tile"><b>Urgent</b><span>On your urgent list</span></div>
              <div className="pm-tile"><b>T. Alvarez</b><span>On-call tech</span></div>
            </div>
            <div className="pm-card best">
              <div className="pm-lbl"><span>What happened</span><b>Ticket #4821</b></div>
              <div className="pm-change"><i /><span>Night manager reported the main door reader offline and residents locked out<small>Identified the site from the caller&apos;s number</small></span></div>
              <div className="pm-change"><i className="g" /><span>Walked through the reset in your guide: reader still offline<small>Source: Building C panel guide, step 4</small></span></div>
              <div className="pm-change"><i className="w" /><span>Paged the on-call tech with this summary and the site history<small>Tech acknowledged at 2:19 AM</small></span></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="pm-cap">Sample call summary. Names and sites are fictional.</figcaption>
    </figure>
  );
}

export default function AiReceptionistPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
            service({ name: "AI receptionist and 24/7 support line", path: PATH, serviceType: "AI receptionist and after-hours answering service", description: DESCRIPTION, audience: "B2B service companies" }),
            faqPage(FAQS)
          )}
        />

        <Hero
          layout="split"
          crumbs={[{ name: "Services", path: "/services" }, { name: "AI receptionist", path: PATH }]}
          eyebrow="Rolling out now"
          h1={<>An AI receptionist for B2B service companies, <em>answering 24/7.</em></>}
          sub="Every call answered, at 2 a.m. and at the morning rush."
          lead="A receptionist and support line that knows your customers, your sites and your guides. It answers, solves what it safely can, and gets the right person on the phone for what it can't."
          visual={<CallSummaryMock />}
        />

        <Section tone="paper" label="How it works">
          <QA
            eyebrow="How it works"
            q="What happens when a customer calls at 2 a.m.?"
            a="The line picks up on the first ring, finds the customer and the site, checks your guides and that site's history, and either walks them through the fix or pages your on-call tech with a written summary. Either way, there's a ticket waiting in the morning."
          />
          <Steps
            steps={[
              { k: "01 Answers", h: <>Every call, <em>any hour</em></>, b: "Calls, voicemails and support tickets, in a voice that sounds like your company. 24/7, or overflow only." },
              { k: "02 Checks", h: <>Your guides, <em>not the internet</em></>, b: "Your manuals, your service history for that site and the rules you approve. Nothing else." },
              { k: "03 Replies", h: <>Solves the <em>routine</em></>, b: "Hours, ticket status, the common fixes you sign off on, handled on the spot." },
              { k: "04 Escalates", h: <>Pages the <em>right person</em></>, b: "Anything on your urgent list goes to whoever is on duty, with the summary already written." },
            ]}
          />
        </Section>

        <Section tone="deep" label="What is included">
          <div className="eg-split">
            <div>
              <Eyebrow>What&apos;s included <Soon /></Eyebrow>
              <h2 className="eg-h2">An after-hours answering service built around your service, not a script.</h2>
              <p className="eg-answer">We build it from your guides and your on-call rules, test it on real calls with you, and keep tuning it every month.</p>
            </div>
            <ul className="eg-list">
              <li><span><b>Your number,</b> answered 24/7, or overflow only</span></li>
              <li><span><b>Your knowledge base</b> loaded and kept current</span></li>
              <li><span><b>Your urgent list</b> and on-call rotation, honored every time</span></li>
              <li><span><b>Tickets and summaries</b> in your helpdesk or CRM</span></li>
              <li><span><b>Call recordings and transcripts</b> for review</span></li>
              <li><span><b>A monthly review</b> of what it handled and what it handed off</span></li>
            </ul>
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q="AI receptionist FAQ" />
          <FaqList faqs={FAQS} />
          <p className="eg-body" style={{ marginTop: 24 }}>
            Responding fast matters for new business too: a{" "}
            <a className="eg-link" href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" target="_blank" rel="noopener noreferrer">Harvard Business Review study</a>{" "}
            found firms that answered within an hour were far more likely to qualify a lead.
          </p>
        </Section>

        <Related
          links={[
            { href: "/blog/ai-receptionist-for-b2b-service-companies", label: "What an AI receptionist should do for a B2B company", desc: "Where it fits, where it doesn't, and what to ask before you buy." },
            { href: "/services/crm-follow-up", label: "CRM implementation and follow-up", desc: "Every caller and every good account, followed up." },
            { href: "/services/account-engine", label: "The Account Engine", desc: "Sales prospecting from the public record, every night." },
          ]}
        />

        <FinalCta
          heading="Want the phones covered too?"
          body="The line works on its own or alongside the Account Engine. Tell us your hours, your urgent list and your systems, and we will scope it on one call."
          primary={{ label: "Book a call", href: "/book" }}
        />
      </main>
      <Footer />
    </div>
  );
}
