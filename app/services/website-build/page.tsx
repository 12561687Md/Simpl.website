import type { Metadata } from "next";
import LocalServicePage, { type LocalServiceData } from "../../components/LocalServicePage";
import { pageMeta } from "../../lib/schema";

/* Primary keyword: "small business website design" (1,900/mo, KD 45).
   Secondary: contractor website design, website design for service businesses. */
const D: LocalServiceData = {
  path: "/services/website-build",
  crumb: "Websites",
  title: "Small Business Website Design That Wins Calls | Simpl",
  description:
    "Small business website design for service companies: fast, mobile-first, built to rank and to turn visits into calls. Scoped on a free call.",
  serviceName: "Small business website design",
  serviceType: "Website design and development",
  eyebrow: "Websites",
  h1: <>Small business website design, <em>built to turn visits into calls.</em></>,
  sub: "Not a template with your logo dropped in.",
  lead: "A site built around how your customers search, click and call: fast on a phone, findable on Google, with the quote form and the phone number exactly where they look. It is yours to keep, no matter what.",
  includesHeading: "Everything the rest of your marketing needs to work.",
  includes: [
    "Every page your business needs, not a five-page template",
    "Mobile-first, fast on a jobsite connection",
    "Schema markup and technical SEO from day one",
    "Click-to-call, quote forms and booking wired in",
    "Your reviews and real photos, not stock imagery",
    "Sitemap, indexing and crawlability handled",
  ],
  whyEyebrow: "What comes next",
  whyHeading: "A site is the foundation. Being found is what makes it pay.",
  whyBody:
    "The best site in your market still needs traffic. Once it's live, local SEO puts it in front of the people already searching for what you sell, and every service page we build gives Google one more search to show you for.",
  faqs: [
    {
      q: "How much does a small business website cost?",
      a: "It depends on the pages and features you need. We scope every build on a free call and give you a written quote. The site is yours to keep either way.",
    },
    {
      q: "Will a new website hurt my Google rankings?",
      a: "Not if it's done right. We keep your domain, redirect every old URL to its new home, keep the content that ranks, and resubmit the sitemap, so the rankings you earned carry over.",
    },
    {
      q: "Can I update the site myself?",
      a: "Most clients would rather text us the change and have it done. If you want to edit it yourself, we can set that up on request.",
    },
  ],
  related: [
    { href: "/services/local-seo", label: "Local SEO services", desc: "Get the new site into the Google Maps 3-pack." },
    { href: "/free-tools", label: "Free website audit", desc: "See what your current site is missing first." },
    { href: "/services/paid-ads", label: "PPC management", desc: "Send paid traffic to pages built to convert." },
  ],
};

export const metadata: Metadata = pageMeta({ path: D.path, title: D.title, description: D.description });

export default function Page() {
  return <LocalServicePage d={D} />;
}
