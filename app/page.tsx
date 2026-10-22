import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "./lib/og";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpaceField from "./components/SpaceField";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./components/ScrollReveal";
import PortalMock from "./components/engine/PortalMock";
import PricingCards from "./components/engine/PricingCards";
import { Section, Eyebrow, QA, Ctas, FaqList, FinalCta, Soon } from "./components/engine/ui";
import { GROWTH_SERVICES, EASY_WINS, INDUSTRIES } from "./lib/site";
import { faqPage, service, engineOffers, ldJson } from "./lib/schema";

const TITLE = "Simpl | Know Who to Call This Week: The B2B Account Engine";
const DESCRIPTION =
  "Simpl builds high-ticket B2B companies their own growth portal: every account in your market scored nightly from the public record, with the reason to call, the proof and who signs. Plus CRM, follow-up and a 24/7 AI receptionist.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro" },
  alternates: { canonical: "https://www.simpl.pro" },
};

const STEPS = [
  {
    h: "Map your market and your reasons to call",
    b: "On one call we define your territory, the kinds of accounts you sell to, and the three to five public signals that mean an account needs you now.",
  },
  {
    h: "We read the public record every night",
    b: "Inspections and citations, permits, licenses, ownership changes, bids and budget cycles, pulled from the official sources for every account in your market.",
  },
  {
    h: "Your portal ranks today's best calls",
    b: "Each account gets a score, the reason it's worth a call now, a link to the record that proves it, and the person who decides.",
  },
  {
    h: "Your team calls, and nothing slips",
    b: "Notes, lists, pipeline and follow-ups live in the same place. On Pro, every good account flows into your CRM with the follow-up sequence already running.",
  },
];

const INSIDE = [
  { b: "A portal that's yours.", t: "Your logo, your colors, your own address (yourcompany.simpl.pro) and your team's logins. Not a shared tool with your competitors in it." },
  { b: "Your whole market, scored nightly.", t: "Every account in your territory, re-ranked each morning as the public record changes." },
  { b: "A daily game plan.", t: "Today's best calls, what changed overnight, follow-ups due, inspections coming up, who is setting budgets now." },
  { b: "Who decides, by seat.", t: "Owner, finance, facilities, operations. Found from public sources on demand, and we keep only people we can confirm." },
  { b: "Proof on every line.", t: "Every reason links to the official record behind it, so your rep walks in knowing more about the account than the account does." },
  { b: "Ask your engine.", t: "\"Who should I call in Baltimore this week, and why?\" A plain-English assistant inside your portal.", soon: true },
];

