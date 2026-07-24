"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES, categorySlug, type BlogPost } from "../lib/blog";
import ScrollReveal from "../components/ScrollReveal";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" } as const;

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
      {label}
    </span>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", overflow: "hidden" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 10, marginBottom: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.imageAlt} loading="lazy" className="blog-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <CategoryPill label={post.category} />
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--fg-dim)" }}>{post.readMinutes} MIN</span>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 600, lineHeight: 1.28, letterSpacing: "-0.015em" }}>{post.title}</h3>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{post.description}</p>
      <span className="mono" style={{ fontSize: 12, color: "var(--accent)", marginTop: 16 }}>Read the answer →</span>
    </Link>
  );
}

export default function BlogHub({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const inCat = active === "All" || p.category === active;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.question.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [posts, active, q]);

  // When a search or non-"All" filter is active, show a flat result grid.
  // Otherwise show the featured hero + category shelves (the cluster view).
  const browsing = active === "All" && !q;

  return (
    <>
      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "128px 32px 32px" }}>
        <ScrollReveal>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
            The Simpl blog
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, maxWidth: 820 }}>
            Straight answers to the questions you&apos;re already Googling.
          </h1>
          <p style={{ margin: "22px 0 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            No jargon, no fluff. The real answers local businesses search for about ranking, reviews, AI search, and winning
            online, with links to the primary sources so you can check our work.
          </p>
        </ScrollReveal>

        {/* Search + category filter bar */}
        <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: 220 }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--fg-dim)", fontSize: 15 }}>⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search answers…"
              aria-label="Search the blog"
              style={{
                width: "100%",
                padding: "12px 14px 12px 36px",
                background: "var(--bg-elev)",
                border: "1px solid var(--rule-strong)",
                borderRadius: 999,
                color: "var(--fg)",
                fontSize: 14.5,
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["All", ...BLOG_CATEGORIES.map((c) => c.label)].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActive(label)}
                className="blog-filter"
                data-active={active === label}
                style={{
                  padding: "9px 16px",
                  borderRadius: 999,
                  border: "1px solid " + (active === label ? "var(--accent)" : "var(--rule-strong)"),
                  background: active === label ? "var(--accent-soft)" : "transparent",
                  color: active === label ? "var(--accent)" : "var(--muted)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 180ms ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {browsing ? (
        <>
          {/* Featured / cornerstone */}
          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 32px 8px" }}>
            <ScrollReveal>
              <Link href={`/blog/${featured.slug}`} className="blog-featured" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 0, textDecoration: "none", color: "inherit", border: "1px solid var(--rule)", borderRadius: 16, overflow: "hidden", background: "var(--bg-elev)" }}>
                <div style={{ position: "relative", minHeight: 300 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image} alt={featured.imageAlt} className="blog-card-img" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "3px 9px", borderRadius: 999 }}>Start here</span>
                    <CategoryPill label={featured.category} />
                  </div>
                  <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.02em" }}>{featured.title}</h2>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>{featured.description}</p>
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--accent)", marginTop: 22 }}>Read the answer →</span>
                </div>
              </Link>
            </ScrollReveal>
          </section>

          {/* Category shelves */}
          {BLOG_CATEGORIES.map((cat) => {
            const items = posts.filter((p) => p.category === cat.label && p.slug !== featured.slug);
            if (items.length === 0) return null;
            return (
              <section key={cat.slug} style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 32px 0" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{cat.label}</h2>
                    <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>{cat.blurb}</p>
                  </div>
                  <button type="button" onClick={() => setActive(cat.label)} className="mono" style={{ background: "transparent", border: 0, color: "var(--accent)", fontSize: 12, cursor: "pointer", letterSpacing: "0.04em" }}>
                    View all →
                  </button>
                </div>
                <div className="blog-index-grid">
                  {items.map((p) => <PostCard key={p.slug} post={p} />)}
                </div>
              </section>
            );
          })}
        </>
      ) : (
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 32px 0" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>
            {filtered.length} {filtered.length === 1 ? "answer" : "answers"}{active !== "All" ? ` in ${active}` : ""}{q ? ` for “${query}”` : ""}
          </div>
          {filtered.length > 0 ? (
            <div className="blog-index-grid">
              {filtered.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          ) : (
            <p style={{ fontSize: 16, color: "var(--muted)", padding: "20px 0 40px" }}>
              No answers match that yet. Try a different category, or <Link href="/start-now" style={{ color: "var(--accent)" }}>ask us directly</Link>.
            </p>
          )}
        </section>
      )}

      {/* Bottom-of-hub lead capture */}
      <section style={{ maxWidth: 1120, margin: "56px auto 0", padding: "0 32px 100px" }}>
        <ScrollReveal>
          <div style={{ borderRadius: 18, border: "1px solid var(--accent-line)", background: "linear-gradient(180deg, var(--bg-soft), var(--bg))", padding: "clamp(36px, 6vw, 64px)", textAlign: "center" }}>
            <h2 style={{ margin: "0 auto 14px", fontSize: "clamp(24px, 3.4vw, 40px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: 640 }}>
              Stop reading about it. See where your business actually stands.
            </h2>
            <p style={{ margin: "0 auto 28px", fontSize: 17, lineHeight: 1.6, color: "var(--muted)", maxWidth: 540 }}>
              The free Simpl scan grades your whole online presence in about 60 seconds. No credit card, no call required.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/scan" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 28px", fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
                Run my free scan →
              </Link>
              <Link href="/start-now" style={{ color: "var(--fg)", textDecoration: "none", padding: "13px 26px", fontSize: 15, border: "1px solid var(--rule-strong)", borderRadius: 999 }}>
                Talk to a human
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
