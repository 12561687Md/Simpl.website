import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "../lib/blog";
import BlogHub from "./BlogHub";

export const metadata: Metadata = {
  title: "Simpl Blog | Answers for local businesses growing online",
  description:
    "Plain-English answers to the questions local service businesses actually ask about ranking on Google, getting reviews, AI search, and winning online.",
  alternates: { canonical: "https://simpl.pro/blog" },
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
                url: "https://simpl.pro/blog",
                blogPost: BLOG_POSTS.map((p) => ({
                  "@type": "BlogPosting",
                  headline: p.title,
                  url: `https://simpl.pro/blog/${p.slug}`,
                  image: `https://simpl.pro${p.image}`,
                  datePublished: p.updated,
                  dateModified: p.updated,
                })),
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://simpl.pro/blog" },
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
