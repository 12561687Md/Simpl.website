import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../../lib/og";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import PortalMock from "../../components/engine/PortalMock";
import PricingCards from "../../components/engine/PricingCards";
import { Section, Eyebrow, QA, Ctas, FaqList, FinalCta, Crumbs, Soon } from "../../components/engine/ui";
import { INDUSTRIES } from "../../lib/site";
import { breadcrumb, faqPage, service, engineOffers, ldJson } from "../../lib/schema";

const PATH = "/services/account-engine";
const TITLE = "Account Engine: Trigger-Based Prospecting From the Public Record | Simpl";
const DESCRIPTION =
  "Your own growth portal that reads inspections, permits, licenses, ownership changes and bids for every account in your market each night, and tells your team who to call, why now and who signs.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: `https://www.simpl.pro${PATH}` },
  alternates: { canonical: `https://www.simpl.pro${PATH}` },
};

const SIGNALS = [
  { h: "Inspections and citations", b: "State licensing surveys and federal inspection reports. A citation on a call system, life safety or emergency power is a reason to call with a fix.", src: "State agencies, CMS" },
  { h: "Building permits", b: "New construction, renovations and tenant improvements, filtered by permit type and value, before the low-voltage and systems work is bid.", src: "City and county permit records" },
  { h: "Ownership changes", b: "Deeds, change-of-ownership filings and new operators. New owners re-bid vendors, standardize systems and fix what the last owner deferred.", src: "Deed records, licensing filings" },
  { h: "New licenses and openings", b: "A newly licensed facility or a new location needs everything at once, and the decision gets made before the doors open.", src: "Licensing agencies, NPI registry" },
  { h: "Bids and budget cycles", b: "Public requests for bids and the months budgets get set, so you're in the room before the spec is written.", src: "SAM.gov, state portals, E-Rate" },
  { h: "Your own reasons", b: "On Pro, we add data sources built around how you sell: equipment age, competitor installs, contract expirations, whatever predicts your wins.", src: "Custom" },
];

