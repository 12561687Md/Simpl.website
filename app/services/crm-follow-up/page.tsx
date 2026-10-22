import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../../lib/og";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { Section, Eyebrow, QA, Ctas, FaqList, FinalCta, Crumbs, Soon } from "../../components/engine/ui";
import { breadcrumb, faqPage, service, ldJson } from "../../lib/schema";

const PATH = "/services/crm-follow-up";
const TITLE = "B2B CRM Setup and Follow-Up Sequences, Built and Run | Simpl";
const DESCRIPTION =
  "Every account worth a call flows into your CRM with the follow-up already running: email, wait, call, follow up until they reply or opt out. In your CRM or ours, set up and run by Simpl.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: `https://www.simpl.pro${PATH}` },
  alternates: { canonical: `https://www.simpl.pro${PATH}` },
};

const SEQUENCE = [
  { d: "Day 1", h: "A short, specific email", b: "Written around the account's reason to call, with the record linked. No templates that read like templates." },
  { d: "Day 3", h: "The call", b: "The rep calls with the reason and the brief in front of them. The outcome is logged in one click." },
  { d: "Day 7", h: "A useful follow-up", b: "Something worth reading: the inspection deadline, a fix that worked elsewhere, a date that matters to them." },
  { d: "Day 14+", h: "Until they reply or opt out", b: "Spaced follow-ups by email and phone, paused the moment they answer, stopped the moment they ask." },
];

const FAQS = [
  {
    q: "How many times should you follow up with a B2B prospect?",
    a: "More than most teams do. Most replies come after the first touch, so a sequence of several spaced touches across email and phone, stopping the moment the prospect replies or opts out, is the standard we build. The right number depends on deal size and how long your buyers take to decide; we set it with you and adjust it on what actually gets replies.",
  },
  {
    q: "Do we have to switch CRMs?",
    a: "No. If you already pay for a CRM such as Salesforce or HubSpot, we connect the engine to it and build the sequences there. If you don't have one, we set up ours, branded as yours, and run it.",
  },
  {
    q: "Is this cold email spam?",
    a: "No. Every message goes to a business contact with a specific, verifiable reason to hear from you, follows the CAN-SPAM rules (honest subject lines, a real address, a working opt-out that is honored), and stops when they ask. We don't buy lists and we don't blast.",
  },
  {
    q: "Is it live yet?",
    a: "CRM and follow-up are rolling out now as part of Account Engine Pro and as an add-on. We give you the date your sequences go live on the first call, and we never call it done until it is.",
  },
];

export default function CrmFollowUpPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            service({ name: "CRM and follow-up", path: PATH, serviceType: "CRM implementation and sales follow-up automation", description: DESCRIPTION, audience: "B2B sales teams" }),
            breadcrumb([{ name: "Services", path: "/services" }, { name: "CRM & follow-up", path: PATH }]),
            faqPage(FAQS)
          )}
        />

        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Services", path: "/services" }, { name: "CRM & follow-up", path: PATH }]} />
            <ScrollReveal>
              <Eyebrow>CRM & follow-up <Soon /></Eyebrow>
              <h1 className="eg-h1" style={{ maxWidth: 980 }}>
                Every good account, followed up <span className="dim">until it answers.</span>
              </h1>
              <p className="eg-lead">
                The engine finds the accounts with a reason to buy. This makes sure none of them go cold: each one flows into your CRM with the sequence
                already running, and your team sees exactly who is due today.
              </p>
              <Ctas secondary={{ label: "See the Account Engine", href: "/services/account-engine" }} />
            </ScrollReveal>
          </div>
        </section>

        <Section band>
          <QA
            eyebrow="The sequence"
            q="What does the follow-up actually look like?"
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
          <p className="eg-body" style={{ marginTop: 22, maxWidth: 780 }}>
            The cadence is a starting point we tune with you. Here&apos;s the reasoning behind it:{" "}
            <Link className="eg-link" href="/blog/b2b-sales-follow-up-cadence">how many times to follow up in B2B</Link>.
          </p>
        </Section>

        <Section>
          <div className="eg-split">
            <div>
              <Eyebrow>What&apos;s included</Eyebrow>
              <h2 className="eg-h2">Set up, written and run for you.</h2>
              <p className="eg-answer">You don&apos;t get a login and a manual. You get a working follow-up system and the people who keep it working.</p>
            </div>
            <ul className="eg-list">
              <li><span><b>CRM setup</b> in the one you have, or ours branded as yours</span></li>
              <li><span><b>Pipeline stages</b> that match how you actually sell</span></li>
              <li><span><b>Sequences written for each reason to call,</b> in your voice</span></li>
              <li><span><b>Engine to CRM sync:</b> good accounts arrive with their reason and their decision maker</span></li>
              <li><span><b>Call tasks and reminders</b> so reps see who is due today</span></li>
              <li><span><b>Opt-outs honored automatically,</b> every time</span></li>
              <li><span><b>A monthly review</b> of replies, meetings and what to change</span></li>
            </ul>
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Questions" q="CRM and follow-up FAQ" />
          <FaqList faqs={FAQS} />
          <p className="eg-body" style={{ marginTop: 22 }}>
            Included in <Link className="eg-link" href="/pricing">Account Engine Pro</Link>, or priced as an add-on. For the rules we follow, see the{" "}
            <a className="eg-link" href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" target="_blank" rel="noopener noreferrer">FTC&apos;s CAN-SPAM guide</a>.
          </p>
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
