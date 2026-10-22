import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthorBio from "../../components/engine/AuthorBio";
import { Crumbs, FinalCta } from "../../components/engine/ui";
import { BLOG_POSTS, getPost } from "../../lib/blog";
import { RichText } from "../RichText";
import { GROWTH_SERVICES, LOCAL_SERVICES, INDUSTRIES } from "../../lib/site";
import { faqPage, ldJson, AUTHOR_ID, pageMeta } from "../../lib/schema";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found | Simpl" };
  const meta = pageMeta({
    path: `/blog/${post.slug}`,
    title: `${post.metaTitle} | Simpl`,
    description: post.description,
    images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }],
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" }, authors: [{ name: "Matt DuBois", url: "https://www.simpl.pro/about" }] };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://www.simpl.pro/blog/${post.slug}`;
  // B2B posts point to the Account Engine; the local posts point to the free audit.
  const b2b = post.audience === "b2b";
  const cta = b2b
    ? { mid: "Want these signals tracked for your own territory? We'll build a sample of your top prospects, with the record behind each one.", midBtn: "See your top prospects", href: "/top-prospects" }
    : { mid: "Want this checked on your own site? The free website audit shows which of these is holding you back.", midBtn: "Get your free website audit", href: "/free-tools" };

  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);
  const isSvg = (src: string) => src.endsWith(".svg");
  const updated = new Date(post.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ldJson(
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image: `https://www.simpl.pro${post.image}`,
              datePublished: post.updated,
              dateModified: post.updated,
              mainEntityOfPage: url,
              author: { "@type": "Person", "@id": AUTHOR_ID, name: "Matt DuBois", jobTitle: "Founder", url: "https://www.simpl.pro/about" },
              publisher: { "@type": "Organization", "@id": "https://www.simpl.pro/#organization", name: "Simpl", url: "https://www.simpl.pro", logo: "https://www.simpl.pro/brand/simpl-logo-1024.png" },
            },
            faqPage(post.faqs)
          )}
        />

        <div className="tone-paper">
          <div className="blog-layout" style={{ maxWidth: 1180, margin: "0 auto", padding: "160px 32px 72px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 56, alignItems: "start" }}>
            <article style={{ maxWidth: 760, margin: 0, padding: 0, minWidth: 0 }}>
              <Crumbs items={[{ name: "Blog", path: "/blog" }, { name: post.metaTitle, path: `/blog/${post.slug}` }]} />

              <div className="mono-label" style={{ color: "var(--accent-text)", marginBottom: 16 }}>
                {post.category} · {post.readMinutes} min read
              </div>
              <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.035em", fontWeight: 650 }}>{post.title}</h1>
              <p style={{ margin: "18px 0 0", fontSize: 14.5, color: "var(--muted)" }}>
                By <Link href="/about" className="eg-link">Matt DuBois</Link>, Founder of Simpl · Updated <time dateTime={post.updated}>{updated}</time>
              </p>
              <p style={{ margin: "22px 0 0", fontSize: 18.5, lineHeight: 1.65, color: "var(--muted)" }}>{post.intro}</p>

              <figure style={{ margin: "32px 0 0" }}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={1600}
                  height={900}
                  priority
                  unoptimized={isSvg(post.image)}
                  sizes="(max-width: 860px) 100vw, 760px"
                  style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 14, display: "block" }}
                />
                <figcaption className="mono" style={{ marginTop: 8, fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  {b2b ? "Graphic" : "Photo"}: {post.imageCredit}
                </figcaption>
              </figure>

              <aside style={{ marginTop: 36, padding: "24px 26px", borderRadius: 14, border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}>
                <div className="mono-label" style={{ color: "var(--accent-text)", marginBottom: 14 }}>Key takeaways</div>
                <ul className="eg-list">
                  {post.keyTakeaways.map((t, i) => (
                    <li key={i} style={{ color: "var(--fg)" }}><span>{t}</span></li>
                  ))}
                </ul>
              </aside>

              {post.sections.map((s, si) => (
                <section key={s.heading} style={{ marginTop: 44 }}>
                  <h2 style={{ margin: "0 0 16px", fontSize: 25, fontWeight: 650, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} style={{ margin: "0 0 16px", fontSize: 17, lineHeight: 1.75, color: "#2A3036" }}>
                      <RichText text={p} />
                    </p>
                  ))}
                  {si === 1 && (
                    <div className="tone-ink" style={{ margin: "12px 0 4px", padding: "22px 24px", borderRadius: 14, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <span style={{ fontSize: 15.5, lineHeight: 1.5, maxWidth: 420 }}>{cta.mid}</span>
                      <Link href={cta.href} className="eg-btn primary" style={{ padding: "12px 20px", fontSize: 14.5 }}>{cta.midBtn} <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                  )}
                </section>
              ))}

              <section style={{ marginTop: 56 }}>
                <h2 style={{ margin: "0 0 18px", fontSize: 25, fontWeight: 650, letterSpacing: "-0.02em" }}>Frequently asked</h2>
                <div style={{ borderTop: "1px solid var(--rule)" }}>
                  {post.faqs.map((f) => (
                    <div key={f.q} style={{ padding: "22px 0", borderBottom: "1px solid var(--rule)" }}>
                      <h3 style={{ margin: "0 0 8px", fontSize: 17.5, fontWeight: 620, lineHeight: 1.35 }}>{f.q}</h3>
                      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--muted)" }}>{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section style={{ marginTop: 44 }}>
                <h2 className="mono-label" style={{ marginBottom: 14, fontWeight: 500 }}>Sources</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                  {post.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="eg-link" style={{ fontSize: 15 }}>
                        {s.label} &#8599;
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <div style={{ marginTop: 44 }}>
                <AuthorBio />
              </div>

              {related.length > 0 && (
                <section style={{ marginTop: 56 }}>
                  <h2 className="mono-label" style={{ marginBottom: 18, fontWeight: 500 }}>Keep reading</h2>
                  <div style={{ display: "grid", gap: 12 }}>
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="eg-card link" style={{ display: "flex", alignItems: "center", gap: 16, padding: 14 }}>
                        <Image src={r.image} alt={r.imageAlt} width={184} height={124} unoptimized={isSvg(r.image)} style={{ width: 92, height: 62, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                        <span>
                          <span className="mono-label" style={{ display: "block", color: "var(--accent-text)", marginBottom: 5, fontSize: 10 }}>{r.category}</span>
                          <span style={{ display: "block", fontSize: 16, fontWeight: 620, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{r.title}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside className="blog-rail">
              <div style={{ position: "sticky", top: 130, display: "grid", gap: 16 }}>
                <div className="eg-card" style={{ padding: 18 }}>
                  <div className="mono-label" style={{ color: "var(--accent-text)", marginBottom: 10 }}>Related services</div>
                  <nav aria-label="Related services" style={{ display: "grid", gap: 2 }}>
                    {(b2b ? [...GROWTH_SERVICES, ...INDUSTRIES.slice(0, 3)] : [...LOCAL_SERVICES, GROWTH_SERVICES[0]]).map((s) => (
                      <Link key={s.href} href={s.href} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 4px", textDecoration: "none", color: "var(--fg)", fontSize: 14 }}>
                        <span>{s.label}</span>
                        <span aria-hidden="true" style={{ color: "var(--accent-text)" }}>&rarr;</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="eg-card tone-ink" style={{ padding: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 620, marginBottom: 8 }}>{b2b ? "See it on your own market" : "Check your own site"}</div>
                  <p className="eg-body" style={{ fontSize: 14, marginBottom: 16 }}>
                    {b2b ? "A free sample of your top prospects, with the reason and the record for each." : "Your score and your fastest wins in about 60 seconds."}
                  </p>
                  <Link href={cta.href} className="eg-btn primary" style={{ width: "100%", padding: "12px 16px", fontSize: 14.5 }}>{cta.midBtn}</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <FinalCta
          heading={b2b ? "See who's ready to buy in your market." : "See what's holding your site back."}
          body={b2b ? "Tell us what you sell and where. We build a free sample of your top prospects with the reason to call, the record and who decides for each." : "The free website audit shows where you stand on everything above, in about 60 seconds. No credit card, no call required."}
          primary={b2b ? undefined : { label: "Get your free website audit", href: "/free-tools" }}
        />
      </main>
      <Footer />
    </div>
  );
}
