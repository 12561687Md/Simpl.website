import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, QA, Hero, FinalCta, Versus } from "../components/engine/ui";
import { GROWTH_SERVICES, LOCAL_SERVICES } from "../lib/site";
import { webPage, itemList, ldJson, pageMeta } from "../lib/schema";

/* Primary keyword: "B2B lead generation services" (390/mo, KD 33).
   Secondary: lead generation services, outbound lead generation. */
const PATH = "/services";
const TITLE = "B2B Lead Generation Services and Local SEO | Simpl";
const DESCRIPTION =
  "B2B lead generation services built on public records: the Account Engine, CRM follow-up and an AI receptionist. Plus local SEO and websites.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const DETAIL: Record<string, string> = {
  "/services/account-engine": "Your own portal: every account in your market scored nightly from the public record, with the reason, the source and who decides.",
  "/services/crm-follow-up": "Every account worth a call lands in your CRM with the sequence running: email, wait, call, follow up until they reply.",
  "/services/ai-receptionist": "Calls and tickets answered at any hour from your own guides, with urgent issues paged to whoever is on duty.",
  "/services/local-seo": "Show up in the Google Maps 3-pack and in AI answers for the searches your customers make.",
  "/services/website-build": "Fast, findable websites with the schema, speed and calls to action that turn visits into calls.",
  "/services/google-business-profile": "A complete, active profile that wins the map listing and the click.",
  "/services/paid-ads": "Google and Meta campaigns with real conversion tracking. You own the account, no markup on spend.",
};

export default function ServicesHub() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
            itemList("Simpl services", [...GROWTH_SERVICES, ...LOCAL_SERVICES].map((s) => ({ name: s.label, path: s.href })))
          )}
        />

        <Hero
          crumbs={[{ name: "Services", path: PATH }]}
          eyebrow="Services"
          h1={<>B2B lead generation services, <em>built on the public record.</em></>}
          sub="Find the accounts, follow them up, answer every call."
          lead="Door one is for B2B companies that sell to buildings, facilities and regulated businesses. Door two is for service businesses that win customers locally. Same team, same standard: every claim provable."
        />

        <Section tone="paper" label="B2B client acquisition">
          <QA
            eyebrow="Door one"
            q="B2B client acquisition"
            a="Outbound lead generation that starts with a reason to call. The Account Engine finds the accounts; CRM follow-up and the AI receptionist make sure none of them slip."
          />
          <div className="eg-g3">
            {GROWTH_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-card link">
                <h3 className="eg-h3">{s.label}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{DETAIL[s.href]}</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </Section>

        <Section tone="deep" label="Why it works">
          <QA eyebrow="Why it works" q="Lead generation services usually sell volume. We sell reasons." />
          <Versus
            withoutLabel="Typical lead generation"
            withLabel="Simpl"
            without={["Purchased lists, the same ones your competitors buy", "Volume emails with no reason to reply", "Leads you rent, then lose when you stop paying", "Results you can't trace back to a source"]}
            withUs={[<><b>Your whole market,</b> read from the public record</>, <><b>A dated reason to call</b> for every account</>, <><b>A portal under your name,</b> data you can export</>, <><b>A source link</b> on every fact</>]}
          />
        </Section>

        <Section tone="mist" label="Local businesses">
          <QA
            eyebrow="Door two"
            q="Local SEO and websites for service businesses"
            a="For businesses that win customers in their own town: get found on Google Maps and in AI answers, with a website that turns the visit into a call."
          />
          <div className="eg-g2">
            {LOCAL_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-card link">
                <h3 className="eg-h3">{s.label}</h3>
                <p className="eg-body" style={{ fontSize: 15 }}>{DETAIL[s.href]}</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
          <p className="eg-body" style={{ marginTop: 24 }}>
            Not sure where to start? Run the <Link href="/free-tools" className="eg-link">free website audit</Link>.
          </p>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
