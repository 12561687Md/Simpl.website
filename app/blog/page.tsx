import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../lib/blog";

export const metadata: Metadata = {
  title: "SIMPL Blog | Answers for local businesses growing online",
  description:
    "Plain-English answers to the questions local service businesses actually ask about ranking on Google, getting reviews, and winning online.",
  alternates: { canonical: "https://simpl.pro/blog" },
};

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

export default function BlogIndex() {
  return (
    <div>
      <Header />
      <main>
        {/* ItemList schema so the index itself is eligible for rich results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "SIMPL Blog",
              url: "https://simpl.pro/blog",
              blogPost: BLOG_POSTS.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `https://simpl.pro/blog/${p.slug}`,
                datePublished: p.updated,
                dateModified: p.updated,
              })),
            }),
          }}
        />

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 40px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
            The SIMPL blog
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, maxWidth: 760 }}>
            Straight answers to the questions you&apos;re already Googling.
          </h1>
          <p style={{ margin: "22px 0 0", maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            No jargon, no fluff. The real answers local businesses search for about ranking, reviews, and winning online,
            with links to the primary sources so you can check our work.
          </p>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 32px 100px" }}>
          <div className="blog-index-grid">
            {BLOG_POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="blog-card"
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg)", marginBottom: 14 }}>
                  {p.category} · {p.readMinutes} min
                </div>
                <h2 style={{ margin: "0 0 10px", fontSize: 21, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.015em" }}>
                  {p.title}
                </h2>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{p.description}</p>
                <div style={{ ...mono, fontSize: 12, color: "var(--accent)", marginTop: 18 }}>Read the answer →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
