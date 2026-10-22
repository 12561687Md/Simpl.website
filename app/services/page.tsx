import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section, Eyebrow, QA, Ctas, FinalCta, Crumbs } from "../components/engine/ui";
import { GROWTH_SERVICES, EASY_WINS, SITE } from "../lib/site";
import { breadcrumb, ldJson } from "../lib/schema";

const TITLE = "Services: Account Engine, CRM, AI Receptionist, Websites and SEO | Simpl";
const DESCRIPTION =
  "The growth stack for high-ticket B2B companies: the Account Engine, CRM and follow-up, and a 24/7 AI receptionist. Plus websites, SEO and AI search, Google Business Profile and paid ads.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/services" },
  alternates: { canonical: "https://www.simpl.pro/services" },
};

const GROWTH_DETAIL: Record<string, string> = {
  "/services/account-engine": "Your own portal: every account in your market scored nightly from the public record, with the reason, the proof and who decides.",
  "/services/crm-follow-up": "Every account worth a call flows into your CRM with the sequence running: email, wait, call, follow up until they reply.",
  "/services/ai-receptionist": "Calls and tickets answered at any hour from your own guides, with urgent issues paged to whoever is on duty.",
};
const EASY_DETAIL: Record<string, string> = {
  "/services/website-build": "Fast, findable sites with the schema, speed and calls to action that turn visits into conversations.",
  "/services/local-seo": "Rank in Google and get cited in AI answers for the searches your buyers actually make.",
  "/services/google-business-profile": "A complete, active profile that wins the map listing and the click.",
  "/services/paid-ads": "Google and Meta campaigns with real conversion tracking. You own the account, no markup on spend.",
};

export default function ServicesHub() {
  const all = [...GROWTH_SERVICES, ...EASY_WINS];
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(breadcrumb([{ name: "Services", path: "/services" }]), {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Simpl services",
            itemListElement: all.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.label, url: `${SITE.url}${s.href}` })),
          })}
        />
        <section className="eg-hero" style={{ paddingBottom: 40 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Services", path: "/services" }]} />
            <Eyebrow>Services</Eyebrow>
            <h1 className="eg-h1" style={{ maxWidth: 980 }}>
              Find the accounts. Follow every one up. <span className="dim">Answer every call.</span>
            </h1>
            <p className="eg-lead">
              Three builds make the money: the Account Engine, CRM and follow-up, and a 24/7 receptionist. The easy wins, websites, SEO, Google Business
              Profile and ads, are there when you want them.
            </p>
            <Ctas />
          </div>
        </section>

        <Section>
          <QA eyebrow="The growth engine" q="Which services make the biggest difference?" a="The ones that put more qualified conversations in front of your team. Start with the engine; add follow-up and the phones as you grow." />
          <div className="eg-g3">
            {GROWTH_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="eg-card link">
                <h2 className="eg-h3" style={{ fontSize: 22 }}>{s.label}</h2>
                <p className="eg-body" style={{ fontSize: 15 }}>{GROWTH_DETAIL[s.href]}</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </Section>

        <Section band>
          <QA eyebrow="Also handled" q="Do you still build websites and run SEO?" a="Yes. They're simpler to buy and quicker to ship, and they make sure the accounts you call find a company that looks the part." />
          <div className="eg-g4">
            {EASY_WINS.map((s) => (
              <Link key={s.href} href={s.href} className="eg-card link">
                <h2 className="eg-h3">{s.label}</h2>
                <p className="eg-body" style={{ fontSize: 15 }}>{EASY_DETAIL[s.href]}</p>
                <span className="go">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
          <p className="eg-body" style={{ marginTop: 24 }}>
            Not sure where your site stands? <Link className="eg-link" href="/free-tools">Run the free website and presence scan</Link>.
          </p>
        </Section>

        <FinalCta />
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
