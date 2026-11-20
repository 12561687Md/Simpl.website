import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/mi/Reveal";
import { Shell, PageHero, FinalCta } from "../components/mi/kit";
import { INDUSTRY_PAGES } from "../lib/industries";
import { pageMeta, webPage, itemList, ldJson } from "../lib/schema";

const PATH = "/industries";
const TITLE = "Industries: Market Intelligence by Trade | Simpl";
const DESCRIPTION =
  "Elevator service, fire alarm and sprinkler, low voltage and fiber, roofing and facade, generators, and concrete and commercial construction: the public records Simpl watches for each.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function IndustriesPage() {
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
          itemList("Trades Simpl serves", INDUSTRY_PAGES.map((i) => ({ name: i.label, path: `/industries/${i.slug}` })))
        )}
      />
      <PageHero
        crumbs={[{ name: "Industries", path: PATH }]}
        h1="Six trades. Each one has its own paper trail."
        lead="Buildings are required to inspect, certify and repair. Every one of those requirements leaves a public record. We watch the ones that mean a building needs your trade now."
      />
      <section className="m-sec flush" aria-label="Trades">
        <div className="m-wrap">
          <Reveal as="ul" className="m-trades">
            {INDUSTRY_PAGES.map((t, i) => (
              <li key={t.slug}>
                <Link href={`/industries/${t.slug}`}>
                  <span className="i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="n">{t.label}</span>
                  <span className="d">{t.triggers.slice(0, 3).map((x) => x.t).join(" · ")}</span>
                  <span className="ar" aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </Reveal>
          <p className="m-note">Not on the list? If your work is triggered by an inspection, a violation, a permit or a deadline, there is usually a record of it. Ask us on the call.</p>
        </div>
      </section>
      <FinalCta sourcePage={PATH} />
    </Shell>
  );
}