const FAQS = [
  {
    q: "What is trigger-based prospecting?",
    a: "Trigger-based prospecting means calling an account because something just changed that makes your product relevant: a citation, a permit, a new owner, a bid. It replaces cold lists with timed reasons. The Account Engine does it for every account in your market, every night, and links each trigger to its public record.",
  },
  {
    q: "What does a 'reason to call' look like in the portal?",
    a: "One plain sentence and a link. For example: 'State inspection cited the resident call system on August 12; re-inspection due within 60 days', linked to the inspection report, with the administrator and facilities director listed as the people who decide.",
  },
  {
    q: "How is the score calculated?",
    a: "Each account is scored on how recent and how strong its reasons are, how well it fits the accounts you win, and its size. Every point in the score is shown with its source, so your team can see why an account is ranked where it is.",
  },
  {
    q: "Can it work with our CRM?",
    a: "Yes. Lists export any time, and on Account Engine Pro every account worth a call flows into your CRM (ours, or the one you already use, such as Salesforce or HubSpot) with the follow-up sequence attached.",
  },
  {
    q: "How do you find the decision maker?",
    a: "From public sources: licensing filings, company websites, state registrations and professional listings. We look for the person in each seat that matters for your sale (owner, finance, facilities, operations) and keep only the people we can confirm.",
  },
  {
    q: "What if our market is small?",
    a: "A small market makes the engine more useful, not less: when there are only a few hundred accounts that could buy, knowing which ten have a reason this month is the whole game. We confirm the fit with your top 25 before you pay anything.",
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
            service({
              name: "Account Engine",
              path: PATH,
              serviceType: "Trigger-based B2B prospecting and sales intelligence portal",
              description: DESCRIPTION,
              audience: "High-ticket B2B companies selling to buildings, facilities and regulated businesses",
              offers: engineOffers(),
            }),
            breadcrumb([
              { name: "Services", path: "/services" },
              { name: "Account Engine", path: PATH },
            ]),
            faqPage(FAQS)
          )}
        />

        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Services", path: "/services" }, { name: "Account Engine", path: PATH }]} />
            <div className="eg-hero-grid">
              <ScrollReveal>
                <Eyebrow>Account Engine / Growth portal</Eyebrow>
                <h1 className="eg-h1">
                  Your best rep&apos;s research, <span className="dim">done for every account in your market, every night.</span>
                </h1>
                <p className="eg-lead">
                  The Account Engine is a private portal that reads the public record for your whole territory, scores who is worth a call right now, and
                  shows your team the reason, the proof and who signs the check.
                </p>
                <Ctas secondary={{ label: "See pricing", href: "/pricing" }} />
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}>
                <PortalMock />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Section band>
          <QA
            eyebrow="What it is"
            q="What is the Account Engine, in plain terms?"
            a="It's your own growth portal: a private website at yourcompany.simpl.pro, with your logo and your team's logins, that turns the public paper trail your buyers leave behind into a ranked call list with proof."
          />
          <div className="eg-g3">
            {[
              { h: "A portal built for your business", b: "Your brand, your colors, your address. Not a shared software tool, and nobody else's accounts in it." },
              { h: "A growth engine underneath", b: "Every account in your market scored nightly from inspections, permits, licenses, new owners and budget cycles." },
              { h: "A daily game plan on top", b: "Today's best calls, what changed overnight, follow-ups due and who is setting budgets now." },
            ].map((c) => (
              <div key={c.h} className="eg-card">
                <h3 className="eg-h3">{c.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="signals">
          <QA
            eyebrow="Reasons to call"
            q="Which buying signals does it track?"
            a="The ones your buyers can't hide: anything an official body records when an account changes. We pick the three to five that predict your sales on the first call, then add more as we learn what wins."
          />
          <div className="eg-g3">
            {SIGNALS.map((s) => (
              <div key={s.h} className="eg-card">
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
                <div className="mono" style={{ marginTop: 14, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>Source: {s.src}</div>
              </div>
            ))}
          </div>
          <p className="eg-body" style={{ marginTop: 24, maxWidth: 820 }}>
            The sources are public and official, for example{" "}
            <a className="eg-link" href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer">CMS Care Compare</a>,{" "}
            <a className="eg-link" href="https://npiregistry.cms.hhs.gov/" target="_blank" rel="noopener noreferrer">the NPI registry</a>,{" "}
            <a className="eg-link" href="https://www.usac.org/e-rate/" target="_blank" rel="noopener noreferrer">USAC E-Rate</a> and{" "}
            <a className="eg-link" href="https://sam.gov/" target="_blank" rel="noopener noreferrer">SAM.gov</a>, plus the state and county records for your territory.
            Read more in <Link className="eg-link" href="/blog/sales-trigger-events-b2b">our guide to sales trigger events</Link>.
          </p>
        </Section>

        <Section band id="how-it-works">
          <QA
            eyebrow="How it works"
            q="What happens after we say yes?"
            a="Four steps, and you see real accounts in the first one."
          />
          <div className="eg-g4">
            {[
              { h: "Your top 25", b: "Before you pay anything, we build a 25-account sample of your market and walk you through it." },
              { h: "Setup", b: "We research your territory, define your reasons to call with you, brand your portal and connect your team." },
              { h: "Training", b: "A working session with your reps on their own accounts, so the first week is calls, not clicking around." },
              { h: "Every night after", b: "The record refreshes, the ranking updates, new reasons appear, and the portal keeps getting better." },
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
              <Eyebrow>Inside the portal</Eyebrow>
              <h2 className="eg-h2">Everything your team needs to work an account.</h2>
              <p className="eg-answer">One place for the reason, the record, the decision maker, the notes and the next step.</p>
            </div>
            <ul className="eg-list">
              <li><span><b>Call list</b> ranked every morning, filterable by market, state and reason</span></li>
              <li><span><b>Account pages</b> with every reason, the record behind it and a printable brief</span></li>
              <li><span><b>Who decides,</b> by seat, found on demand and confirmed</span></li>
              <li><span><b>Saved lists, pipeline, notes and outcomes</b> for the whole team</span></li>
              <li><span><b>Exports</b> to spreadsheet or your CRM, any time</span></li>
              <li><span><b>A manager&apos;s view</b> of what the team is working on</span></li>
              <li><span><b>What&apos;s new,</b> a log of every improvement we ship to your portal</span></li>
              <li><span><b>Ask your engine</b> in plain English<Soon /></span></li>
            </ul>
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Who it's for" q="Which companies is the Account Engine built for?" a="Companies that sell high-ticket products, long-lasting services or big contracts to accounts that leave a public paper trail." />
          <div className="eg-chips">
            {INDUSTRIES.map((i) => (
              <Link key={i.href} href={i.href} className="eg-chip">{i.label} <span aria-hidden="true">&rarr;</span></Link>
            ))}
          </div>
        </Section>

        <Section id="pricing">
          <QA eyebrow="Pricing" q="What does the Account Engine cost?" a="$10,000 setup and $1,000 a month, or $15,000 setup and $2,500 a month for Pro with the full stack." />
          <PricingCards />
        </Section>

        <Section band>
          <QA eyebrow="Questions" q="Account Engine FAQ" />
          <FaqList faqs={FAQS} />
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
