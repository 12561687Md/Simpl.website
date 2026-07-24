import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS, getPost } from "../../lib/blog";
import { RichText } from "../RichText";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found | Simpl" };
  return {
    title: `${post.metaTitle} | Simpl`,
    description: post.description,
    alternates: { canonical: `https://simpl.pro/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      type: "article",
      images: [`https://simpl.pro${post.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://simpl.pro/blog/${post.slug}`;

  // Cluster interlinking: other posts in the same category, then fill from the
  // rest so there are always sibling links for crawlers to follow.
  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <div>
      <Header />
      <main>
        {/* BlogPosting + FAQPage + Breadcrumb. FAQPage is the AEO payload that
            gets this post quoted by answer engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                image: `https://simpl.pro${post.image}`,
                datePublished: post.updated,
                dateModified: post.updated,
                mainEntityOfPage: url,
                author: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
                publisher: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((f) => ({
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
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://simpl.pro/blog" },
                  { "@type": "ListItem", position: 3, name: post.metaTitle, item: url },
                ],
              },
            ]),
          }}
        />

        <article style={{ maxWidth: 760, margin: "0 auto", padding: "112px 32px 40px" }}>
          <div style={{ ...mono, fontSize: 12, marginBottom: 22 }}>
            <Link href="/blog" style={{ color: "var(--muted)", textDecoration: "none" }}>
              ← All answers
            </Link>
          </div>

          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            {post.category} · {post.readMinutes} min read · Updated {new Date(post.updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 600 }}>
            {post.title}
          </h1>
          <p style={{ margin: "22px 0 0", fontSize: 18, lineHeight: 1.65, color: "var(--muted)" }}>{post.intro}</p>

          {/* Hero image */}
          <figure style={{ margin: "32px 0 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.imageAlt} style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 12, display: "block" }} />
            <figcaption className="mono" style={{ marginTop: 8, fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", textTransform: "uppercase" }}>
              Photo: {post.imageCredit}
            </figcaption>
          </figure>

          {/* Key takeaways box (answer-first, LLM-extractable) */}
          <aside style={{ marginTop: 36, padding: "24px 26px", borderRadius: 12, border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
              Key takeaways
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
              {post.keyTakeaways.map((t, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, alignItems: "start", fontSize: 15.5, lineHeight: 1.55 }}>
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontWeight: 700 }}>→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </aside>

          {post.sections.map((s, si) => (
            <section key={s.heading} style={{ marginTop: 44 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 23, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                {s.heading}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 16px", fontSize: 16.5, lineHeight: 1.7 }}>
                  <RichText text={p} />
                </p>
              ))}

              {/* Mid-post contextual CTA, once, after the second section. */}
              {si === 1 && (
                <div style={{ margin: "8px 0 4px", padding: "20px 22px", borderRadius: 10, border: "1px solid var(--rule-strong)", background: "var(--bg-soft)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                  <span style={{ fontSize: 15.5, lineHeight: 1.5, maxWidth: 420 }}>
                    Want this checked on your own site? The free Simpl scan finds exactly which of these is holding you back.
                  </span>
                  <Link href="/scan" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "11px 20px", fontSize: 14, fontWeight: 600, borderRadius: 999, whiteSpace: "nowrap" }}>
                    Run the free scan →
                  </Link>
                </div>
              )}
            </section>
          ))}

          {/* FAQ, rendered to match the FAQPage schema above. */}
          <section style={{ marginTop: 56 }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 23, fontWeight: 600, letterSpacing: "-0.015em" }}>
              Frequently asked
            </h2>
            <div style={{ borderTop: "1px solid var(--rule)" }}>
              {post.faqs.map((f) => (
                <div key={f.q} style={{ padding: "22px 0", borderBottom: "1px solid var(--rule)" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{f.q}</h3>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)" }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Outbound sources, an explicit AEO/E-E-A-T trust signal. */}
          <section style={{ marginTop: 48 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
              Sources
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {post.sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14.5, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--rule)" }}>
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Conversion CTA */}
          <section style={{ marginTop: 56, padding: "32px 30px", borderRadius: 12, border: "1px solid var(--accent)", background: "linear-gradient(180deg, var(--bg-soft), var(--bg))", boxShadow: "0 16px 48px -30px var(--accent)" }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Want to know how your business actually scores?
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 15.5, lineHeight: 1.6, color: "var(--muted)", maxWidth: 520 }}>
              The free scan shows exactly where you stand on everything above, in about 60 seconds. No credit card, no call required.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/scan" className="cta-primary" style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "13px 24px", fontSize: 14, fontWeight: 700, borderRadius: 999, textDecoration: "none" }}>
                Run my free scan →
              </Link>
              <Link href="/start-now" style={{ display: "inline-flex", alignItems: "center", color: "var(--fg)", padding: "12px 22px", fontSize: 14, border: "1px solid var(--rule-strong)", borderRadius: 999, textDecoration: "none" }}>
                Talk to a human
              </Link>
            </div>
          </section>

          {/* Related posts, cluster interlinking */}
          {related.length > 0 && (
            <section style={{ marginTop: 64 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
                Keep reading
              </div>
              <div style={{ display: "grid", gap: 14 }}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px", borderRadius: 12, border: "1px solid var(--rule)", textDecoration: "none", color: "inherit" }} className="blog-related">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.image} alt={r.imageAlt} loading="lazy" style={{ width: 92, height: 62, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                    <span>
                      <span className="mono" style={{ display: "block", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 5 }}>{r.category}</span>
                      <span style={{ display: "block", fontSize: 16, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{r.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
