import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BrowserFrame, PortalHome } from "../../components/portal/Portal";
import { Section, QA, Hero, FinalCta, Eyebrow, Steps, Related } from "../../components/engine/ui";
import { webPage, ldJson, pageMeta, AUTHOR_ID } from "../../lib/schema";

/*
 * Primary keyword: "Noovis case study" / integrator lead generation case study.
 * Facts only from Simpl.master/clients/noovis (BRIEF.md, RELEASE_2026-10-16.md,
 * RELEASE_2026-10-21.md, outbound/NOOVIS_PLAYBOOK.md). No outcome numbers: none
 * are recorded yet, and Noovis' prospect list is confidential, so the visual is
 * a mock with fictional accounts.
 */
const PATH = "/case-studies/noovis";
const TITLE = "Noovis Case Study: A Network Integrator's Account Engine";
const DESCRIPTION =
  "How Simpl built Noovis, a Maryland network and smart-building integrator, an Account Engine that reads public records across six states every night.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const SOURCES = [
  { h: "Federal care facility data", b: "CMS records for nursing and care facilities: inspections, citations and ownership." },
  { h: "State licensing", b: "Maryland's licensing records for assisted living, with the named contact on file." },
  { h: "Property records", b: "Maryland's statewide property roll: sales, new owners and building details." },
  { h: "County permits", b: "Permits from ten county and city jurisdictions, filtered to the work Noovis does." },
  { h: "Multifamily and E-Rate", b: "HUD multifamily properties and USAC E-Rate filings for schools and libraries." },
  { h: "Websites and listings", b: "Company websites and public listings, used to confirm who decides." },
];

export default function NoovisCaseStudy() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION }), {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Noovis case study: B2B lead generation for a network and smart-building integrator",
            description: DESCRIPTION,
            url: `https://www.simpl.pro${PATH}`,
            author: { "@id": AUTHOR_ID, "@type": "Person", name: "Matt DuBois" },
            publisher: { "@id": "https://www.simpl.pro/#organization" },
            datePublished: "2026-10-22",
            dateModified: "2026-10-22",
            about: { "@type": "Organization", name: "Noovis, LLC", address: { "@type": "PostalAddress", addressLocality: "Hanover", addressRegion: "MD", addressCountry: "US" } },
            mainEntityOfPage: `https://www.simpl.pro${PATH}`,
          })}
        />

        <Hero
          crumbs={[{ name: "Case study: Noovis", path: PATH }]}
          eyebrow="Case study"
          h1={<>Noovis case study: B2B lead generation for a <em>network and smart-building integrator.</em></>}
          sub="Which buildings need us now, and who decides? Answered every morning."
          lead="Noovis, LLC designs and installs fiber, structured cabling, security and networked building systems from Hanover, Maryland. Simpl built Noovis its own Account Engine: a private portal under the Noovis name that reads public records across six states every night and ranks the buildings worth a call."
          visual={
            <BrowserFrame label="Illustration of an Account Engine home screen with fictional accounts" caption="Illustration with fictional accounts. Noovis' real prospect list stays private.">
              <PortalHome />
            </BrowserFrame>
          }
        />

        <Section tone="paper" label="At a glance">
          <div className="eg-story">
            <div>
              <Eyebrow>At a glance</Eyebrow>
              <h2 className="eg-h2">Six states, read every night, with a source on every fact.</h2>
              <p className="eg-answer">
                Noovis sells to the buildings that run on its networks: senior living communities, apartment buildings, hotels and large commercial properties. Those
                buyers leave a public paper trail. The engine turns it into a ranked call list for Maryland, Delaware, Washington DC, Virginia, Pennsylvania and West Virginia.
              </p>
            </div>
            <div className="eg-facts" style={{ marginTop: 0 }}>
              <div><b>6</b><span>States and districts covered</span></div>
              <div><b>Nightly</b><span>Refresh from federal, state and county records</span></div>
              <div><b>100%</b><span>Of facts link to their source record</span></div>
            </div>
          </div>
        </Section>

        <Section tone="deep" label="What we built">
          <QA
            eyebrow="What we built"
            q="What does Noovis' team see when they log in?"
            a="A morning view that answers one question: who is the best call right now, and why. Everything else in the portal supports the call."
          />
          <Steps
            steps={[
              {
                k: "Home",
                h: <>The best call <em>right now</em>, and why</>,
                b: "The day's top account with its reason, today's ten best calls, follow-ups due, what changed overnight, inspections expected in the next 90 days and communities in budget season.",
              },
              {
                k: "Worth a call",
                h: <>Only accounts with a <em>real reason</em></>,
                b: "An account makes the call list only with a real reason and a way to reach someone. Reasons include an inspector citing one of the systems Noovis installs, a relevant permit, a new location, a sale or new owner, an overdue inspection, or budget season.",
              },
              {
                k: "Account pages",
                h: <>Who decides, with the <em>record behind it</em></>,
                b: "Each account shows named decision makers from public records and websites, each with a link, plus a timeline of inspections, fines and permits, and which nearby buildings already use Noovis.",
              },
              {
                k: "Team tools",
                h: <>Map, pipeline and <em>exports</em></>,
                b: "A territory map, a pipeline, a searchable list of every account, exports on every list, and a printable account brief in the Noovis brand for meetings.",
              },
            ]}
          />
        </Section>

        <Section tone="paper" label="Sources">
          <QA
            eyebrow="Where the reasons come from"
            q="Public records, not purchased lists."
            a="Every reason in the Noovis portal comes from an official or public source, and every fact links back to it, so a rep can quote the record on the call."
          />
          <div className="eg-g3">
            {SOURCES.map((s) => (
              <div key={s.h} className="eg-card">
                <h3 className="eg-h3">{s.h}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="mist" label="Timeline and results">
          <div className="eg-split">
            <div>
              <Eyebrow>Timeline</Eyebrow>
              <h2 className="eg-h2">From signed to live in weeks.</h2>
              <p className="eg-answer">Noovis signed in August 2026. The first portal features went live in October 2026, and we ship improvements to it every week.</p>
            </div>
            <div className="eg-card">
              <h3 className="eg-h3">What about results?</h3>
              <p className="eg-body">
                It&apos;s early, and we only publish what we can prove. When deals the engine sourced close, we will add them here with Noovis&apos; permission. Until then, the
                best proof is your own market: we will build you a sample before you pay anything.
              </p>
              <p style={{ marginTop: 18 }}><Link href="/top-prospects" className="eg-link">See your top prospects &rarr;</Link></p>
            </div>
          </div>
        </Section>

        <Related
          links={[
            { href: "/industries/low-voltage-security", label: "Low voltage leads for integrators", desc: "The signals that mean a building needs your systems." },
            { href: "/industries/senior-living-technology", label: "Senior living sales leads", desc: "Inspection-driven reasons to call, rolled up to the operator." },
            { href: "/services/account-engine", label: "The Account Engine", desc: "How the engine works, step by step." },
          ]}
        />

        <FinalCta heading="Want the same engine for your market?" />
      </main>
      <Footer />
    </div>
  );
}
