import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "../../components/mi/Reveal";
import { Shell, PageHero, SecHead, FinalCta } from "../../components/mi/kit";
import { pageMeta } from "../../lib/schema";

/*
 * DRAFT, pending Noovis' written approval (hard rule: no client name or story
 * without consent). noindex, not in the sitemap, not in the nav or footer, no
 * JSON-LD. Content: only what Simpl built and public facts about Noovis.
 * Never: Noovis' customers, lists, accounts, call notes, counts from their
 * data, revenue, or screenshots of their portal. The visual is a mockup with
 * placeholder names.
 */
const PATH = "/partners/noovis";
const TITLE = "Noovis and Simpl: A Market Intelligence Portal (Draft) | Simpl";
const DESCRIPTION = "Draft success story, pending Noovis approval.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION, noindex: true });

const BUILT = [
  { t: "A call list with dated reasons", b: "Every account on the list carries the reason to call now, the date of the record behind it, and a link to that record." },
  { t: "Maryland elevator leads", b: "Built from the state's own elevator inspection records: failed inspections, repeat failures and certificate dates, each with the state record." },
  { t: "Security and Wi-Fi complaint signals", b: "Properties whose guests or residents complain about the Wi-Fi or security in public reviews, quoted in their own words with a link to each review." },
  { t: "Account intel", b: "For each account: the record over time, its locations, who decides with each name linked to where it was found, and a one-page brief to print." },
  { t: "A support line", b: "An automated phone receptionist that answers, troubleshoots known issues and turns every call into a ticket. In pilot." },
];

const TIMELINE = [
  { d: "Oct 9, 2026", e: "Noovis signs for its market intelligence portal." },
  { d: "Oct 21, 2026", e: "First full release: Home with today's accounts, the call list, account briefs and the map." },
  { d: "Nov 18 to 19, 2026", e: "Maryland elevator leads and Wi-Fi complaint signals go live." },
];

const MOCK = [
  { n: "Example Tower Apartments", r: "Elevator failed state inspection, reinspection failed", d: "Record dated" },
  { n: "Sample Senior Residences", r: "Guests report the Wi-Fi drops in public reviews", d: "Review linked" },
  { n: "Placeholder Office Center", r: "Certificate expires within 90 days", d: "State record" },
];

export default function NoovisDraft() {
  return (
    <Shell banner={<div className="m-banner" role="note">Draft: pending Noovis approval. Not linked, not indexed.</div>}>
      <PageHero
        crumbs={[{ name: "Noovis (draft)", path: PATH }]}
        h1={<>Noovis finds the buildings that need them, <span className="m-blue">with the proof attached.</span></>}
        lead="Noovis is a Maryland building connectivity and emergency phone line company. Simpl built their market intelligence portal at noovis.simpl.pro."
      >
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 18 }}>
          <Image src="/partners/noovis-logo.png" alt="Noovis" width={190} height={46} />
          <span className="m-label">noovis.com</span>
        </div>
      </PageHero>

      <section className="m-sec" aria-labelledby="need">
        <div className="m-wrap m-split">
          <SecHead h2="What they needed." id="need" />
          <Reveal className="m-stack">
            <p className="m-body" style={{ fontSize: 18 }}>Find the buildings that need Noovis before competitors do, and give the sales team a reason to call that the building owner can check for themselves.</p>
            <p className="m-body" style={{ fontSize: 18 }}>Not a lead list. A dated reason, with the record behind it.</p>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="built">
        <div className="m-wrap m-split">
          <SecHead h2="What Simpl built." id="built" />
          <Reveal as="ul" className="m-terms">
            {BUILT.map((x) => (
              <li key={x.t}><span className="t">{x.t}</span><span className="b">{x.b}</span></li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="mock">
        <div className="m-wrap m-split">
          <SecHead h2="What the team sees." id="mock">
            <p className="m-body">A mockup with placeholder names. No Noovis account or customer appears on this page.</p>
          </SecHead>
          <Reveal className="m-ledger">
            <div className="top"><span className="m-label">Call list · Mockup</span><span className="m-label">Placeholder names</span></div>
            <ol>
              {MOCK.map((m, i) => (
                <li key={m.n}>
                  <div className="d">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="a">{m.n}</div>
                    <div className="r">{m.r}</div>
                    <div className="s">{m.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="tl">
        <div className="m-wrap m-split">
          <SecHead h2="Timeline." id="tl" />
          <Reveal>
            <ol className="m-tl">
              {TIMELINE.map((t) => (
                <li key={t.d} className="hot">
                  <div className="d">{t.d}</div>
                  <div className="e">{t.e}</div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="quote">
        <div className="m-wrap m-split">
          <SecHead h2="In their words." id="quote" />
          <Reveal>
            <div className="m-quote" style={{ marginTop: 0, borderLeftColor: "#F5C451" }}>
              <p>[Eric&apos;s quote, to be approved]</p>
              <div className="who">Eric, Noovis. Placeholder until Noovis writes and approves it.</div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta sourcePage={PATH} />
    </Shell>
  );
}
