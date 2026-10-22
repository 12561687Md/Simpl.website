import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserFrame, PortalHome, PortalCallList, PortalAccount, MOCK_CAPTION } from "./components/portal/Portal";
import { Section, QA, Hero, FaqList, FinalCta, Steps, Versus, Eyebrow, PrimaryCta } from "./components/engine/ui";
import { GROWTH_SERVICES, LOCAL_SERVICES, INDUSTRIES, CASE_STUDY } from "./lib/site";
import { faqPage, service, webPage, ldJson, pageMeta } from "./lib/schema";

/* Primary keyword: "B2B lead generation company" (480/mo, KD 24).
   Secondary: B2B lead generation, buying signals, B2B sales leads. */
const TITLE = "B2B Lead Generation Company | Simpl Account Engine";
const DESCRIPTION =
  "Simpl is a B2B lead generation company. Your Account Engine reads public records nightly and tells your team who to call, why now and who decides.";

export const metadata: Metadata = pageMeta({ path: "/", title: TITLE, description: DESCRIPTION });

const STEPS = [
  {
    h: <>Map your market and your <em>reasons to call</em></>,
    first: "One call, and you see real accounts before you pay anything.",
    b: "We define your territory, the kinds of accounts you sell to, and the three to five public signals that mean an account needs you now.",
    bullets: ["Your territory, by state, county or metro", "The accounts you win, and the ones you don't", "A sample of your top prospects, with the record behind each"],
  },
  {
    h: <>We read the <em>public record</em> every night</>,
    first: "Inspections, permits, licenses, new owners, bids and budget cycles.",
    b: "Pulled from the official sources for every account in your market, then checked, deduplicated and matched to the right company.",
  },
  {
    h: <>Your portal ranks <em>today&apos;s best calls</em></>,
    first: "A score, a reason, a source link and the person who decides.",
    b: "Each account is ranked on how strong and how recent its reason is and how well it fits the accounts you already win. Every point in the score shows its source.",
  },
  {
    h: <>Your team calls, and <em>nothing slips</em></>,
    first: "Lists, pipeline, notes and follow-ups in the same place.",
    b: "Reps open the portal in the morning and know what to do. Good accounts flow into your CRM with the follow-up sequence attached.",
  },
];

