import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Success Stories | SIMPL",
  description: "Real before/afters from SIMPL clients, coming as soon as the work is done.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://simpl.pro/success-stories" },
};

/**
 * Honest empty state. SIMPL has zero paying clients as of this build
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
            SIMPL is new enough that we don&apos;t have a wall of client logos to show you yet, and we&apos;d rather tell you
            that plainly than dress up something that isn&apos;t true. What we do have: a real scoring engine, a real
            process, and clients in progress right now.
          </p>
          <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: 560, marginInline: "auto" }}>
            The first real before/after goes here the moment it exists, with the actual numbers, not a projection.
          </p>
          <div style={{ marginTop: 44, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/scan"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "14px 26px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
            >
              See your own score first →
            </Link>
            <Link
              href="/start"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--fg)", padding: "14px 4px", fontSize: 14, fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--rule)" }}
            >
              Be the first story →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
