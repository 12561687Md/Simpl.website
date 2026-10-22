import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, FaqList, Hero, FinalCta, type Tone } from "../components/engine/ui";
import { faqPage, webPage, ldJson, pageMeta } from "../lib/schema";

/* Primary keyword: "B2B lead generation FAQ" (question cluster; every
   question is a long-tail target). Answers here are worded for this page, not
   copied from the service pages, so no two pages carry the same block. */
const PATH = "/faq";
const TITLE = "B2B Lead Generation FAQ: Account Engine Explained | Simpl";
const DESCRIPTION =
  "Straight answers about Simpl: the Account Engine, where the data comes from, pricing, ownership, CRM follow-up, the AI receptionist and local SEO.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const GROUPS: { label: string; id: string; tone: Tone; faqs: { q: string; a: string }[] }[] = [
  {
    label: "The Account Engine",
    id: "account-engine",
    tone: "paper",
    faqs: [
      {
        q: "What does Simpl do, in one sentence?",
        a: "Simpl is a client acquisition partner for B2B companies: we build each client a private Account Engine that reads the public record every night and tells their sales team which accounts to call, why now and who decides, with a source link on every fact.",
      },
      {
        q: "What counts as a reason to call?",
        a: "Anything an official body records that makes your product relevant now: an inspection citation, a building permit, a sale or new owner, a new license or location, a public bid, an overdue inspection or the start of a budget season. We choose the ones that predict your sales with you.",
      },
      {
        q: "Which public sources does the engine read?",
        a: "It depends on your market. Common ones are state and federal inspection reports, CMS data, state licensing agencies, county permit and deed records, USAC E-Rate filings, SAM.gov and state procurement portals, the NPI registry and company websites. Every fact links back to its source.",
      },
      {
        q: "Do other companies in my market see my portal?",
        a: "No. Each portal is built for one company, under its own name, with its own logins. Your lists, notes and results are yours.",
      },
      {
        q: "How do I see what it would find for us?",
        a: "Ask for your top prospects. We build a sample of your own market, each account with the reason, the record and who decides, and walk you through it before you pay anything.",
      },
    ],
  },
  {
    label: "Pricing and ownership",
    id: "pricing",
    tone: "mist",
    faqs: [
      {
        q: "Why don't you list prices?",
        a: "Because every engine is different: the size of your territory, the number of data sources and the add-ons change the work. You get a one-time setup and a monthly fee in writing after a 30-minute call.",
      },
      {
        q: "Why does Simpl cost less than an agency or a new hire?",
        a: "You're not paying for an account manager, a sales team or an office. You work directly with the person who builds it.",
      },
      {
        q: "Can we export our data if we leave?",
        a: "Yes. Lists, notes and pipeline export any time, and they are yours to keep.",
      },
    ],
  },
  {
    label: "CRM, follow-up and the 24/7 line",
    id: "crm-ai",
    tone: "paper",
    faqs: [
      {
        q: "Will the engine work with Salesforce or HubSpot?",
        a: "Yes. We connect it to the CRM you already pay for, or set one up under your company's name if you don't have one.",
      },
      {
        q: "What happens to an after-hours call?",
        a: "The AI receptionist answers on the first ring, identifies the customer and site, checks your guides, solves what it safely can and pages whoever is on duty for anything urgent, with a written summary.",
      },
      {
        q: "Are CRM follow-up and the AI receptionist live?",
        a: "Both are rolling out now. We give you the go-live date on the first call, and we never call them done until they are.",
      },
    ],
  },
  {
    label: "Local SEO, websites and free tools",
    id: "local",
    tone: "mist",
    faqs: [
      {
        q: "Do you still work with local service businesses?",
        a: "Yes. Local SEO, website design, Google Business Profile management and PPC management are available on their own for businesses that win customers locally.",
      },
      {
        q: "What does the free website audit cost?",
        a: "Nothing. It takes about 60 seconds, needs no credit card, and scores your site 0 to 100 across six categories with every finding measured from live data.",
      },
      {
        q: "Do you mark up ad spend?",
        a: "No. You own the ad account and pay the platform directly. We charge for the management, never a cut of your spend.",
      },
    ],
  },
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION }), faqPage(all))} />
        <Hero
          crumbs={[{ name: "FAQ", path: PATH }]}
          eyebrow="FAQ"
          h1={<>B2B lead generation FAQ: <em>straight answers.</em></>}
          sub="No sales-page hedging."
          lead="What the Account Engine is, where the data comes from, how pricing works, and what we do for local businesses. If your question isn't here, email team@simpl.pro."
          ctas={
            <div className="eg-chips" style={{ marginTop: 30 }}>
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="eg-chip">{g.label}</a>
              ))}
            </div>
          }
        />
        {GROUPS.map((g) => (
          <Section key={g.id} id={g.id} tone={g.tone} tight label={g.label}>
            <h2 className="eg-h2" style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 22 }}>{g.label}</h2>
            <FaqList faqs={g.faqs} />
          </Section>
        ))}
        <Section tone="ink" tight label="More">
          <p className="eg-body">
            Go deeper: <Link className="eg-link" href="/services/account-engine">how the Account Engine works</Link>,{" "}
            <Link className="eg-link" href="/case-studies/noovis">the Noovis case study</Link> or{" "}
            <Link className="eg-link" href="/blog/sales-trigger-events-b2b">buying signals explained</Link>.
          </p>
        </Section>
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
