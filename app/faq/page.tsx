import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, Eyebrow, FaqList, Crumbs, PrimaryCta } from "../components/engine/ui";
import { breadcrumb, faqPage, ldJson } from "../lib/schema";

export const metadata: Metadata = {
  title: { absolute: "FAQ: the Account Engine, Pricing, CRM, AI Receptionist and Websites | Simpl" },
  description:
    "Straight answers about Simpl: what the Account Engine is, who it's for, where the data comes from, what it costs, CRM and follow-up, the 24/7 AI receptionist, and websites and SEO.",
  alternates: { canonical: "https://www.simpl.pro/faq" },
};

const GROUPS: { label: string; id: string; faqs: { q: string; a: string }[] }[] = [
  {
    label: "The Account Engine",
    id: "account-engine",
    faqs: [
      {
        q: "What does Simpl do?",
        a: "Simpl builds custom growth portals for high-ticket B2B companies. The Account Engine finds the right buyers at the right time from the public record, with proof, and tells your team who to call this week. We also set up CRM and follow-up, build 24/7 AI receptionist and support lines, and handle websites, SEO, Google Business Profile and ads.",
      },
      {
        q: "What is the Account Engine?",
        a: "A private portal built for your company that reads the public record for every account in your market every night (inspections, citations, permits, licenses, ownership changes, bids and budget cycles), scores who is worth a call right now, and shows the reason, the official record behind it and the person who decides.",
      },
      {
        q: "Who is it for?",
        a: "B2B companies that sell high-ticket products, long-lasting services or big contracts to buildings, facilities and regulated businesses: low voltage and security integrators, telecom, senior living technology, building systems, facility services, healthcare technology, and manufacturers and distributors selling into those markets.",
      },
      {
        q: "Where does the data come from?",
        a: "Public, official sources: state and federal inspection reports, licensing agencies, building permit and deed records, public bids and procurement postings, the national NPI registry and company filings. Every fact in your portal links to its record.",
      },
      {
        q: "How is it different from ZoomInfo, Apollo or a list vendor?",
        a: "They give you names. The Account Engine gives you the reason to call this week and the proof behind it, ranked across your whole market. It can feed the CRM and tools you already use.",
      },
      {
        q: "Do other companies in my market see my portal?",
        a: "No. Each portal is built for one company, at its own address, with its own logins. Your lists, notes and results are yours.",
      },
      {
        q: "How do I see what it would find for us?",
        a: "Ask for your top 25. We build a 25-account sample of your own market, each with the reason, the record and who decides, and walk you through it before you pay anything.",
      },
    ],
  },
  {
    label: "Pricing and terms",
    id: "pricing",
    faqs: [
      {
        q: "How much does it cost?",
        a: "Account Engine: $10,000 setup and $1,000 a month. Account Engine Pro: $15,000 setup and $2,500 a month, adding nationwide territory, custom data sources, overnight research, CRM and follow-up, a 24/7 support line and a monthly strategy call.",
      },
      {
        q: "Why is it less than an agency or a hire?",
        a: "You're not paying for an account manager, a sales team or an office. You work directly with the person who builds it.",
      },
      {
        q: "Who owns the portal and the data?",
        a: "You do. Your portal, your lists and your data are yours, and you can export them any time.",
      },
    ],
  },
  {
    label: "CRM, follow-up and the 24/7 line",
    id: "crm-ai",
    faqs: [
      {
        q: "Do we have to change CRMs?",
        a: "No. We connect to the CRM you already use, such as Salesforce or HubSpot, or set up ours branded as yours.",
      },
      {
        q: "What does the AI receptionist do?",
        a: "It answers calls and support tickets at any hour, checks your own guides and the account's history, solves what it safely can, and pages whoever is on duty for anything urgent with a written summary.",
      },
      {
        q: "Are CRM and the AI receptionist live?",
        a: "Both are rolling out now. We give you the go-live date on the first call, and we never call them done until they are.",
      },
    ],
  },
  {
    label: "Websites, SEO and free tools",
    id: "websites-seo",
    faqs: [
      {
        q: "Do you still build websites and do SEO?",
        a: "Yes. Websites, SEO and AI search visibility, Google Business Profile management and paid ads are available as add-ons or on their own.",
      },
      {
        q: "Is the website scan free?",
        a: "Yes. The scan on the Free tools page takes about 60 seconds, needs no credit card, and scores your site 0 to 100 across six categories with every finding measured from live data.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqPage(all), breadcrumb([{ name: "FAQ", path: "/faq" }]))} />
        <section className="eg-hero" style={{ paddingBottom: 30 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "FAQ", path: "/faq" }]} />
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="eg-h1">
              Straight answers. <span className="dim">No sales-page hedging.</span>
            </h1>
            <div className="eg-chips" style={{ marginTop: 30 }}>
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="eg-chip">{g.label}</a>
              ))}
            </div>
          </div>
        </section>
        {GROUPS.map((g, i) => (
          <Section key={g.id} id={g.id} band={i % 2 === 1} tight>
            <h2 className="eg-h2" style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 22 }}>{g.label}</h2>
            <FaqList faqs={g.faqs} />
          </Section>
        ))}
        <Section tight>
          <p className="eg-body" style={{ marginBottom: 20 }}>
            Still have a question? Email <a className="eg-link" href="mailto:team@simpl.pro">team@simpl.pro</a>, or start with the thing that answers most of
            them: your own market. <Link className="eg-link" href="/services/account-engine">How the engine works</Link>.
          </p>
          <PrimaryCta />
        </Section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
