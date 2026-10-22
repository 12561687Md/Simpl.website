import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../lib/blog";
import BlogHub from "./BlogHub";

export const metadata: Metadata = {
  title: { absolute: "B2B Prospecting and Local SEO Guides | The Simpl Blog" },
  description:
    "Plain-English guides for B2B teams on buying signals, prospecting and follow-up, plus local SEO and website guides for service businesses.",
  alternates: { canonical: "https://www.simpl.pro/blog" },
  openGraph: { title: "B2B Prospecting and Local SEO Guides | The Simpl Blog", url: "https://www.simpl.pro/blog", type: "website", images: [{ url: "/brand/simpl-cover-1200x675.png", width: 1200, height: 675, alt: "The Simpl blog" }] },
};

export default function BlogIndex() {
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
                "@type": "Blog",
                name: "Simpl Blog",
                url: "https://www.simpl.pro/blog",
                blogPost: BLOG_POSTS.map((p) => ({
                  "@type": "BlogPosting",
                  headline: p.title,
                  url: `https://www.simpl.pro/blog/${p.slug}`,
                  image: `https://www.simpl.pro${p.image}`,
                  datePublished: p.updated,
                  dateModified: p.updated,
                })),
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.simpl.pro" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.simpl.pro/blog" },
                ],
              },
            ]),
          }}
        />
        <BlogHub posts={BLOG_POSTS} />
      </main>
      <Footer />
    </div>
  );
}
