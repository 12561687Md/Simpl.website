import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Reputation",
  description: "SIMPL monitors your Google reviews, Yelp ratings, social mentions, and online reputation. Respond to negative reviews before they cost you customers.",
  alternates: { canonical: "https://simpl.pro/reputation" },
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Coverage · Reputation"
      code="03 / REPUTATION"
      headline="What people say about you"
      accentTail="when you're not in the room."
      sub="SIMPL watches every review, mention, and sentiment shift across the platforms that matter — so you never get blindsided."
      watches={[
        { code: "01", title: "Review monitoring", desc: "Every new review across Google, Yelp, Facebook, and industry platforms. Flagged within minutes." },
        { code: "02", title: "Sentiment tracking", desc: "Are reviews getting more negative? SIMPL tracks the trend before your rating drops." },
        { code: "03", title: "Response cadence", desc: "How fast you respond to negative reviews — and whether you respond at all." },
        { code: "04", title: "Rating velocity", desc: "Are you getting fewer reviews than last quarter? Stalling means slipping." },
        { code: "05", title: "Competitor monitoring", desc: "When a competitor's rating passes yours, you need to know immediately." },
        { code: "06", title: "Mention tracking", desc: "Blog posts, forum threads, social mentions — conversations about your business you're not part of." },
      ]}
      miss={[
        "Three 1-star reviews land in a week. Nobody responds. Rating drops below 4.0. Calls decline 25%.",
        "A disgruntled employee posts a fake review. It sits unanswered for a month.",
        "A competitor launches a review campaign and passes your rating in the map pack.",
        "Your review velocity drops to zero for three months. Google notices before you do.",
        "A viral social post mentions your business negatively. You find out from a customer.",
        "Positive reviews stop because your automated review request email broke.",
      ]}
      findingBody="A roofing contractor's Google rating dropped from 4.7 to 4.1 over six weeks due to three unanswered negative reviews. SIMPL flagged the first review within 30 minutes."
      findingStat="30 min"
      findingLabel="from review to alert"
      related={[
        { href: "/discoverability", title: "Discoverability", blurb: "Indexing, profile health, map rank, schema." },
        { href: "/performance", title: "Performance", blurb: "Speed, uptime, broken forms, checkout." },
        { href: "/spend", title: "Spend", blurb: "Where your marketing dollars actually go." },
      ]}
    />
  );
}
