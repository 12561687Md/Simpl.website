/**
 * Blog / AEO content, as structured data.
 *
 * These posts exist to answer the questions local service owners actually type
 * into Google, YouTube, and AI assistants — the AEO (Answer Engine Optimization)
 * play: be the clean, citable answer an LLM reaches for. So every post is built
 * as a real FAQ (rendered with FAQPage schema) plus prose, and every post links
 * out to reputable primary sources (Google's own docs, Wikipedia, official
 * tools). Outbound links to authorities are a trust signal to both search
 * engines and readers; we are not pretending to be the only source, we are being
 * the clearest one.
 *
 * Content rules that must hold for every post:
 *  - No fabricated statistics. If a number needs a citation, link the source.
 *  - No invented client results (docs/standards/TRUST_SIGNALS.md).
 *  - "win / winning" is the house verb; never "because AI does it".
 *  - Every external link points somewhere genuinely authoritative.
 */

export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogSection {
  heading: string;
  /** Paragraphs. `[text](https://...)` inline links are rendered as anchors. */
  paragraphs: string[];
}

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Under ~60 chars ideally; used as <title> and the card heading. */
  metaTitle: string;
  description: string;
  /** The single question this post is the answer to (the AEO target). */
  question: string;
  category: string;
  readMinutes: number;
  updated: string; // ISO date
  intro: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  sources: BlogLink[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-rank-higher-on-google-maps",
    title: "How to rank higher on Google Maps (the local 3-pack), explained",
    metaTitle: "How to Rank Higher on Google Maps",
    description:
      "A plain-English guide to ranking in Google's local 3-pack: what actually moves the needle for a local service business, and what's a waste of time.",
    question: "How do I rank higher on Google Maps?",
    category: "Local SEO",
    readMinutes: 6,
    updated: "2026-07-17",
    intro:
      "When someone searches “plumber near me,” Google shows three businesses in a map at the top. That's the local 3-pack, and for a local service business it's the single most valuable piece of real estate online. Here's what actually decides who lands there, in order of how much it matters.",
    sections: [
      {
        heading: "The three things Google is actually weighing",
        paragraphs: [
          "Google is public about this: local ranking comes down to relevance, distance, and prominence. [Google's own guidance](https://support.google.com/business/answer/7091) spells it out. Relevance is how well your profile matches the search. Distance is how close you are to the searcher. Prominence is how well-known and trusted you are, which is where reviews, links, and a complete profile come in.",
          "You can't move your building closer to every customer, so distance is mostly fixed. That leaves relevance and prominence, and those are almost entirely within your control.",
        ],
      },
      {
        heading: "Fix your Google Business Profile first",
        paragraphs: [
          "Your [Google Business Profile](https://www.google.com/business/) is the listing itself. A complete, accurate profile beats a sparse one every time. Fill in every field: exact business name, primary and secondary categories, service areas, hours, phone, and website. Add real photos, and keep them coming.",
          "The name field matters more than owners expect: it must match your real-world name, not stuffed with keywords. Google actively penalizes keyword stuffing here, and competitors can report it.",
        ],
      },
      {
        heading: "Reviews are prominence you can earn",
        paragraphs: [
          "Review count and rating are among the strongest prominence signals, and unlike your address, you can improve them starting today. Ask every satisfied customer, make it a one-tap link, and reply to every review — good and bad. Replies signal an active, real business.",
          "Consistency of your name, address, and phone number across the web (your “NAP”) also feeds prominence. If your address reads three different ways across your site, Facebook, and Yelp, that ambiguity costs you.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to rank in the Google 3-pack?",
        a: "For most local businesses, meaningful movement takes 1 to 3 months of consistent work: a complete profile, a steady flow of reviews, and matching information across the web. There's no instant switch, but the compounding is fast once it starts.",
      },
      {
        q: "Do I need a website to rank on Google Maps?",
        a: "You can appear without one, but a fast, relevant website is a major prominence and relevance signal, and it's where you convert the click into a call. Businesses with no website are almost always leaving the top spots to competitors who have one.",
      },
      {
        q: "Does paying for Google Ads help my Maps ranking?",
        a: "No. Paid ads and organic Maps ranking are separate systems. Ads can put you at the very top as a sponsored result, but they don't improve where you rank organically in the 3-pack.",
      },
    ],
    sources: [
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "Google Business Profile", href: "https://www.google.com/business/" },
      { label: "Local search (Wikipedia)", href: "https://en.wikipedia.org/wiki/Local_search_(Internet)" },
    ],
  },
  {
    slug: "why-is-my-website-not-showing-up-on-google",
    title: "Why is my website not showing up on Google? A checklist",
    metaTitle: "Why Isn't My Website on Google?",
    description:
      "If you can't find your own business on Google, one of a handful of things is usually wrong. Here's how to diagnose it, in order.",
    question: "Why is my website not showing up on Google?",
    category: "SEO",
    readMinutes: 5,
    updated: "2026-07-17",
    intro:
      "You built a website and you can't find it on Google. That's frustrating, and it's almost always one of a small number of fixable problems. Work through these in order.",
    sections: [
      {
        heading: "First, confirm Google has even seen it",
        paragraphs: [
          "Search Google for `site:yourdomain.com`. If nothing comes up, Google hasn't indexed your site yet. Set up [Google Search Console](https://search.google.com/search-console/about) (it's free), verify your site, and submit your sitemap. This is the single most important tool for understanding how Google sees you.",
          "A brand-new site can take days to weeks to be indexed. Search Console will tell you whether Google has crawled it and flag anything blocking it.",
        ],
      },
      {
        heading: "Check you're not accidentally blocking Google",
        paragraphs: [
          "A surprising number of sites launch with a “noindex” tag or a [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) file left over from development that tells search engines to stay out. If your developer built the site behind a “coming soon” setting, that block often ships to production.",
          "In Search Console, the URL Inspection tool tells you exactly whether a page is indexable and, if not, why.",
        ],
      },
      {
        heading: "Ranking is different from being indexed",
        paragraphs: [
          "Being in the index means Google knows you exist. Ranking on page one means Google thinks you're the best answer. If you're indexed but invisible, the issue is usually relevance and authority: thin content, no clear topic per page, missing title tags, or a brand-new domain with no track record.",
          "Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) is the authoritative, jargon-light primer on fixing this.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long until a new website shows up on Google?",
        a: "Anywhere from a few days to a few weeks to be indexed. Ranking well takes longer — typically months — and depends on your content, your site's speed, and your reputation.",
      },
      {
        q: "Why does my business show on Maps but not in regular search?",
        a: "Maps and web search are related but separate. Your Google Business Profile can rank in Maps while your website struggles in web results, usually because the website itself has SEO gaps the profile doesn't.",
      },
      {
        q: "Can I pay Google to index my site faster?",
        a: "No. Indexing is free and can't be bought. You can request indexing through Search Console, but you cannot pay to skip the line.",
      },
    ],
    sources: [
      { label: "Google Search Console", href: "https://search.google.com/search-console/about" },
      { label: "Google SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "robots.txt, explained by Google", href: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" },
    ],
  },
  {
    slug: "how-do-i-get-more-google-reviews",
    title: "How do I get more Google reviews (without breaking the rules)?",
    metaTitle: "How to Get More Google Reviews",
    description:
      "More reviews mean more trust and better local ranking. Here's how to earn them steadily without violating Google's policies.",
    question: "How do I get more Google reviews?",
    category: "Reputation",
    readMinutes: 4,
    updated: "2026-07-17",
    intro:
      "Reviews do two jobs at once: they convince the next customer to call, and they push you up in local search. The good news is that earning them is mostly about making it easy and asking at the right moment. The bad news is that a few tempting shortcuts will get you penalized.",
    sections: [
      {
        heading: "Make the ask one tap",
        paragraphs: [
          "Google gives every business a short review link. Get yours from your [Google Business Profile](https://support.google.com/business/answer/7035772) and put it everywhere: a text after the job, an email footer, a QR code on the invoice. Every extra step between “happy customer” and “review submitted” loses you reviews.",
          "Ask when satisfaction is highest — right after you've finished the work and they've said thank you. A day later, the moment has passed.",
        ],
      },
      {
        heading: "Never buy reviews or gate them",
        paragraphs: [
          "Buying reviews, posting them yourself, or only asking happy customers while filtering out unhappy ones all violate [Google's review policies](https://support.google.com/contributionpolicy/answer/7400114) and can get your reviews removed or your profile suspended. It's not worth it, and it's detectable.",
          "Reply to negative reviews calmly and publicly. A thoughtful reply to a one-star review often does more for the next reader than the review itself does damage.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it against the rules to offer a discount for a review?",
        a: "Yes. Google prohibits incentivizing reviews with discounts, gifts, or money. You can ask for an honest review; you cannot pay for one in any form.",
      },
      {
        q: "How many Google reviews do I need to rank well?",
        a: "There's no magic number. What matters is having more than your local competitors, a healthy average, and a steady stream of recent ones. Recency and consistency matter as much as total count.",
      },
      {
        q: "Should I reply to every review?",
        a: "Yes. Replying to reviews — positive and negative — signals an active business to both customers and Google, and it's one of the easiest trust signals to control.",
      },
    ],
    sources: [
      { label: "Google: Get your review link", href: "https://support.google.com/business/answer/7035772" },
      { label: "Google review content policy", href: "https://support.google.com/contributionpolicy/answer/7400114" },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
