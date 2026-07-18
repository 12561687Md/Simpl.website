import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "FAQ | SIMPL",
  description: "Straight answers about the SIMPL Score, pricing, and how the team works.",
  alternates: { canonical: "https://simpl.pro/faq" },
};

const FAQS = [
  {
    q: "What is SIMPL, in one sentence?",
    a: "A team that scans, scores, and fixes what's broken in your online presence, your website, Google listing, SEO, and reviews, so customers find you instead of the competitor down the street.",
  },
  {
    q: "What's the SIMPL Score?",
    a: "A 0 to 100 score broken into six graded categories: Website Foundation, SEO & Rankings, Content & Pages, Advertising & Socials, CRM & Reputation, and Google Business Profile. It's the same thing a doctor's test results are, a real number, not a sales pitch, and every finding behind it is measured, never invented.",
  },
  {
    q: "Is the scan actually free?",
    a: "Yes. No signup for the surface scan, no credit card, no sales call required to see your score. Full report and category breakdown unlock with your email.",
  },
  {
    q: "How is this different from a regular marketing agency?",
    a: "You're not paying for an account manager, a sales team, or an office. One team handles the work directly, which is the whole reason the pricing looks the way it does.",
  },
  {
    q: "What do the tiers actually include?",
    a: "Core (from $497/mo) gets your Google listing, site SEO, and schema in order with tracking that shows what's working. Team (from $997/mo) adds a free website build plus content and local SEO. Pro (from $1,997/mo) adds paid ads management and monthly strategy. Every tier includes a free strategy call.",
  },
  {
    q: "Do I need to sign a long contract?",
    a: "Ask on a call, terms are discussed openly before anything starts. There's no fine print designed to trap you, that's not how we want a client to feel about working with us.",
  },
  {
    q: "How fast will I see results?",
    a: "Some things move in days, a broken form fixed, a missing schema tag added. Rankings and reviews build over weeks and months. We'll tell you honestly which is which for your specific findings, not promise a universal timeline.",
  },
  {
    q: "I already have a website. Do I need a new one?",
    a: "Not necessarily. The scan tells you whether your current site is the problem or something else is (SEO, your Google listing, reviews). A full rebuild is one option among several, not the default answer.",
  },
  {
    q: "What if my score comes back bad?",
    a: "That's the point of scanning, most businesses we've checked score between 40 and 65. A low score isn't a verdict, it's a list of exactly what to fix and in what order.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
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
              href="/start"
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
