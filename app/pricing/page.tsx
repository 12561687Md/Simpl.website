import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingCards from "../components/engine/PricingCards";
import { Section, Eyebrow, QA, FaqList, FinalCta, Crumbs } from "../components/engine/ui";
import { breadcrumb, faqPage, service, engineOffers, ldJson } from "../lib/schema";

const TITLE = "Account Engine Pricing: $10,000 Setup + $1,000/mo | Simpl";
const DESCRIPTION =
  "Account Engine: $10,000 setup and $1,000 a month. Account Engine Pro: $15,000 setup and $2,500 a month with nationwide territory, CRM and follow-up, and a 24/7 support line. See your top 25 accounts first, free.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/pricing" },
  alternates: { canonical: "https://www.simpl.pro/pricing" },
};

const FAQS = [
  {
    q: "How much does the Account Engine cost?",
    a: "The Account Engine is a one-time $10,000 setup and $1,000 a month. Account Engine Pro is a one-time $15,000 setup and $2,500 a month. Setup covers researching your market, defining your reasons to call, building and branding your portal, and training your team.",
  },
  {
    q: "What's the difference between Account Engine and Pro?",
    a: "Account Engine covers your market with the core portal: nightly scoring, the daily game plan, decision makers, proof on every fact, and team lists and exports. Pro adds any territory up to nationwide, custom reasons to call from new data sources, overnight research on your top accounts, CRM and follow-up, a 24/7 answering and support line, Ask your engine, and a monthly strategy call.",
  },
  {
    q: "Why does the setup cost what it does?",
    a: "Because it's a build, not a login. We research your territory and data sources, define your reasons to call with you, and build a portal that's yours. Setup is priced within the range by territory size and how many data sources your market needs.",
  },
  {
    q: "Is there a contract?",
    a: "Terms are agreed on the call before anything starts, with nothing hidden. You own your portal, your lists and your data either way.",
  },
  {
    q: "Why is it less than an agency or a research hire?",
    a: "You're not paying for an account manager, a sales team or an office. You work directly with the person who builds it.",
  },
  {
    q: "What do websites, SEO, Google Business Profile and ads cost?",
    a: "They're scoped on a short call and priced as add-ons to the engine or on their own, based on what your site and market actually need. The free website and presence scan shows where you stand first.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            service({
              name: "Account Engine",
              path: "/pricing",
              serviceType: "Trigger-based B2B prospecting and sales intelligence portal",
              description: DESCRIPTION,
              offers: engineOffers(),
            }),
            breadcrumb([{ name: "Pricing", path: "/pricing" }]),
            faqPage(FAQS)
          )}
        />
        <section className="eg-hero" style={{ paddingBottom: 56 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Pricing", path: "/pricing" }]} />
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 980 }}>
              Your own growth engine. <span className="dim">Priced like a tool, built like a team.</span>
            </h1>
            <p className="eg-lead">
              Two ways to run it. Both start the same way: your own top 25 accounts, with the reason and the record, before you pay anything.
            </p>
          </div>
        </section>

        <Section tight>
          <PricingCards />
        </Section>

        <Section band>
          <QA
            eyebrow="The math"
            q="Is the Account Engine worth $10,000?"
            a="Ask one question: what is one new client worth to you in year one? If the answer is $50,000 or more, the engine pays for itself with one deal a year. Then compare it to what you'd use instead."
          />
          <div className="eg-table-wrap">
            <table className="eg-table">
              <thead>
                <tr><th>Option</th><th>Typical cost</th><th>What you still don&apos;t get</th></tr>
              </thead>
              <tbody>
                <tr><td>Research or business development hire</td><td>$60,000 to $90,000 a year</td><td>One person, one market, gone when they leave</td></tr>
                <tr><td>Data and contact tools</td><td>$15,000 to $40,000 a year</td><td>Names, not reasons to call, and no public-record triggers</td></tr>
                <tr><td>Outbound agency</td><td>$3,000 to $10,000 a month</td><td>Generic campaigns, and you own none of it</td></tr>
                <tr className="us"><td><b>Account Engine</b></td><td>$10,000 setup + $1,000 a month</td><td>Your portal, your market, proof on every reason, every night</td></tr>
                <tr className="us"><td><b>Account Engine Pro</b></td><td>$15,000 setup + $2,500 a month</td><td>All of it, plus follow-up, the phones and nationwide reach</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <QA eyebrow="Add-ons" q="What can be added to either plan?" a="Each is scoped and priced per client on the call, so you only pay for what your market needs." />
          <div className="eg-g3">
            {[
              { h: "CRM and follow-up", b: "Set up in your CRM or ours, sequences written and run. Included in Pro.", href: "/services/crm-follow-up" },
              { h: "AI receptionist and 24/7 line", b: "Calls and tickets answered any hour from your own guides. Included in Pro.", href: "/services/ai-receptionist" },
              { h: "Websites, SEO, GBP and ads", b: "The easy wins, so the accounts you call find a company that looks the part.", href: "/services" },
            ].map((a) => (
              <Link key={a.h} href={a.href} className="eg-card link">
                <h3 className="eg-h3">{a.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{a.b}</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Questions" q="Pricing FAQ" />
          <FaqList faqs={FAQS} />
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
