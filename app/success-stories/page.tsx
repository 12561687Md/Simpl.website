import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Success Stories | Simpl",
  description: "Real results from Simpl clients, published as soon as clients approve them.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.simpl.pro/success-stories" },
};

/**
 * Honest empty state. Simpl has zero paying clients as of this build
 * (docs/STATUS.md) — no invented numbers, names, or testimonials belong
 * here under any circumstance (docs/standards/TRUST_SIGNALS.md). This page
 * exists so the nav link works and says something true, not something
 * impressive. Replace this file's content with real case studies the
 * moment a client has a real before/after to show.
 */
export default function SuccessStoriesPage() {
  return (
    <div>
      <Header />
      <main>
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "160px 32px 140px", textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            Success Stories
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.12, letterSpacing: "-0.025em", fontWeight: 500 }}>
            We&apos;re just getting started.
          </h1>
          <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: 560, marginInline: "auto" }}>
            Simpl is new enough that we don&apos;t have a wall of client logos to show you yet, and we&apos;d rather tell you
            that plainly than dress up something that isn&apos;t true. What we do have: two growth portals running on the
            Account Engine today, and clients we&apos;ll name as soon as they say we can.
          </p>
          <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: 560, marginInline: "auto" }}>
            The first real result goes here the moment it exists, with the actual numbers, not a projection.
          </p>
          <div style={{ marginTop: 44, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/top-25"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "14px 26px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
            >
              See your top 25 accounts →
            </Link>
            <Link
              href="/services/account-engine"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--fg)", padding: "14px 4px", fontSize: 14, fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--rule)" }}
            >
              How the engine works →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
