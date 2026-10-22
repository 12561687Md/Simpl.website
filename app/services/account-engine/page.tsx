import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BrowserFrame, PortalAccount, PortalCallList, MOCK_CAPTION } from "../../components/portal/Portal";
import { Section, Eyebrow, QA, Hero, FaqList, FinalCta, Steps, Soon, Related } from "../../components/engine/ui";
import { INDUSTRIES, CASE_STUDY } from "../../lib/site";
import { faqPage, service, webPage, ldJson, pageMeta } from "../../lib/schema";

/* Primary keyword: "sales prospecting" (720/mo, KD 23).
   Secondary: sales intelligence tools, sales prospecting tools, account-based prospecting. */
const PATH = "/services/account-engine";
const TITLE = "Sales Prospecting From Public Records | Account Engine";
const DESCRIPTION =
  "The Account Engine does your sales prospecting every night: it reads inspections, permits, licenses and new owners and ranks who to call, with proof.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const SIGNALS = [
  { h: "Inspections and citations", b: "State licensing surveys and federal inspection reports. A citation on a call system, life safety or emergency power is a reason to call with a fix.", src: "State agencies, CMS" },
  { h: "Building permits", b: "New construction, renovations and tenant improvements, filtered by permit type and value, before the systems work is bid.", src: "City and county permit records" },
  { h: "Ownership changes", b: "Deeds, change-of-ownership filings and new operators. New owners re-bid vendors, standardize systems and fix what the last owner deferred.", src: "Deed records, licensing filings" },
  { h: "New licenses and openings", b: "A newly licensed facility or a new location needs everything at once, and the decision gets made before the doors open.", src: "Licensing agencies, NPI registry" },
  { h: "Bids and budget cycles", b: "Public requests for bids and the months budgets get set, so you are in the room before the spec is written.", src: "SAM.gov, state portals, USAC E-Rate" },
  { h: "Your own reasons", b: "Data sources built around how you sell: equipment age, competitor installs, contract expirations, whatever predicts your wins.", src: "Custom, scoped with you" },
];

const FAQS = [
  {
    q: "What is sales prospecting, and what does the Account Engine do differently?",
    a: "Sales prospecting is finding and qualifying the accounts worth contacting. Most teams do it by hand from lists. The Account Engine does it for every account in your market every night: it reads the public record, finds the accounts with a timely reason to buy, and links each reason to its source so your rep can call with something true to say.",
  },
  {
    q: "Is the Account Engine a sales intelligence tool?",
    a: "It does the job sales intelligence tools promise, but it is built for one company. Instead of a shared database with millions of contacts, you get a private portal for your market with the reasons to call that matter for what you sell, and every fact proved by its record.",
  },
  {
    q: "What does a reason to call look like in the portal?",
    a: "One plain sentence and a link. For example: 'State inspection cited the resident call system on August 12; re-inspection due within 60 days', linked to the inspection report, with the administrator and facilities director listed as the people who decide.",
  },
  {
    q: "How is the score calculated?",
    a: "Each account is scored on how recent and how strong its reasons are, how well it fits the accounts you win, and its size. Every point in the score is shown with its source, so your team can see why an account is ranked where it is.",
  },
  {
    q: "How do you find the decision maker?",
    a: "From public sources: licensing filings, company websites, state registrations and professional listings. We look for the person in each seat that matters for your sale (owner, finance, facilities, operations) and keep only the people we can confirm.",
  },
  {
    q: "How is the Account Engine priced?",
    a: "A one-time setup and a monthly fee, scoped to your territory, the data sources you need and any add-ons such as CRM follow-up. You get the exact number in writing after a 30-minute call, and you see a sample of your top prospects before you pay anything.",
  },
  {
    q: "What if our market is small?",
    a: "A small market makes the engine more useful, not less: when only a few hundred accounts could buy, knowing which ten have a reason this month is the whole game. We confirm the fit with your sample before you commit.",
  },
];

