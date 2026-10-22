import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../../lib/og";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { Section, Eyebrow, QA, Ctas, FaqList, FinalCta, Crumbs, Soon } from "../../components/engine/ui";
import { breadcrumb, faqPage, service, ldJson } from "../../lib/schema";

const PATH = "/services/ai-receptionist";
const TITLE = "AI Receptionist and 24/7 Support Line for B2B Service Companies | Simpl";
const DESCRIPTION =
  "A 24/7 receptionist and support line for B2B service companies: answers calls and tickets at any hour, checks your own guides, replies, and pages whoever is on duty when it matters.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: `https://www.simpl.pro${PATH}` },
  alternates: { canonical: `https://www.simpl.pro${PATH}` },
};

const FAQS = [
  {
    q: "What does an AI receptionist do for a B2B service company?",
    a: "It answers every call and support ticket at any hour, identifies the customer and the site, checks your own guides and service history for the answer, resolves what it safely can, and pages whoever is on duty for anything urgent, with a written summary so your tech starts informed.",
  },
  {
    q: "What does it never do?",
    a: "It never guesses at an answer it can't find in your guides, never promises a price or a time your team hasn't set, and never sits on an emergency: anything on your urgent list goes straight to a person. Callers can always ask for a human.",
  },
  {
    q: "Does it replace our dispatchers or support staff?",
    a: "No. It covers the hours and the overflow your team can't, so nights, weekends and the 9 a.m. rush stop going to voicemail. Your people handle what needs a person, with the details already written down.",
  },
  {
    q: "Is it live yet?",
    a: "The 24/7 answering and support line is rolling out now as part of Account Engine Pro and as a standalone build. We give you the go-live date on the first call.",
  },
];

export default function AiReceptionistPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            service({ name: "AI receptionist and 24/7 support line", path: PATH, serviceType: "AI phone answering and after-hours support", description: DESCRIPTION, audience: "B2B service companies" }),
            breadcrumb([{ name: "Services", path: "/services" }, { name: "AI receptionist & 24/7 support", path: PATH }]),
            faqPage(FAQS)
          )}
        />

        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Services", path: "/services" }, { name: "AI receptionist & 24/7 support", path: PATH }]} />
            <ScrollReveal>
              <Eyebrow>AI receptionist & 24/7 support <Soon /></Eyebrow>
              <h1 className="eg-h1" style={{ maxWidth: 980 }}>
                Every call answered, <span className="dim">at 2 a.m. and at the 9 a.m. rush.</span>
              </h1>
              <p className="eg-lead">
                A receptionist and support line that knows your customers, your sites and your guides. It answers, solves what it safely can, and gets the
                right person on the phone for what it can&apos;t.
              </p>
              <Ctas secondary={{ label: "See pricing", href: "/pricing" }} />
            </ScrollReveal>
          </div>
        </section>

        <Section band>
          <QA
            eyebrow="How it works"
            q="What happens when a customer calls at 2 a.m.?"
            a="The line picks up on the first ring, finds the customer and the site, checks your guides and that site's history, and either walks them through the fix or pages your on-call tech with a written summary. Either way, there's a ticket waiting in the morning."
          />
          <div className="eg-g4">
            {[
              { h: "Answers", b: "Calls, voicemails and support tickets, any hour, in a voice that sounds like your company." },
              { h: "Checks", b: "Your own guides, manuals and the account's service history. Never the open internet." },
              { h: "Replies", b: "Solves routine questions on the spot: hours, status, the common fixes you approve." },
              { h: "Escalates", b: "Pages whoever is on duty for anything urgent, with the summary already written." },
            ].map((s, i) => (
              <div key={s.h} className="eg-card">
                <span className="eg-num">0{i + 1}</span>
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="eg-split">
            <div>
              <Eyebrow>What&apos;s included</Eyebrow>
              <h2 className="eg-h2">Built around your service, not a script.</h2>
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

        <Section band>
          <QA eyebrow="Questions" q="AI receptionist FAQ" />
          <FaqList faqs={FAQS} />
          <p className="eg-body" style={{ marginTop: 22 }}>
            More on where this fits: <Link className="eg-link" href="/blog/ai-receptionist-for-b2b-service-companies">what an AI receptionist should and shouldn&apos;t do for a B2B company</Link>.
          </p>
        </Section>

        <FinalCta
          heading="Want the phones covered too?"
          body="The 24/7 line is part of Account Engine Pro, or a standalone build. Start with your top 25 accounts and we'll scope the line on the same call."
        />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