const FAQS = [
  {
    q: "What is the Simpl Account Engine?",
    a: "The Account Engine is a private portal built for your company that reads the public record for every account in your market every night (inspections, citations, permits, licenses, ownership changes, bids and budget cycles), scores who is worth a call right now, and shows your team the reason, the official record behind it and the person who decides.",
  },
  {
    q: "Who is it for?",
    a: "B2B companies that sell high-ticket products, long-lasting services or big contracts to buildings, facilities and regulated businesses: low voltage and security integrators, telecom, senior living technology, building systems like fire protection and HVAC, facility services, healthcare technology, and manufacturers and distributors that sell into those markets. If one new account is worth $50,000 or more to you, it is built for you.",
  },
  {
    q: "How is this different from ZoomInfo or Apollo?",
    a: "Contact databases give you names. The Account Engine gives you the reason to call this week and proves it with the public record. Keep your data tools if you like them: the engine feeds your CRM and tells your team which of those names to call first.",
  },
  {
    q: "How much does it cost?",
    a: "The Account Engine is $10,000 to set up and $1,000 a month. Account Engine Pro is $15,000 to set up and $2,500 a month and adds nationwide territory, custom data sources, overnight research, CRM and follow-up, and a 24/7 answering and support line. You see your own top 25 accounts before you pay anything.",
  },
  {
    q: "How long does setup take?",
    a: "Your 25-account sample comes first, usually within a few days of the first call. The full portal, with your territory researched, your reasons to call defined and your team trained, follows as part of setup. We give you the date on the call.",
  },
  {
    q: "Where does the data come from?",
    a: "Public, official sources: state and federal inspection reports, licensing agencies, building permit and deed records, bid and procurement postings, and company filings. Every fact in your portal links to the record it came from, so nothing has to be taken on trust.",
  },
  {
    q: "Do we own it?",
    a: "Yes. Your portal, your lists and your data are yours, and you can export them any time. You work directly with the person who builds it, not an account manager.",
  },
  {
    q: "Do you still do websites, SEO and Google Business Profiles?",
    a: "Yes. Websites, SEO and AI search visibility, Google Business Profile management and paid ads are all still available, as add-ons or on their own. Local businesses can start with the free website and presence scan on the Free tools page.",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <SpaceField />
      <main style={{ position: "relative", zIndex: 1 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            service({
              name: "Account Engine",
              path: "/services/account-engine",
              serviceType: "B2B sales intelligence and prospecting portal",
              description: DESCRIPTION,
              audience: "High-ticket B2B companies selling to buildings, facilities and regulated businesses",
              offers: engineOffers(),
            }),
            faqPage(FAQS)
          )}
        />

        {/* 1. Hero: outcome first, the product second. */}
        <section className="eg-hero">
          <div className="eg-wrap eg-hero-grid">
            <ScrollReveal>
              <Eyebrow>The Account Engine for high-ticket B2B</Eyebrow>
              <h1 className="eg-h1">
                Know exactly who to call this week, <span className="dim">and why they&apos;ll buy.</span>
              </h1>
              <p className="eg-lead">
                Simpl builds your own growth portal. Every account in your market, scored every night from the public record, with the reason to
                call, the proof and the person who signs. Your team opens it in the morning and knows what to do.
              </p>
              <Ctas secondary={{ label: "How it works", href: "#how-it-works" }} />
              <p className="mono" style={{ marginTop: 22, fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>
                See your own top 25 accounts before you pay anything.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <PortalMock />
            </ScrollReveal>
          </div>
        </section>

        {/* 2. Who it's for: industry chips double as internal links. */}
        <section style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "rgba(19,21,23,0.8)" }}>
          <div className="eg-wrap" style={{ padding: "34px 32px", display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", maxWidth: 300 }}>
              Built for teams that sell to buildings, facilities and regulated businesses
            </div>
            <div className="eg-chips">
              {INDUSTRIES.map((i) => (
                <Link key={i.href} href={i.href} className="eg-chip">{i.label}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The problem, question-led. */}
        <Section>
          <div className="eg-split">
            <ScrollReveal>
              <Eyebrow>The Monday problem</Eyebrow>
              <h2 className="eg-h2">How does your team decide who to call on Monday?</h2>
              <p className="eg-answer">
                For most B2B teams, the honest answer is a guess, or one person spending half the week on research that dies in a spreadsheet.
                Meanwhile the accounts that need you most are telling the public record exactly that.
              </p>
              <p className="eg-body" style={{ marginTop: 18 }}>
                An inspector cites a call system. A building sells and the new owner re-bids every contract. A school district posts a request for
                bids. Each one is a reason to call, sitting in a government database your competitors aren&apos;t reading.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.08}>
              <div className="eg-g2">
                <div className="eg-card">
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Without it</div>
                  <ul className="eg-list x">
                    <li><span>Reps pick accounts from memory or a stale list</span></li>
                    <li><span>Research scattered across twenty tabs</span></li>
                    <li><span>&quot;Just checking in&quot; calls with no reason</span></li>
                    <li><span>Nobody sure who followed up</span></li>
                  </ul>
                </div>
                <div className="eg-card" style={{ borderColor: "var(--accent-line)" }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>With the engine</div>
                  <ul className="eg-list">
                    <li><span><b>Today&apos;s best calls,</b> ranked every morning</span></li>
                    <li><span><b>The reason and the record</b> on every account</span></li>
                    <li><span><b>Who decides,</b> confirmed</span></li>
                    <li><span><b>Follow-ups due,</b> in one place</span></li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* 4. How it works. */}
        <Section band id="how-it-works">
          <QA
            eyebrow="How it works"
            q="How does the Account Engine find buyers?"
            a="It reads the official public record for every account in your territory each night, matches what changed against the reasons your customers buy, and ranks the accounts with the strongest reason to hear from you this week."
          />
          <StaggerReveal className="eg-g4">
            {STEPS.map((s, i) => (
              <StaggerItem key={s.h}>
                <div className="eg-card">
                  <span className="eg-num">0{i + 1}</span>
                  <h3 className="eg-h3">{s.h}</h3>
                  <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <p style={{ marginTop: 30 }}>
            <Link href="/services/account-engine" className="eg-link">The full Account Engine walkthrough &rarr;</Link>
          </p>
        </Section>

        {/* 5. What's inside. */}
        <Section>
          <QA
            eyebrow="Inside your portal"
            q="What does your team see when they log in?"
            a="A ranked list of today's best calls, and behind every account the reason, the record and the decision maker. Lists, pipeline, notes and exports for the whole team sit in the same place."
          />
          <div className="eg-g3">
            {INSIDE.map((f) => (
              <div key={f.b} className="eg-card">
                <h3 className="eg-h3">{f.b}{f.soon && <Soon />}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{f.t}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Proof (anonymized until clients approve names). */}
        <Section band id="proof">
          <QA
            eyebrow="Running today"
            q="Is anyone using it?"
            a="Yes. Two portals run on the engine today, both for companies that sell technology into senior living and the buildings around it. We'll name them when they say we can; on a call we'll show you the engine working on your own market instead."
          />
          <div className="eg-g2">
            <div className="eg-card">
              <div className="eg-stat">16,000<small>+ accounts</small></div>
              <h3 className="eg-h3" style={{ marginTop: 18 }}>Network infrastructure integrator</h3>
              <p className="eg-body" style={{ fontSize: 15 }}>
                Senior living, healthcare and commercial buildings across its states, scored on inspections, permits, licenses and ownership. The sales
                team uses it to plan calls each week.
              </p>
            </div>
            <div className="eg-card">
              <div className="eg-stat">14,600<small>+ communities</small></div>
              <h3 className="eg-h3" style={{ marginTop: 18 }}>Senior living technology company</h3>
              <p className="eg-body" style={{ fontSize: 15 }}>
                A nationwide portal with assisted living licensing from 42 states, rolled up from each community to the operator that actually buys.
              </p>
            </div>
          </div>
        </Section>

        {/* 7. The full stack. */}
        <Section>
          <QA
            eyebrow="The growth stack"
            q="What else can Simpl build around the engine?"
            a="The engine finds the accounts. The rest of the stack makes sure every one gets followed up and every call gets answered. The easy wins (websites, SEO, Google Business Profile and ads) are there when you want them."
          />
          <div className="eg-g3">
            {GROWTH_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-card link">
                <h3 className="eg-h3">{s.label}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.desc}.</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginRight: 6 }}>Also handled</span>
            {EASY_WINS.map((s) => (
              <Link key={s.href} href={s.href} className="eg-chip">{s.label}</Link>
            ))}
          </div>
        </Section>

        {/* 8. Value math. */}
        <Section band>
          <QA
            eyebrow="The math"
            q="What would this cost you any other way?"
            a="A research hire covers one market and leaves with the knowledge. Data tools sell you names without reasons. An agency rents you a campaign you never own. The Account Engine is yours, covers your whole market and works every night."
          />
          <div className="eg-table-wrap">
            <table className="eg-table">
              <thead>
                <tr><th>What you&apos;d use instead</th><th>What it costs</th><th>What you still don&apos;t get</th></tr>
              </thead>
              <tbody>
                <tr><td>A research or business development hire</td><td>$60,000 to $90,000 a year</td><td>One person, one market, gone when they leave</td></tr>
                <tr><td>Data tools (contact databases)</td><td>$15,000 to $40,000 a year</td><td>Contact lists, not reasons to call, and no public-record triggers</td></tr>
                <tr><td>An outbound agency</td><td>$3,000 to $10,000 a month</td><td>Generic campaigns, not your market, and you own none of it</td></tr>
                <tr className="us"><td><b>The Account Engine</b></td><td>$10,000 setup + $1,000 a month</td><td>Your own portal, your whole market, every reason with proof, every night</td></tr>
              </tbody>
            </table>
          </div>
          <p className="eg-body" style={{ marginTop: 22, maxWidth: 760 }}>
            The only number that matters is yours: what is one new client worth to you in year one? For most of the companies we build for, one
            deal covers the engine for years.
          </p>
        </Section>

        {/* 9. Pricing. */}
        <Section id="pricing">
          <QA eyebrow="Pricing" q="Two ways to run it." a="Start with the engine, or run the whole stack. Both start with your own top 25, free." />
          <PricingCards />
          <p style={{ marginTop: 18 }}>
            <Link href="/pricing" className="eg-link">Full pricing and add-ons &rarr;</Link>
          </p>
        </Section>

        {/* 10. FAQ. */}
        <Section band>
          <QA eyebrow="Questions" q="Straight answers." />
          <FaqList faqs={FAQS} />
          <p style={{ marginTop: 26 }}>
            <Link href="/faq" className="eg-link">Every question we get &rarr;</Link>
          </p>
        </Section>

        {/* 11. Final CTA + the free tools band for local businesses. */}
        <FinalCta />
        <section style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="eg-wrap" style={{ padding: "38px 32px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <p className="eg-body" style={{ margin: 0 }}>
              <b style={{ color: "var(--fg)" }}>Selling to local customers?</b> Run the free website and presence scan and see what&apos;s holding your site back.
            </p>
            <Link href="/free-tools" className="eg-btn ghost">Try the free tools</Link>
          </div>
        </section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
