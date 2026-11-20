import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/mi/Reveal";
import { Shell, PageHero, SecHead, Terms, FinalCta, WHY_LESS, TERMS } from "../components/mi/kit";
import { SITE } from "../lib/site";
import { pageMeta, webPage, service, faqPage, ldJson } from "../lib/schema";

/*
 * No price on this page on purpose: the dashboard tiers in
 * Simpl.master/docs/offer/OFFER_AND_PRICING.md section 3 are "Recommended",
 * not "Decided". When Matt marks a number Decided, add it here as "from $X"
 * and update the FAQ + JSON-LD in the same change (schema sync rule).
 * The terms ARE decided (rule 11, 2026-11-19), as is the "why we cost less"
 * line (rule 9).
 */
const PATH = "/pricing";
const TITLE = "Pricing: Flat Per Territory, Month to Month | Simpl";
const DESCRIPTION =
  "Simpl pricing is set per territory and given on a 15-minute call. Flat price, month to month after setup, no credits, no usage caps, no auto-renew.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

const FAQS = [
  { q: "Why isn't the price on the page?", a: "Because it depends on your territory: how many buildings, which records it publishes, and which we have to request. We'd rather give you a real number on a 15-minute call than a range that doesn't fit." },
  { q: "What's included?", a: "Your ranked call list, a brief for every building with each record linked, and a view of your whole territory. New record types and new reasons to call are added to your territory as we build them, without a surprise invoice." },
  { q: "How do logins work?", a: "Logins are priced by team size because each one adds real cost. They are never capped and there are no credits per lookup." },
  { q: "Can I cancel?", a: "Yes. After setup it's month to month. If you prepay a year, it renews only when you say yes." },
];

export default function PricingPage() {
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldJson(
          webPage({ path: PATH, name: TITLE, description: DESCRIPTION }),
          service({ name: "Simpl market intelligence, priced per territory", path: PATH, serviceType: "Market intelligence", audience: "Commercial building service companies", description: `${DESCRIPTION} Terms: ${TERMS.map((t) => t.t).join("; ")}.` }),
          faqPage(FAQS)
        )}
      />
      <PageHero
        crumbs={[{ name: "Pricing", path: PATH }]}
        h1={<>One flat price for your territory. <span className="m-blue">Said out loud.</span></>}
        lead="Pricing is set per territory and given on a 15-minute call, along with what your territory's records can and can't show. The terms below don't change."
      >
        <div className="m-ctas">
          <Link href={SITE.primaryCta.href} className="m-btn primary">Get your territory&apos;s price <span className="arr" aria-hidden="true">&rarr;</span></Link>
        </div>
      </PageHero>

      <section className="m-sec" aria-labelledby="terms-h">
        <div className="m-wrap m-split">
          <SecHead h2="The terms." id="terms-h">
            <p className="m-body">Credits, caps and self-renewing contracts are the most common complaints about data vendors. These are the opposite, and they&apos;re in writing.</p>
          </SecHead>
          <Reveal><Terms /></Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="less-h">
        <div className="m-wrap m-split">
          <SecHead h2="Why it costs less." id="less-h" />
          <Reveal>
            <div className="m-quote" style={{ marginTop: 0 }}>
              <p>{WHY_LESS}</p>
              <div className="who">You work directly with the person who builds your territory.</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="pfaq">
        <div className="m-wrap m-split">
          <SecHead h2="Pricing questions." id="pfaq" />
          <div className="m-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta sourcePage={PATH} h2="Get your territory's price." lead="Tell us your trade and territory. On a 15-minute call you get the price, the terms in writing, and a look at what the public record holds for your market." />
    </Shell>
  );
}