const FAQS = [
  {
    q: "What does a B2B lead generation company like Simpl actually do?",
    a: "Simpl builds your sales team its own Account Engine: a private, branded portal that reads the public record for every account in your market every night (inspections, permits, licenses, ownership changes, bids and budget cycles), ranks which accounts are worth a call right now, and shows the reason, the source and the person who decides. Your team does the calling with a reason that is true and timely.",
  },
  {
    q: "Who is the Account Engine for?",
    a: "B2B companies that sell high-value products, long-term services or big contracts to buildings, facilities and regulated businesses: low voltage and security integrators, senior living technology, building systems such as fire protection and HVAC, facility services, and healthcare technology. If one new account is worth a lot to you, it is built for you.",
  },
  {
    q: "What are buying signals, and where do they come from?",
    a: "A buying signal is a recorded event that makes your product relevant to an account right now: an inspection citation, a building permit, a new owner, a new license, a public bid or the start of a budget cycle. The engine reads them from official sources such as state inspection reports, CMS data, county permit and deed records, licensing agencies, USAC E-Rate and SAM.gov, and links every fact to its record.",
  },
  {
    q: "How is this different from ZoomInfo or Apollo?",
    a: "Contact databases give you names. The Account Engine gives you the reason to call this week and proves it with the public record. Keep your data tools if you like them: the engine tells your team which accounts to call first and why.",
  },
  {
    q: "How much does it cost?",
    a: "Every engine is scoped to your territory, your data sources and the add-ons you want: a one-time setup and a monthly fee. You get the exact number in writing after a 30-minute call, and you see your top prospects before you pay anything.",
  },
  {
    q: "Do we own the portal and the data?",
    a: "Your portal runs under your company's name, and your lists, notes and pipeline are yours to export any time. You work directly with the person who builds it, not an account manager.",
  },
  {
    q: "Do you still do local SEO and websites?",
    a: "Yes. Local SEO, website design, Google Business Profile management and PPC management are available for service businesses, on their own or alongside the engine. Local businesses can start with the free website audit.",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: "/", name: TITLE, description: DESCRIPTION }),
            service({
              name: "Account Engine",
              path: "/services/account-engine",
              serviceType: "B2B lead generation and sales prospecting portal",
              description: DESCRIPTION,
              audience: "B2B companies selling to buildings, facilities and regulated businesses",
            }),
            faqPage(FAQS)
          )}
        />

        <Hero
          pills={["Built on public records", "A source link on every fact", "Your own branded portal"]}
          h1={<>B2B lead generation built on <em>buying signals</em> from the public record.</>}
          sub="Know exactly who to call this week, and why they'll buy."
          lead="Simpl is a client acquisition partner for B2B companies. We build your sales team its own Account Engine: a private portal that reads inspections, permits, licenses, ownership changes and bids every night, ranks the accounts worth a call, and shows the reason, the source and who decides."
          visual={
            <BrowserFrame label="Sample Account Engine home screen: the best call right now, today's ranked accounts, overnight changes and follow-ups due" caption={MOCK_CAPTION}>
              <PortalHome />
            </BrowserFrame>
          }
        />

        <Section tone="paper" tight label="Industries we serve">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <p className="mono-label" style={{ margin: 0, maxWidth: 320, lineHeight: 1.6 }}>Built for B2B teams that sell to buildings, facilities and regulated businesses</p>
            <div className="eg-chips">
              {INDUSTRIES.map((i) => (
                <Link key={i.href} href={i.href} className="eg-chip">{i.label}</Link>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="paper" className="same" label="The problem">
          <QA
            eyebrow="The Monday problem"
            q={<>How does your sales team decide <em>who to call</em> on Monday?</>}
            a="For most B2B teams the honest answer is a guess, or one person spending half the week on research that dies in a spreadsheet. Meanwhile the accounts that need you most are telling the public record exactly that: an inspector cites a call system, a building sells, a school district posts a bid."
          />
          <Versus
            without={["Reps pick accounts from memory or a stale list", "Research scattered across twenty browser tabs", "Calls that open with \"just checking in\"", "Nobody sure who followed up, or when"]}
            withUs={[<><b>Today&apos;s best calls,</b> ranked every morning</>, <><b>The reason and the record</b> on every account</>, <><b>Who decides,</b> found and confirmed</>, <><b>Follow-ups due,</b> in one place for the whole team</>]}
          />
        </Section>

        <Section tone="deep" id="how-it-works" label="How it works">
          <QA
            eyebrow="How it works"
            q={<>How the Account Engine finds your <em>next client</em></>}
            a="It reads the official public record for every account in your territory each night, matches what changed against the reasons your customers buy, and ranks the accounts with the strongest reason to hear from you this week."
          />
          <Steps steps={STEPS} />
          <div className="eg-links">
            <Link href="/services/account-engine" className="eg-link">The full Account Engine walkthrough &rarr;</Link>
            <Link href="/blog/sales-trigger-events-b2b" className="eg-link">What counts as a buying signal &rarr;</Link>
          </div>
        </Section>

        <Section tone="paper" label="Inside the portal">
          <div className="eg-split center">
            <div>
              <Eyebrow>Inside the portal</Eyebrow>
              <h2 className="eg-h2">B2B sales leads, ranked, with the reason on every line.</h2>
              <p className="eg-answer">The call list is ranked every morning by how strong and how recent each reason is. Filter by signal, state or market, and open any reason to see the record behind it.</p>
              <ul className="eg-list" style={{ marginTop: 28 }}>
                <li><span><b>A score you can explain,</b> point by point</span></li>
                <li><span><b>Who decides,</b> by seat: owner, finance, facilities, operations</span></li>
                <li><span><b>Exports</b> to a spreadsheet or your CRM, any time</span></li>
              </ul>
            </div>
            <BrowserFrame label="Sample call list: accounts ranked by score with the reason to call, the source record, who decides and when to call" caption={MOCK_CAPTION}>
              <PortalCallList />
            </BrowserFrame>
          </div>
          <div className="eg-split center flip" style={{ marginTop: 96 }}>
            <BrowserFrame label="Sample account page: score, why now with source links, record over time and the decision makers" caption={MOCK_CAPTION}>
              <PortalAccount />
            </BrowserFrame>
            <div>
              <Eyebrow>The account brief</Eyebrow>
              <h2 className="eg-h2">Walk into every call knowing why it matters.</h2>
              <p className="eg-answer">One page per account: why now, the record over time, the people who decide and your team&apos;s notes. Print it, or read it on your phone in the parking lot.</p>
              <div className="eg-ctas"><PrimaryCta /></div>
            </div>
          </div>
        </Section>

        <Section tone="deep" label="Case study">
          <div className="eg-story">
            <div>
              <Eyebrow>Live today</Eyebrow>
              <h2 className="eg-h2">A network integrator&apos;s Account Engine, built from the record.</h2>
              <p className="eg-answer">
                <b>Noovis</b>, a network infrastructure and smart-building integrator in Hanover, Maryland, uses an Account Engine we built for it to plan its calls. The portal reads federal, state and county records across six states and tells the team which senior living communities, apartment buildings and commercial properties have a reason to hear from Noovis now.
              </p>
              <div className="eg-links"><Link href={CASE_STUDY.href} className="eg-link">Read the Noovis case study &rarr;</Link></div>
            </div>
            <div className="eg-facts" style={{ marginTop: 0 }}>
              <div><b>6</b><span>States and districts covered: MD, DE, DC, VA, PA, WV</span></div>
              <div><b>Nightly</b><span>Refresh from federal, state and county sources</span></div>
              <div><b>Every fact</b><span>Linked to the official record it came from</span></div>
            </div>
          </div>
        </Section>

        <Section tone="mist" label="Services">
          <QA
            eyebrow="Two doors"
            q="B2B lead generation services, and local SEO when you need it."
            a="The engine finds the accounts. The rest of the stack makes sure every one gets followed up and every call gets answered. Service businesses that sell locally get local SEO and websites from the same team."
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
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span className="mono-label" style={{ marginRight: 8 }}>For local businesses</span>
            {LOCAL_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-chip">{s.label}</Link>
            ))}
            <Link href="/free-tools" className="eg-chip">Free website audit</Link>
          </div>
        </Section>

        <Section tone="paper" label="Compared with the alternatives">
          <QA
            eyebrow="Compared with the alternatives"
            q="Why not hire a researcher, buy a database or rent an agency?"
            a="Each one solves part of the problem. A researcher covers one market and leaves with the knowledge. A database sells you names without reasons. An agency rents you a campaign you never own. The Account Engine covers your whole market, every night, and it is yours."
          />
          <div className="eg-table-wrap">
            <table className="eg-table">
              <thead>
                <tr><th>What you&apos;d use instead</th><th>What you get</th><th>What you still don&apos;t get</th></tr>
              </thead>
              <tbody>
                <tr><td data-label="Instead">A research or business development hire</td><td data-label="What you get">One person&apos;s judgment</td><td data-label="What is missing">Coverage of your whole market, every night, and it leaves when they do</td></tr>
                <tr><td data-label="Instead">Contact databases</td><td data-label="What you get">Names, titles and emails</td><td data-label="What is missing">A reason to call this week, proved by the public record</td></tr>
                <tr><td data-label="Instead">An outbound agency</td><td data-label="What you get">Campaigns and volume</td><td data-label="What is missing">Your own market, your own data, and anything you keep</td></tr>
                <tr className="us"><td data-label="Instead"><b>The Account Engine</b></td><td data-label="What you get">Your whole market, ranked nightly</td><td data-label="What is missing">Nothing missing: the reason, the source and who decides, in a portal you own</td></tr>
              </tbody>
            </table>
          </div>
          <p className="eg-body" style={{ marginTop: 22, maxWidth: 760 }}>
            The number that matters is yours: what is one new client worth to you in year one? Already paying for a data tool? Read{" "}
            <Link href="/blog/zoominfo-alternatives-for-b2b-service-companies" className="eg-link">ZoomInfo alternatives for B2B service companies</Link>.
          </p>
        </Section>

        <Section tone="ink" label="Frequently asked questions">
          <QA eyebrow="Questions" q="B2B lead generation, straight answers." />
          <FaqList faqs={FAQS} />
          <div className="eg-links"><Link href="/faq" className="eg-link">Every question we get &rarr;</Link></div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
