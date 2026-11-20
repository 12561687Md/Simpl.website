import type { Metadata } from "next";
import Reveal from "../components/mi/Reveal";
import { Shell, PageHero, SecHead, FinalCta, WHY_LESS } from "../components/mi/kit";
import { SITE } from "../lib/site";
import { pageMeta, webPage, person, ldJson } from "../lib/schema";

const PATH = "/about";
const TITLE = "About Simpl: Matt DuBois, Raleigh, NC | Simpl";
const DESCRIPTION =
  "Simpl is the market intelligence partner for commercial building services, built by Matt DuBois in Raleigh, North Carolina. You work directly with the person who builds it.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const RULES = [
  { h: "No link, no reason.", b: "If we can't point to the record, it doesn't go on your list. Your rep never repeats something we can't back up." },
  { h: "Dated, always.", b: "Every row shows when the record was made and when we checked it. Nothing is presented as newer than it is." },
  { h: "Sell what's built.", b: "Anything still in progress is labeled that way. We don't call a feature done until it is." },
  { h: "No overhead in your invoice.", b: WHY_LESS },
];

export default function AboutPage() {
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "AboutPage" }), person())} />
      <PageHero
        crumbs={[{ name: "About", path: PATH }]}
        h1="Simpl is built by one person you can call."
        lead="I'm Matt DuBois. I run Simpl from Raleigh, North Carolina. I build every territory myself: the record research, the ranking, and the list your team works from."
      />

      <section className="m-sec" aria-labelledby="why-h">
        <div className="m-wrap m-split">
          <SecHead h2="Why public records." id="why-h" />
          <Reveal className="m-stack">
            <p className="m-body" style={{ fontSize: 18 }}>
              Simpl started by scanning how businesses show up online. Then I built a sales portal for a company that sells into commercial buildings, and the question changed from &ldquo;how do we get found&rdquo; to &ldquo;who should we call this week, and why?&rdquo;
            </p>
            <p className="m-body" style={{ fontSize: 18 }}>
              The answer kept turning up in the same place: inspection results, violation notices, certificates and permits. All public, all dated, and almost all buried in portals nobody on a sales team has time to read. Simpl reads them so your team doesn&apos;t have to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="rules-h">
        <div className="m-wrap m-split">
          <SecHead h2="How I work." id="rules-h" />
          <Reveal as="ul" className="m-terms">
            {RULES.map((r) => (
              <li key={r.h}><span className="t">{r.h}</span><span className="b">{r.b}</span></li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="m-sec tight" aria-labelledby="contact-h">
        <div className="m-wrap m-split">
          <h2 className="m-h2" id="contact-h" style={{ fontSize: 30 }}>Reach me directly.</h2>
          <p className="m-body" style={{ fontSize: 18 }}>
            Simpl Systems LLC, {SITE.city}. Working with companies across the US.<br />
            <a className="m-link" href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a className="m-link" href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </div>
      </section>

      <FinalCta sourcePage={PATH} />
    </Shell>
  );
}
