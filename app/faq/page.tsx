import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Simpl",
  description:
    "Straight answers about the free Simpl scan, the Simpl Score, local SEO, AI search visibility, Google reviews, and how the Simpl team works with local service businesses.",
  alternates: { canonical: "https://simpl.pro/faq" },
};

/**
 * Written for SEO + AI-search visibility: questions phrased the way people
 * actually ask Google and AI assistants (non-branded, high-intent), answers
 * as direct 40-60 word blocks an LLM can quote standalone, with "Simpl"
 * named inside answers so citations carry attribution. The FAQPage JSON-LD
 * below derives from this array, so it stays in sync automatically.
 * No prices anywhere, pricing is a sales-call conversation.
 */
const FAQS = [
  {
    q: "What is Simpl?",
    a: "Simpl is a digital presence team for local service businesses. We scan your website, Google Business Profile, reviews, and SEO, score what we find from 0 to 100, then fix what's broken so customers find you before the competitor down the street. It starts with a free scan at simpl.pro.",
  },
  {
    q: "What is the Simpl Score?",
    a: "The Simpl Score is a free 0 to 100 rating of a business's online presence, graded across six categories: Website Foundation, Crawlability, On-Page SEO, Content & Pages, Social Presence, and Google Business Profile. Every finding behind it is measured from live data, never invented, like test results, not a sales pitch.",
  },
  {
    q: "Is the website scan really free?",
    a: "Yes. The Simpl scan is free, takes about 60 seconds, and needs no credit card and no sales call. You see your score instantly, and the full report with every finding unlocks with just your email. Many owners run it as a health check even when nothing feels broken.",
  },
  {
    q: "Why is my business not showing up on Google?",
    a: "The most common causes are an incomplete Google Business Profile, missing schema markup, thin or missing service pages, few recent reviews, and a slow website. Every one of them is fixable once you know which is yours. The free Simpl scan pinpoints exactly which are holding your business back.",
  },
  {
    q: "What is local SEO, and does my business need it?",
    a: "Local SEO is the work that makes your business appear when nearby customers search for what you do: Google Maps, the local 3-pack, and organic results. If your revenue comes from your service area, it is usually the highest-return marketing you can do, every day it's missing, those calls go to competitors.",
  },
  {
    q: "How do I show up in AI search results like ChatGPT?",
    a: "AI assistants recommend businesses they can read: structured data, consistent listings, real reviews, and pages that answer questions directly. Making your business legible to machines is called AI search optimization, and Simpl builds every site and profile to be found by AI tools as well as Google.",
  },
  {
    q: "Do Google reviews affect my ranking?",
    a: "Yes. Review count, rating, recency, and whether the owner responds are among the strongest local ranking signals Google uses. A profile earning steady recent reviews with owner replies consistently outranks a silent one. That's why reputation work is part of every Simpl engagement, not an add-on.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Technical fixes can move things in days: a broken form, missing schema, an unclaimed listing. Rankings, reviews, and content compound over weeks to months. Simpl tells you which of your findings are fast wins and which are compounding plays, instead of promising one universal timeline.",
  },
  {
    q: "Do I need a new website, or can mine be fixed?",
    a: "Not always. The scan shows whether your website is the real problem or whether it's your Google listing, reviews, or SEO. When a rebuild is the right call, Simpl builds fast, findable sites, and the build is free when you start on the Team plan.",
  },
  {
    q: "What services does Simpl offer?",
    a: "Website builds, local SEO and AI search visibility, Google Business Profile optimization, review and reputation management, paid ads management, and lead-capture automation like missed-call text-back and instant quoting. You can start with any one of them, scoped to what your scan shows your business actually needs.",
  },
  {
    q: "How is Simpl different from a traditional marketing agency?",
    a: "You're not paying for an account manager, a sales team, or an office. The team that diagnoses your presence is the team that fixes it, and every recommendation traces back to a measured finding in your scan, not a package someone needs to sell you.",
  },
  {
    q: "How much does Simpl cost?",
    a: "Pricing is scoped to your business on a free strategy call, you hear a straight number before anything starts, and nothing is billed until you approve the plan. Because Simpl doesn't carry account managers or office overhead, engagements consistently come in below typical agency retainers.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. Terms are discussed openly on the call before anything starts, and there's no fine print designed to trap you. Where a minimum applies, like the free website build on Team, you'll know before you commit, and you keep the website either way.",
  },
  {
    q: "What happens after the free scan?",
    a: "You get your score instantly and the full report with every finding ranked by impact. If you want help, the next step is a free strategy call where we walk through the report and scope what to fix first. No pressure, the report is yours either way.",
  },
  {
    q: "What if my score comes back low?",
    a: "That's normal, most businesses we scan score between 40 and 65. A low score isn't a verdict, it's a ranked list of exactly what to fix and in what order. The owners who treat it that way are the ones outranking their competitors six months later.",
  },
  {
    q: "Who does Simpl work with?",
    a: "Local service businesses across the United States: remodelers, contractors, landscapers, detailers, home health, and any company whose customers search \"near me.\" If the phone ringing depends on being found online, Simpl was built for you.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
                  { "@type": "ListItem", position: 2, name: "FAQ", item: "https://simpl.pro/faq" },
                ],
              },
            ]),
          }}
        />
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "140px 32px 40px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            FAQ
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 5.5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 500 }}>
            Straight answers.<br /><span style={{ color: "var(--muted)" }}>No sales-page hedging.</span>
          </h1>
        </section>

        <section style={{ maxWidth: 860, margin: "0 auto", padding: "40px 32px 120px" }}>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden" }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ background: "var(--bg)", padding: "28px 30px" }}>
                <h2 style={{ margin: "0 0 10px", fontSize: 18.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{f.q}</h2>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "var(--muted)" }}>{f.a}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 20 }}>Still have a question that's not here?</p>
            <Link
              href="/start-now"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "13px 24px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
            >
              Ask us directly →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