export default function AccountEnginePage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
            service({
              name: "Account Engine",
              path: PATH,
              serviceType: "Sales prospecting and sales intelligence portal",
              description: DESCRIPTION,
              audience: "B2B companies selling to buildings, facilities and regulated businesses",
            }),
            faqPage(FAQS)
          )}
        />

        <Hero
          crumbs={[{ name: "Services", path: "/services" }, { name: "Account Engine", path: PATH }]}
          eyebrow="The Account Engine"
          h1={<>Sales prospecting, done for <em>every account</em> in your market, every night.</>}
          sub="Your best rep's research, without the research."
          lead="The Account Engine is a private portal built for your company. It reads the public record for your whole territory, scores who is worth a call right now, and shows your team the reason, the source and who signs."
          visual={
            <BrowserFrame label="Sample account page: score, why now with source links, record over time and the decision makers" caption={MOCK_CAPTION}>
              <PortalAccount />
            </BrowserFrame>
          }
        />

        <Section tone="paper" label="What it is">
          <QA
            eyebrow="What it is"
            q="What is the Account Engine, in plain terms?"
            a="Your own sales prospecting portal: a private website under your company's name with your team's logins, that turns the public paper trail your buyers leave behind into a ranked call list with proof."
          />
          <div className="eg-g3">
            {[
              { h: "A portal built for your business", b: "Your brand, your address, your logins. Not a shared software tool, and nobody else's accounts in it." },
              { h: "An engine underneath", b: "Every account in your market scored nightly from inspections, permits, licenses, new owners and budget cycles." },
              { h: "A daily game plan on top", b: "Today's best calls, what changed overnight, follow-ups due and who is setting budgets now." },
            ].map((c) => (
              <div key={c.h} className="eg-card">
                <h3 className="eg-h3">{c.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="ink" id="signals" label="Buying signals">
          <QA
            eyebrow="Reasons to call"
            q={<>Which <em>buying signals</em> does it track?</>}
            a="The ones your buyers can't hide: anything an official body records when an account changes. We pick the three to five that predict your sales on the first call, then add more as we learn what wins."
          />
          <div className="eg-g3">
            {SIGNALS.map((s) => (
              <div key={s.h} className="eg-card">
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
                <div className="eg-src">Source: {s.src}</div>
              </div>
            ))}
          </div>
          <p className="eg-body" style={{ marginTop: 26, maxWidth: 840 }}>
            The sources are public and official, for example{" "}
            <a className="eg-link" href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer">CMS Care Compare</a>,{" "}
            <a className="eg-link" href="https://npiregistry.cms.hhs.gov/" target="_blank" rel="noopener noreferrer">the NPI registry</a>,{" "}
            <a className="eg-link" href="https://www.usac.org/e-rate/" target="_blank" rel="noopener noreferrer">USAC E-Rate</a> and{" "}
            <a className="eg-link" href="https://sam.gov/" target="_blank" rel="noopener noreferrer">SAM.gov</a>, plus the state and county records for your territory.
            More in <Link className="eg-link" href="/blog/sales-trigger-events-b2b">our guide to buying signals and sales trigger events</Link>.
          </p>
        </Section>

        <Section tone="deep" id="how-it-works" label="How it works">
          <QA eyebrow="How it works" q="What happens after you say yes?" a="Four steps, and you see real accounts in the first one." />
          <Steps
            steps={[
              { h: <>Your <em>top prospects</em></>, b: "Before you pay anything, we build a sample of your market and walk you through it." },
              { h: <>Setup</>, b: "We research your territory, define your reasons to call with you, brand your portal and connect your team." },
              { h: <>Training</>, b: "A working session with your reps on their own accounts, so the first week is calls, not clicking around." },
              { h: <>Every night <em>after</em></>, b: "The record refreshes, the ranking updates, new reasons appear, and we keep improving the portal." },
            ]}
          />
        </Section>

        <Section tone="paper" label="Inside the portal">
          <div className="eg-split center">
            <div>
              <Eyebrow>Inside the portal</Eyebrow>
              <h2 className="eg-h2">Everything your team needs to work an account.</h2>
              <p className="eg-answer">One place for the reason, the record, the decision maker, the notes and the next step.</p>
              <ul className="eg-list" style={{ marginTop: 28 }}>
                <li><span><b>Call list</b> ranked every morning, filterable by market, state and reason</span></li>
                <li><span><b>Account pages</b> with every reason, its record and a printable brief</span></li>
                <li><span><b>Who decides,</b> by seat, found on demand and confirmed</span></li>
                <li><span><b>Lists, pipeline, notes and outcomes</b> for the whole team</span></li>
                <li><span><b>Exports</b> to a spreadsheet or your CRM, any time</span></li>
                <li><span><b>Ask your engine</b> in plain English<Soon /></span></li>
              </ul>
            </div>
            <BrowserFrame label="Sample call list: accounts ranked by score with the reason, the source, who decides and when" caption={MOCK_CAPTION}>
              <PortalCallList />
            </BrowserFrame>
          </div>
        </Section>

        <Section tone="mist" label="Who it is for and proof">
          <div className="eg-split">
            <div>
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 className="eg-h2">Built for teams that sell to buildings and facilities.</h2>
              <p className="eg-answer">Companies that sell high-value products, long-term services or big contracts to accounts that leave a public paper trail.</p>
              <div className="eg-chips" style={{ marginTop: 26 }}>
                {INDUSTRIES.map((i) => (
                  <Link key={i.href} href={i.href} className="eg-chip">{i.label} <span aria-hidden="true">&rarr;</span></Link>
                ))}
              </div>
            </div>
            <div className="eg-card feature">
              <span className="mono-label" style={{ display: "block", marginBottom: 14 }}>Running today</span>
              <h3 className="eg-h3" style={{ fontSize: 22 }}>Noovis, a network and smart-building integrator</h3>
              <p className="eg-body">Noovis uses its Account Engine to see which senior living communities, apartment buildings and commercial properties across six states have a reason to hear from it now.</p>
              <p style={{ marginTop: 18 }}><Link href={CASE_STUDY.href} className="eg-link">Read the case study &rarr;</Link></p>
            </div>
          </div>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q="Account Engine FAQ" />
          <FaqList faqs={FAQS} />
        </Section>

        <Related
          heading="Related"
          links={[
            { href: "/services/crm-follow-up", label: "CRM implementation and follow-up", desc: "Every account worth a call, followed up until it answers." },
            { href: "/industries/low-voltage-security", label: "Lead generation for low voltage contractors", desc: "Permits, E-Rate bids and new owners, by building." },
            { href: "/blog/how-to-find-the-decision-maker", label: "How to find the decision maker", desc: "Map the seats that sign, and confirm the people in them." },
          ]}
        />

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
