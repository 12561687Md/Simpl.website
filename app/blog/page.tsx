import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../lib/blog";
import BlogHub from "./BlogHub";

export const metadata: Metadata = {
  title: { absolute: "Simpl Blog: B2B Buying Signals, Sales Playbooks and Growth Guides" },
  description:
    "Plain-English answers for high-ticket B2B teams: sales trigger events, public-record prospecting, decision makers and follow-up, plus guides for websites, SEO and Google Business Profiles.",
  alternates: { canonical: "https://www.simpl.pro/blog" },
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
