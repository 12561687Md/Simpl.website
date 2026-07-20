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
    openGraph: { title: post.metaTitle, description: post.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://simpl.pro/blog/${post.slug}`;

  return (
    <div>
      <Header />
      <main>
        {/* Article + FAQPage + Breadcrumb. The FAQPage is the AEO payload: it's
            what makes an answer engine quote this post directly. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.description,
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
                  { "@type": "ListItem", position: 1, name: "Blog", item: "https://simpl.pro/blog" },
                  { "@type": "ListItem", position: 2, name: post.metaTitle, item: url },
                ],
              },
            ]),
          }}
        />

        <article style={{ maxWidth: 760, margin: "0 auto", padding: "120px 32px 40px" }}>
          <div style={{ ...mono, fontSize: 12, marginBottom: 24 }}>
            <Link href="/blog" style={{ color: "var(--muted)", textDecoration: "none" }}>
              ← All answers
            </Link>
          </div>

          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg)", marginBottom: 18 }}>
            {post.category} · {post.readMinutes} min read
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 600 }}>
            {post.title}
          </h1>
          <p style={{ margin: "24px 0 0", fontSize: 18, lineHeight: 1.65, color: "var(--muted)" }}>{post.intro}</p>

          {post.sections.map((s) => (
            <section key={s.heading} style={{ marginTop: 44 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 23, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                {s.heading}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 16px", fontSize: 16.5, lineHeight: 1.7 }}>
                  <RichText text={p} />
                </p>
              ))}
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

          {/* Outbound sources — an explicit AEO/E-E-A-T trust signal. */}
          <section style={{ marginTop: 48 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
              Sources
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {post.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 14.5, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--rule)" }}
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Conversion: the post answered the question, now offer the scan. */}
          <section
            style={{
              marginTop: 56,
              padding: "32px 30px",
              borderRadius: 10,
              border: "1px solid var(--accent)",
              background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
              boxShadow: "0 16px 48px -30px var(--accent)",
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Want to know how your business actually scores?
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 15.5, lineHeight: 1.6, color: "var(--muted)", maxWidth: 520 }}>
              Start now, free audit, see exactly where you stand on everything above, in about thirty seconds.
            </p>
            <Link
              href="/start-now"
              className="cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "var(--accent-ink)",
                padding: "13px 24px",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Start Now →
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
