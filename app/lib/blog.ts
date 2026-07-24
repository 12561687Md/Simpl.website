/**
 * Blog / AEO content, as structured data.
 *
 * These posts exist to answer the questions local service owners actually type
 * into Google, YouTube, and AI assistants, the AEO (Answer Engine Optimization)
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
  /** Real (photographed, not AI) hero image in /public/blog, 16:9 WebP. */
  image: string;
  imageAlt: string;
  /** Pexels photographer credit (license: free, attribution appreciated). */
  imageCredit: string;
  /** Answer-first "Key takeaways" box, 2-4 bullets an LLM can lift whole. */
  keyTakeaways: string[];
  /** The pillar/cornerstone post gets the hero slot on the hub. */
  featured?: boolean;
  intro: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  sources: BlogLink[];
}

/**
 * Content pillars (the cluster model). Order controls the hub's category
 * shelves and the filter bar. Every post's `category` must match a label here.
 */
export const BLOG_CATEGORIES: { label: string; slug: string; blurb: string }[] = [
  { label: "Industry Guides", slug: "industry-guides", blurb: "Marketing playbooks written for your trade, not for everyone." },
  { label: "Local SEO", slug: "local-seo", blurb: "Rank in Google Maps and the local 3-pack." },
  { label: "Paid Ads", slug: "paid-ads", blurb: "Google Ads, Local Services Ads, and what actually books jobs." },
  { label: "AI Search", slug: "ai-search", blurb: "Get recommended by ChatGPT, Gemini, and AI Overviews." },
  { label: "Reputation", slug: "reputation", blurb: "Reviews, ratings, and the trust that ranks you." },
  { label: "Lead Capture", slug: "lead-capture", blurb: "Turn the traffic you already have into booked jobs." },
  { label: "Strategy", slug: "strategy", blurb: "Budgets, follow-up systems, and how to grow on purpose." },
];

export function categorySlug(label: string): string {
  return BLOG_CATEGORIES.find((c) => c.label === label)?.slug ?? "local-seo";
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
    image: "/blog/how-to-rank-higher-on-google-maps.webp",
    imageAlt: "A person holding a phone open to Google Maps on a city street",
    imageCredit: "Theo Decker / Pexels",
    featured: true,
    keyTakeaways: [
      "Google ranks the local 3-pack on three things: relevance, distance, and prominence.",
      "Distance is mostly fixed, so a complete Google Business Profile and a steady stream of recent reviews are the two levers you actually control.",
      "Keyword-stuffing your business name is against the rules and reportable; consistent name, address, and phone across the web matters more.",
    ],
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
          "Review count and rating are among the strongest prominence signals, and unlike your address, you can improve them starting today. Ask every satisfied customer, make it a one-tap link, and reply to every review, good and bad. Replies signal an active, real business, and surveys like [BrightLocal's local consumer review survey](https://www.brightlocal.com/research/local-consumer-review-survey/) consistently show most customers read reviews before they call anyone.",
          "Consistency of your name, address, and phone number across the web (your “NAP”) also feeds prominence. If your address reads three different ways across your site, [Facebook](https://www.facebook.com/business), and [Yelp](https://www.yelp.com), that ambiguity costs you. The industry's long-running reference on what moves local rankings is [Moz's Local Search Ranking Factors](https://moz.com/local-search-ranking-factors), worth a skim if you want the deeper mechanics.",
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
      { label: "Moz: Local Search Ranking Factors", href: "https://moz.com/local-search-ranking-factors" },
      { label: "BrightLocal: Local Consumer Review Survey", href: "https://www.brightlocal.com/research/local-consumer-review-survey/" },
    ],
  },
  {
    slug: "why-is-my-website-not-showing-up-on-google",
    title: "Why is my website not showing up on Google? A checklist",
    metaTitle: "Why Isn't My Website on Google?",
    description:
      "If you can't find your own business on Google, one of a handful of things is usually wrong. Here's how to diagnose it, in order.",
    question: "Why is my website not showing up on Google?",
    category: "Local SEO",
    readMinutes: 5,
    updated: "2026-07-17",
    image: "/blog/why-is-my-website-not-showing-up-on-google.webp",
    imageAlt: "A laptop on a desk showing a search engine, hands typing",
    imageCredit: "cottonbro studio / Pexels",
    keyTakeaways: [
      "Search site:yourdomain.com first: no results means Google has not indexed you yet, not that you rank poorly.",
      "The usual culprits are a leftover noindex tag or robots.txt block from development, a brand-new domain, or thin content with no clear topic per page.",
      "Google Search Console is free and tells you exactly whether Google has crawled a page and why it is or is not indexed.",
    ],
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
          "Being in the index means Google knows you exist. Ranking on page one means Google thinks you're the best answer. If you're indexed but invisible, the issue is usually relevance and authority: thin content, no clear topic per page, missing title tags, or a brand-new domain with no track record. Google's own [How Search Works](https://www.google.com/search/howsearchworks/) explains the difference in plain language, and [search engine optimization](https://en.wikipedia.org/wiki/Search_engine_optimization) as a discipline is essentially the work of closing that gap.",
          "Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) is the authoritative, jargon-light primer on fixing this. Speed matters too: run your site through [PageSpeed Insights](https://pagespeed.web.dev/) (free, from Google) and you'll see the same performance data Google sees. And if you want to sanity-check advice against what practitioners actually argue about, the [r/SEO](https://www.reddit.com/r/SEO/) community on Reddit is where a lot of that conversation happens in public.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long until a new website shows up on Google?",
        a: "Anywhere from a few days to a few weeks to be indexed. Ranking well takes longer, typically months, and depends on your content, your site's speed, and your reputation.",
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
      { label: "Google: How Search Works", href: "https://www.google.com/search/howsearchworks/" },
      { label: "PageSpeed Insights", href: "https://pagespeed.web.dev/" },
      { label: "SEO (Wikipedia)", href: "https://en.wikipedia.org/wiki/Search_engine_optimization" },
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
    image: "/blog/how-do-i-get-more-google-reviews.webp",
    imageAlt: "A hand holding a phone showing a five-star rating",
    imageCredit: "Towfiqu barbhuiya / Pexels",
    keyTakeaways: [
      "Make the ask one tap: use your Google review link and send it right after the job, when satisfaction is highest.",
      "Never buy, gate, or fake reviews. It violates Google policy and the FTC's fake-review rule, and it is detectable.",
      "Reply to every review, good and bad. Owner responses are a ranking signal and reassure the next reader.",
    ],
    intro:
      "Reviews do two jobs at once: they convince the next customer to call, and they push you up in local search. The good news is that earning them is mostly about making it easy and asking at the right moment. The bad news is that a few tempting shortcuts will get you penalized.",
    sections: [
      {
        heading: "Make the ask one tap",
        paragraphs: [
          "Google gives every business a short review link. Get yours from your [Google Business Profile](https://support.google.com/business/answer/7035772) and put it everywhere: a text after the job, an email footer, a QR code on the invoice. Every extra step between “happy customer” and “review submitted” loses you reviews.",
          "Ask when satisfaction is highest, right after you've finished the work and they've said thank you. A day later, the moment has passed.",
        ],
      },
      {
        heading: "Never buy reviews or gate them",
        paragraphs: [
          "Buying reviews, posting them yourself, or only asking happy customers while filtering out unhappy ones all violate [Google's review policies](https://support.google.com/contributionpolicy/answer/7400114) and can get your reviews removed or your profile suspended. It's not just Google: the [FTC's rule banning fake reviews](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) makes buying or fabricating them a federal matter with real fines. It's not worth it, and it's detectable.",
          "Reply to negative reviews calmly and publicly. A thoughtful reply to a one-star review often does more for the next reader than the review itself does damage. Research roundups like [BrightLocal's consumer review survey](https://www.brightlocal.com/research/local-consumer-review-survey/) keep confirming the same pattern: customers read owner responses, and they judge the business by them.",
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
        a: "Yes. Replying to reviews, positive and negative, signals an active business to both customers and Google, and it's one of the easiest trust signals to control.",
      },
    ],
    sources: [
      { label: "Google: Get your review link", href: "https://support.google.com/business/answer/7035772" },
      { label: "Google review content policy", href: "https://support.google.com/contributionpolicy/answer/7400114" },
      { label: "FTC: Final rule banning fake reviews", href: "https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials" },
      { label: "BrightLocal: Local Consumer Review Survey", href: "https://www.brightlocal.com/research/local-consumer-review-survey/" },
    ],
  },
  {
    slug: "how-to-get-your-business-recommended-by-ai",
    title: "How to get your business recommended by ChatGPT and AI search",
    metaTitle: "How to Get Recommended by ChatGPT & AI Search",
    description:
      "AI assistants now answer \"who should I call\" questions directly. Here's what decides which local businesses they recommend, and how to become one of them.",
    question: "How do I get my business recommended by ChatGPT and AI search?",
    category: "AI Search",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/how-to-get-your-business-recommended-by-ai.webp",
    imageAlt: "A person using an AI assistant on a laptop",
    imageCredit: "Matheus Bertelli / Pexels",
    keyTakeaways: [
      "AI assistants recommend businesses they can read: structured data, complete listings, consistent details, and real reviews.",
      "You cannot pay for placement in AI answers. They pull from the open web, so machine-readability is the whole game.",
      "The same work that wins the Google local 3-pack wins AI recommendations, plus an llms.txt file and schema markup on every page.",
    ],
    intro:
      "A growing share of customers don't scroll results anymore, they ask ChatGPT, Gemini, or Google's AI Overviews \"who's the best remodeler near me\" and call whoever gets named. AI assistants don't take ads and don't have a submission form. They recommend the businesses they can read, verify, and trust. That part is within your control.",
    sections: [
      {
        heading: "AI recommends what it can read",
        paragraphs: [
          "Tools like [ChatGPT search](https://openai.com/index/introducing-chatgpt-search/) and Google's AI features build answers from the live web: your website, your Google Business Profile, your reviews, and directory listings. Google is explicit that there's no special trick for appearing in AI experiences, its [guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features) is the same as for search: clear pages, structured data, and genuinely useful content.",
          "That's why an incomplete profile or a thin website hurts twice now. A human might still call you from a half-filled listing. An AI assistant simply recommends the competitor whose information is complete, consistent, and machine-readable.",
        ],
      },
      {
        heading: "Structured data is how machines understand you",
        paragraphs: [
          "[Structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) (schema markup, from [schema.org](https://schema.org)) labels your pages so software knows your business name, services, service area, hours, and reviews without guessing. Most local service sites have none, which means every machine reading them is guessing.",
          "The newer piece is [llms.txt](https://llmstxt.org), a plain-text file that gives AI systems a clean summary of who you are and what you do. It's early, it costs nothing, and the businesses that adopt machine-readability first tend to be the ones AI names first.",
        ],
      },
      {
        heading: "Reviews are the trust layer AI leans on",
        paragraphs: [
          "When an assistant has to pick three names out of thirty, review count, rating, recency, and owner responses are the strongest public trust signals it can check. The same things that win the [local 3-pack](https://support.google.com/business/answer/7091) win AI recommendations, because AI reads the same evidence a careful customer would.",
          "Community mentions count too. [Large language models](https://en.wikipedia.org/wiki/Large_language_model) are trained on and search across the open discussion web, which is why [Reddit](https://www.reddit.com/r/smallbusiness/) threads and [Nextdoor](https://nextdoor.com) recommendations increasingly show up inside AI answers. A business that neighbors genuinely vouch for in public is one an assistant can safely name.",
          "So the play isn't chasing a new algorithm. It's making your existing presence legible: complete profile, consistent name-address-phone everywhere, structured data on every page, and a steady stream of real reviews. Businesses that do that show up in both worlds, and the ones that don't quietly disappear from AI answers without ever knowing it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I pay to be recommended by ChatGPT or Google's AI Overviews?",
        a: "No. AI assistants don't sell placement in their organic answers. They recommend businesses based on what the open web says: your site, your listings, your reviews, and how machine-readable all of it is.",
      },
      {
        q: "Does my Google Business Profile affect AI recommendations?",
        a: "Yes, heavily. Assistants lean on the same public data Google Maps exposes: categories, services, hours, photos, reviews, and owner activity. A complete, active profile is the single fastest way to become recommendable.",
      },
      {
        q: "What is llms.txt and do I need one?",
        a: "It's a plain-text file on your website that summarizes your business for AI systems, similar in spirit to robots.txt. It's optional and new, but it costs nothing and makes you easier to cite accurately.",
      },
      {
        q: "How do I know if AI can even see my website?",
        a: "Check whether your robots.txt blocks AI crawlers, whether your pages have structured data, and whether your key information exists as text rather than only images. A presence scan surfaces all three in one pass.",
      },
    ],
    sources: [
      { label: "OpenAI: Introducing ChatGPT search", href: "https://openai.com/index/introducing-chatgpt-search/" },
      { label: "Google: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
      { label: "Google: Intro to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "llmstxt.org", href: "https://llmstxt.org" },
      { label: "Large language model (Wikipedia)", href: "https://en.wikipedia.org/wiki/Large_language_model" },
      { label: "r/smallbusiness on Reddit", href: "https://www.reddit.com/r/smallbusiness/" },
    ],
  },
  {
    slug: "how-long-does-local-seo-take",
    title: "How long does local SEO take to work? An honest timeline",
    metaTitle: "How Long Does Local SEO Take to Work?",
    description:
      "Some fixes move your visibility in days, others compound for months. An honest breakdown of what happens when in local SEO, and what to measure while you wait.",
    question: "How long does local SEO take to work?",
    category: "Local SEO",
    readMinutes: 4,
    updated: "2026-07-23",
    image: "/blog/how-long-does-local-seo-take.webp",
    imageAlt: "A laptop showing a rising analytics chart on a desk",
    imageCredit: "RDNE Stock project / Pexels",
    keyTakeaways: [
      "Local SEO is several clocks at once: broken technical issues fix in days, profile and review gains land in weeks, competitive rankings compound over months.",
      "Google itself says most SEO takes four months to a year, and independent studies of millions of pages agree.",
      "Track Search Console impressions as your leading indicator: they climb before clicks, and clicks climb before calls.",
    ],
    intro:
      "Anyone who promises a #1 ranking in two weeks is lying to you, and anyone who says \"SEO takes a year\" is hiding the fast wins. The honest answer is that local SEO is several different clocks running at once. Here's what actually happens in days, weeks, and months, so you know whether the work is working.",
    sections: [
      {
        heading: "Days: the broken things",
        paragraphs: [
          "Technical problems have technical timelines. An unclaimed Google Business Profile, a site blocking crawlers in robots.txt, a broken contact form, missing titles: these are found in an afternoon and fixed within days, and their effect is immediate because they were actively costing you calls.",
          "This is why a diagnosis matters more than a package. If your form has been silently failing, no amount of content writing fixes the actual leak.",
        ],
      },
      {
        heading: "Weeks: profile activity and reviews",
        paragraphs: [
          "Google's local ranking runs on [relevance, distance, and prominence](https://support.google.com/business/answer/7091). Completing your profile, adding services and photos, and building a steady review stream moves prominence within weeks, especially in markets where competitors are inactive.",
          "Recency matters here: five new reviews this month beat fifty old ones from 2022. Consistent activity signals a business that's alive, to Google and to the customer reading it.",
        ],
      },
      {
        heading: "Months: content and authority compound",
        paragraphs: [
          "Rankings for competitive service keywords are earned by content and authority, and Google itself tells business owners that most SEO needs [four months to a year](https://www.youtube.com/watch?v=piSvFxV_M04) before it helps. Independent research agrees: [Ahrefs' study of two million pages](https://ahrefs.com/blog/how-long-does-it-take-to-rank/) found the average top-10 page is years old, and only a small fraction of new pages crack the top 10 within a year. That's not a stall, it's how compounding works: service pages, location pages, and answers to real customer questions accumulate value instead of expiring like an ad.",
          "Track leading indicators while you wait. [Google Search Console](https://search.google.com/search-console/about) shows impressions climbing before clicks do, and clicks climb before calls. If impressions haven't moved in three months, ask why. If they're climbing, the compounding is on schedule.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does SEO take longer than paid ads?",
        a: "Ads buy the top spot for exactly as long as you pay. SEO earns a position that keeps producing after the work is done. Ads are rent, rankings are equity, and equity takes longer to build.",
      },
      {
        q: "Can any agency guarantee a #1 ranking on Google?",
        a: "No. Google says directly that nobody can guarantee a #1 ranking, and treats the claim as a red flag when hiring an SEO. What can be guaranteed is measurable progress: score, impressions, rankings tracked honestly.",
      },
      {
        q: "What should I measure in the first 90 days?",
        a: "Profile completeness, review count and recency, Search Console impressions, and calls. Those four move in that order. Revenue from SEO usually lags the work by a quarter, the leading indicators tell you it's coming.",
      },
    ],
    sources: [
      { label: "Google: How to hire an SEO (timeline quote)", href: "https://www.youtube.com/watch?v=piSvFxV_M04" },
      { label: "Google: Local ranking factors", href: "https://support.google.com/business/answer/7091" },
      { label: "Google Search Console", href: "https://search.google.com/search-console/about" },
      { label: "Ahrefs: How long does it take to rank?", href: "https://ahrefs.com/blog/how-long-does-it-take-to-rank/" },
      { label: "Moz: Local Search Ranking Factors", href: "https://moz.com/local-search-ranking-factors" },
    ],
  },
  {
    slug: "what-happens-when-you-miss-a-customer-call",
    title: "What a missed call actually costs a service business",
    metaTitle: "What a Missed Call Costs a Service Business",
    description:
      "When a customer's call goes unanswered, they don't leave a voicemail, they call the next company on the list. What the research says about speed, and how to stop the leak.",
    question: "What happens when a customer's call to my business goes unanswered?",
    category: "Lead Capture",
    readMinutes: 4,
    updated: "2026-07-23",
    image: "/blog/what-happens-when-you-miss-a-customer-call.webp",
    imageAlt: "A tradesperson working on a job while a phone goes unanswered",
    imageCredit: "RDNE Stock project / Pexels",
    keyTakeaways: [
      "A missed call rarely becomes a voicemail. The customer just dials the next business on the list.",
      "Harvard Business Review found responding within an hour makes a lead nearly seven times likelier to qualify, and most companies respond far too slowly.",
      "The fix is a missed-call text-back: an instant automatic text keeps the lead warm so you can reply when your hands are free.",
    ],
    intro:
      "You paid for the website, the listing, and maybe the ads. The phone rings while you're on a ladder, in a crawlspace, or mid-quote with another customer. It goes to voicemail. Most of the time, that lead is gone: not because your work isn't good, but because a competitor answered and you didn't. This is the most expensive leak in local business marketing, and the least talked about.",
    sections: [
      {
        heading: "Speed decides who wins the job",
        paragraphs: [
          "Research published in [Harvard Business Review](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) found that companies who tried to contact leads within an hour were nearly seven times likelier to qualify them than those who waited even an hour longer, and most companies didn't respond anywhere near that fast. A customer with a burst pipe or a dead AC isn't waiting for a callback tomorrow, they're dialing the next result.",
          "The uncomfortable math: winning the search ranking and losing the call means you paid to generate a lead for your competitor.",
        ],
      },
      {
        heading: "The fix isn't answering every call, it's responding to every call",
        paragraphs: [
          "Nobody running a crew can answer every ring, and hiring a receptionist for a two-person operation rarely pens out. The practical fix is a missed-call text-back: when a call goes unanswered, the caller instantly gets a text (\"Sorry we missed you, we're on a job. What do you need? We'll reply in minutes.\"). The lead stays warm because the customer got a response, which is what they actually wanted.",
          "Pair it with instant quoting for simple jobs and a follow-up sequence for the ones that go quiet, and the phone stops being a single point of failure. The businesses winning local markets aren't the ones answering more calls, they're the ones leaking fewer leads.",
        ],
      },
      {
        heading: "Find out how many calls you're actually missing",
        paragraphs: [
          "Most owners genuinely don't know their missed-call rate. Your phone system or [Google Business Profile call history](https://support.google.com/business/answer/9688285) can show how many calls came from your listing, compare that with what you remember answering and the gap is usually a surprise.",
          "You don't have to take a marketer's word for any of this. Communities like [r/sweatystartup](https://www.reddit.com/r/sweatystartup/) and [r/smallbusiness](https://www.reddit.com/r/smallbusiness/), where local service owners compare notes in public, are full of the same story told firsthand: the jobs that got away were the calls nobody answered. Fixing visibility fills the top of the funnel, fixing response seals the bottom. Doing the first without the second is how a business ends up busy on Google and quiet at the bank.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a missed-call text-back?",
        a: "An automation that instantly texts anyone whose call you didn't answer, so the lead gets a response in seconds instead of a voicemail. The customer feels handled, and you reply when your hands are free.",
      },
      {
        q: "Do customers actually leave voicemails anymore?",
        a: "Rarely, and waiting for one is the losing move. A caller who reached voicemail is a caller still holding their phone with your competitors on the screen. A text lands before they finish dialing the next number.",
      },
      {
        q: "How fast should a business respond to a new lead?",
        a: "Within minutes. The Harvard Business Review study found qualification odds fall dramatically within the first hour, and most companies respond far too slowly. Speed is the cheapest competitive advantage available to a local business.",
      },
    ],
    sources: [
      { label: "Harvard Business Review: The Short Life of Online Sales Leads", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
      { label: "Google: Call history in Business Profile", href: "https://support.google.com/business/answer/9688285" },
      { label: "r/sweatystartup on Reddit", href: "https://www.reddit.com/r/sweatystartup/" },
    ],
  },

  // ---- Industry Guides (trade-specific playbooks) ----
  {
    slug: "how-to-get-more-plumbing-leads",
    title: "How to get more plumbing leads (without buying them from lead resellers)",
    metaTitle: "How to Get More Plumbing Leads",
    description:
      "A plumber's guide to generating your own leads online: local SEO, Google's Local Services Ads, reviews, and answering the phone so emergency calls become booked jobs.",
    question: "How do I get more plumbing leads?",
    category: "Industry Guides",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/how-to-get-more-plumbing-leads.webp",
    imageAlt: "A plumber working on pipes under a sink",
    imageCredit: "Anıl Karakaya / Pexels",
    keyTakeaways: [
      "Plumbing is emergency-driven, so the businesses that win the Google Maps 3-pack and answer the phone fastest get the job, not the ones with the prettiest website.",
      "Google's Local Services Ads put you above the regular ads with a “Google Guaranteed” badge and you pay per lead, not per click, which fits plumbing's high job value.",
      "Reviews and speed-to-lead beat ad budget: a missed emergency call is a customer already dialing the next plumber.",
    ],
    intro:
      "Buying shared leads from a reseller means paying for a customer who also just got sold to three of your competitors. The plumbers who stop renting leads and start generating their own win on two things: showing up first when someone's water heater fails, and answering when that person calls. Here's how to build that.",
    sections: [
      {
        heading: "Win the map pack, because plumbing is “near me” by default",
        paragraphs: [
          "Almost nobody plans a plumber in advance. They search “plumber near me” or “emergency plumber [city]” with water on the floor, and they call one of the three businesses in the [Google Maps 3-pack](/blog/how-to-rank-higher-on-google-maps). If you're not in it, you're invisible for the searches that matter most.",
          "The levers are the same ones Google names for [local ranking](https://support.google.com/business/answer/7091): a complete Google Business Profile with the right primary category (Plumber), your real service area, and a steady flow of recent reviews. Our [local SEO service](/services/local-seo) exists to win exactly this, but the profile work you can start today.",
        ],
      },
      {
        heading: "Use Local Services Ads, they fit plumbing's economics",
        paragraphs: [
          "[Google's Local Services Ads](https://support.google.com/localservices/answer/6224841) (LSAs) sit at the very top of the results with a “Google Guaranteed” badge, and you're charged per lead, not per click. For a trade where a single job can be worth hundreds or thousands of dollars, paying per qualified call is far better math than paying for clicks that may never phone.",
          "LSAs require a background check and license verification, which is a moat: it keeps the low-effort competition out. Pair them with a small branded-search campaign so a competitor can't buy an ad on your own company name. That's the core of our [paid ads service](/services/paid-ads).",
        ],
      },
      {
        heading: "Answer the phone, or the lead is already gone",
        paragraphs: [
          "This is the one most plumbers lose on. You're under a house or on a roof when the phone rings, it goes to voicemail, and that customer never leaves one, they just call the next result. We wrote a whole piece on [what a missed call actually costs](/blog/what-happens-when-you-miss-a-customer-call), and for emergency trades it's brutal.",
          "The fix is not hiring a receptionist, it's a missed-call text-back that instantly replies “Sorry we missed you, we're on a job, what's going on?” so the lead stays warm. Plumbers compare notes on this constantly over in [r/Plumbing](https://www.reddit.com/r/Plumbing/); the ones booking out weeks ahead almost always have fast follow-up wired in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Local Services Ads worth it for plumbers?",
        a: "For most plumbers, yes. You pay per lead instead of per click, you appear above the regular ads with a Google Guaranteed badge, and the license and background check requirements keep low-quality competitors out. Given plumbing's high job value, one booked job usually covers many leads.",
      },
      {
        q: "How do I get more plumbing reviews?",
        a: "Text every customer your Google review link the moment the job is done and the water is running again. Recency and volume both matter for ranking, and plumbing customers are often relieved and happy to leave one if you make it a single tap. Never buy reviews, it violates Google policy and is detectable.",
      },
      {
        q: "Do I still need a website if I have a Google Business Profile?",
        a: "Yes. Your profile gets you found, but your website is where you convert the click, show your service area and pricing approach, and rank for service pages like water heater or drain cleaning. A profile without a fast, findable site leaves the higher-intent searches to competitors.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "r/Plumbing on Reddit", href: "https://www.reddit.com/r/Plumbing/" },
    ],
  },
  {
    slug: "seo-for-landscapers",
    title: "SEO for landscapers: how to rank for local lawn care and design searches",
    metaTitle: "SEO for Landscapers",
    description:
      "A landscaper's guide to ranking on Google: service pages for lawn care, hardscaping, and design, a strong Google Business Profile, seasonal content, and before/after proof.",
    question: "How do I do SEO for a landscaping business?",
    category: "Industry Guides",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/seo-for-landscapers.webp",
    imageAlt: "A landscaper mowing a healthy green lawn",
    imageCredit: "Makesavanh Oudthalith / Pexels",
    keyTakeaways: [
      "Landscaping searches split into distinct services (lawn care, hardscaping, design, irrigation), so one page per service beats a single “services” page for ranking.",
      "Before/after photos are the strongest proof a landscaper has, and they double as fresh content Google and customers both reward.",
      "Seasonality is an SEO advantage: publish for spring cleanups, fall leaf removal, and winter planning before the searches spike, not during.",
    ],
    intro:
      "Landscaping is a visual, seasonal, high-ticket business, and its search demand is bigger and more varied than most owners realize. Someone searching “paver patio installer” is a different customer with a different budget than someone searching “weekly lawn mowing.” Ranking well means building a site that speaks to each of them, and a profile that proves you're local and real.",
    sections: [
      {
        heading: "Build a page per service, not one “services” page",
        paragraphs: [
          "Google ranks pages, not businesses. A single page listing “lawn care, landscaping, hardscaping, irrigation” ranks for none of them well. A dedicated page for each, targeting how customers actually search (“paver patio [city],” “lawn fertilization program [city]”), is how you show up across the full range of jobs, including the high-margin design and hardscape work.",
          "This is the compounding side of [long-term organic growth](/services/organic-growth): each service and location page you publish keeps earning traffic for years. Interlink them so a lawn-care visitor discovers you also do drainage and lighting.",
        ],
      },
      {
        heading: "Your Google Business Profile is half the battle",
        paragraphs: [
          "For local service searches, your [Google Business Profile](https://support.google.com/business/answer/7091) often outranks your website in the map pack, which is prime real estate. Set the primary category correctly (Landscaper, Lawn care service), define your service area, and post recent project photos regularly, Google favors active listings.",
          "Reviews are a top ranking factor and landscaping customers love to brag about a transformed yard. Make [asking for reviews](/blog/how-do-i-get-more-google-reviews) part of closing every job. Owners trade what's working in [r/landscaping](https://www.reddit.com/r/landscaping/), and consistent review-getting comes up every time.",
        ],
      },
      {
        heading: "Turn before/after photos into ranking fuel",
        paragraphs: [
          "A gallery of finished projects is the single strongest thing a landscaper can show, and it's also content. Real photos with descriptive alt text and captions (“retaining wall and paver patio in [neighborhood]”) feed both customers and search engines, and increasingly [AI search](/blog/how-to-get-your-business-recommended-by-ai), which leans on visual and structured signals.",
          "Plan content around the calendar. Publish spring-cleanup and lawn-program pages in late winter, fall-cleanup pages in late summer. Ranking takes time (here's [how long local SEO actually takes](/blog/how-long-does-local-seo-take)), so the content needs to be live before the seasonal search spike, not during it.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I market a landscaping business in the off-season?",
        a: "Use winter to publish and rank the content that pays off in spring: service pages, seasonal guides, and project galleries. Run a light retargeting or email campaign to past customers for early-bird spring bookings, and get your Google Business Profile and reviews in order before demand returns.",
      },
      {
        q: "What's the most important service page for a landscaper?",
        a: "It depends on your margins, but recurring-revenue services like lawn care and fertilization programs, plus high-ticket hardscaping and design, usually deserve their own dedicated, well-optimized pages first. Lead with whatever combination of recurring revenue and high margin fits your business.",
      },
      {
        q: "Do landscapers need Google Ads or just SEO?",
        a: "SEO builds compounding, lower-cost leads over months; ads turn demand on instantly. Most landscapers benefit from SEO as the long-term foundation and seasonal ads to capture spring and fall spikes. The two feed each other: ad data shows which services to build content around.",
      },
    ],
    sources: [
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "Google: How Search Works", href: "https://www.google.com/search/howsearchworks/" },
      { label: "r/landscaping on Reddit", href: "https://www.reddit.com/r/landscaping/" },
    ],
  },
  {
    slug: "google-ads-for-remodelers",
    title: "Google Ads for remodelers: what actually books kitchen and bath jobs",
    metaTitle: "Google Ads for Remodelers",
    description:
      "A remodeling contractor's guide to Google Ads: high-intent keywords, why landing pages matter more than the ad, tracking real jobs not clicks, and defending your brand.",
    question: "How do remodelers use Google Ads to get more jobs?",
    category: "Industry Guides",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/google-ads-for-remodelers.webp",
    imageAlt: "A kitchen renovation in progress with contractor tools",
    imageCredit: "Francesco Ungaro / Pexels",
    keyTakeaways: [
      "Remodeling has long sales cycles and high job values, so a single booked kitchen or bath can pay for months of ad spend, which changes the math on what a lead is worth.",
      "The landing page books the job, not the ad: send clicks to a dedicated service page with real project photos and a quote form, never your homepage.",
      "Track booked consultations and jobs, not clicks, or you'll optimize for cheap traffic that never converts.",
    ],
    intro:
      "Remodeling is the opposite of an emergency trade. Nobody rebuilds a kitchen on impulse, so your ads compete for people early in a long, expensive decision. That means the goal isn't a click, it's a booked in-home consultation. Here's how remodelers run Google Ads that actually fill the calendar.",
    sections: [
      {
        heading: "Bid on high-intent keywords, skip the browsers",
        paragraphs: [
          "“Kitchen remodel contractor [city]” and “bathroom renovation near me” are buying searches. “Kitchen design ideas” is a browser who may be years out. Remodelers waste budget bidding on inspiration terms; the money is in the service-plus-location phrases from people ready to hire.",
          "Because remodeling job values are high, you can afford a higher cost per lead than most trades, which is exactly why competitors are aggressive here. A branded-search campaign that defends your own company name is cheap insurance, we cover why in our [paid ads service](/services/paid-ads).",
        ],
      },
      {
        heading: "The landing page does the selling",
        paragraphs: [
          "The most common remodeler mistake is pointing ads at the homepage. A click on a “bathroom remodel” ad should land on a bathroom-remodel page with real before/after photos, your license and reviews, and one clear quote form. Every extra step or unanswered question is a lost consultation.",
          "This is where your [website](/services/website-build) and your ads have to work as one system. A great ad pointed at a weak page just pays Google to prove your site can't convert. Fix the [technical leaks](/blog/why-is-my-website-not-showing-up-on-google) first, then send paid traffic to it.",
        ],
      },
      {
        heading: "Measure jobs, not clicks",
        paragraphs: [
          "With a long sales cycle, vanity metrics lie. A campaign with cheap clicks and zero booked consultations is a failure that looks fine on a dashboard. Set up conversion tracking for form submissions and calls, then judge the campaign on booked consultations and signed jobs.",
          "Speed still matters even here: a remodeling lead who fills out a form at 9pm and hears nothing until Tuesday has already called two competitors. Pair ads with [fast lead follow-up](/blog/what-happens-when-you-miss-a-customer-call). Contractors debate ad ROI constantly in [r/Construction](https://www.reddit.com/r/Construction/); the winners all track to revenue, not clicks.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much should a remodeler spend on Google Ads?",
        a: "There's no universal number, it depends on your market and margins, and it's exactly what a first strategy call is for. Because a single kitchen or bath job is worth thousands, remodelers can usually justify a higher cost per lead than most trades, but only if you track spend to booked jobs, not clicks.",
      },
      {
        q: "Should remodelers use Google Ads or SEO?",
        a: "Both, in sequence. Ads book jobs now while your SEO is still maturing, and the ad data reveals which services and keywords to build content around. Over time, organic rankings lower your blended cost per lead so you rely less on paid.",
      },
      {
        q: "Why are my remodeling ads getting clicks but no calls?",
        a: "Almost always the landing page or the follow-up. If ads point at your homepage instead of a specific service page, or if form leads aren't contacted within minutes, you'll get traffic that never converts. Fix the page and the speed-to-lead before increasing budget.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google Search Console", href: "https://search.google.com/search-console/about" },
      { label: "r/Construction on Reddit", href: "https://www.reddit.com/r/Construction/" },
    ],
  },
  {
    slug: "how-to-market-a-car-detailing-business",
    title: "How to market a car detailing business and stay booked out",
    metaTitle: "How to Market a Car Detailing Business",
    description:
      "A detailer's marketing guide: winning local search, using before/after photos and short video, getting reviews, and turning one-time washes into recurring plans.",
    question: "How do I market my car detailing business?",
    category: "Industry Guides",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/how-to-market-a-car-detailing-business.webp",
    imageAlt: "A detailer polishing a car to a high shine",
    imageCredit: "Luke Miller / Pexels",
    keyTakeaways: [
      "Detailing is intensely visual, so before/after photos and short video are your best-performing marketing on every channel, including Google and social.",
      "Most detailers compete locally on Google Maps and Instagram, so a strong Google Business Profile plus a steady review flow beats a fancy website.",
      "The real profit is recurring: turning one-time details into monthly maintenance plans lifts lifetime value far more than chasing new one-off jobs.",
    ],
    intro:
      "Car detailing sells on transformation, a filthy interior made showroom-clean, swirl marks erased from paint. That makes it one of the easiest trades to market visually and one of the easiest to under-price if all you ever sell is the one-time job. Here's how to get found locally and build recurring revenue.",
    sections: [
      {
        heading: "Get found where people search: Maps and Instagram",
        paragraphs: [
          "Detailing customers search “car detailing near me” and “mobile detailing [city],” then judge you on photos and reviews. A complete [Google Business Profile](https://support.google.com/business/answer/7091) with the right category, service area, and fresh photos gets you into the [local 3-pack](/blog/how-to-rank-higher-on-google-maps) where those searches land.",
          "Instagram and TikTok are effectively a second search engine for detailing, short before/after clips travel. But social proof only converts if the booking path is frictionless, so wire a clear “book now” into your [website](/services/website-build) and profile.",
        ],
      },
      {
        heading: "Let the work sell itself, then ask for the review",
        paragraphs: [
          "Every job is content. Shoot a consistent before/after of each car and post it. This feeds your profile, your social, and increasingly [AI-driven recommendations](/blog/how-to-get-your-business-recommended-by-ai), which lean on real reviews and consistent listings.",
          "Then ask for the review while the customer is standing next to their transformed car, that's peak satisfaction. Make it one tap with your Google review link. Our full method is in [how to get more Google reviews](/blog/how-do-i-get-more-google-reviews), and detailers swap tactics daily in [r/AutoDetailing](https://www.reddit.com/r/AutoDetailing/).",
        ],
      },
      {
        heading: "Sell plans, not just washes",
        paragraphs: [
          "A one-time detail is a transaction; a monthly maintenance plan is a business. Packaging recurring interior/exterior upkeep, ceramic-coating maintenance, or fleet accounts turns unpredictable one-off jobs into predictable monthly revenue and raises each customer's lifetime value.",
          "Recurring customers also need fast, reliable communication for scheduling. A simple [automated follow-up and reminder system](/blog/automated-lead-follow-up-for-service-businesses) keeps the calendar full without you chasing every booking by hand.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Instagram or Google better for a detailing business?",
        a: "You need both, and they do different jobs. Google captures high-intent “near me” searches from people ready to book, while Instagram and TikTok build brand and show off transformations that drive discovery and referrals. Feed both with the same before/after content.",
      },
      {
        q: "How do detailers get more repeat customers?",
        a: "Sell maintenance plans and stay in touch. Package recurring upkeep into a monthly membership, then use automated reminders so cars come back on a schedule. Recurring revenue smooths out the seasonality and is worth far more than a stream of one-time jobs.",
      },
      {
        q: "Do mobile detailers need a website?",
        a: "Yes. Even if most bookings start on Google or Instagram, a fast site with your service area, packages, and an easy booking form converts higher and helps you rank for local searches your profile alone can't reach.",
      },
    ],
    sources: [
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "Google Business Profile", href: "https://www.google.com/business/" },
      { label: "r/AutoDetailing on Reddit", href: "https://www.reddit.com/r/AutoDetailing/" },
    ],
  },
  {
    slug: "local-seo-for-auto-body-shops",
    title: "Local SEO for auto body shops: how to get found after a collision",
    metaTitle: "Local SEO for Auto Body Shops",
    description:
      "An auto body shop's guide to local SEO: ranking for collision and repair searches, managing reviews and insurance trust signals, and building service and location pages.",
    question: "How do auto body shops improve local SEO?",
    category: "Industry Guides",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/local-seo-for-auto-body-shops.webp",
    imageAlt: "A technician working in an auto body repair shop",
    imageCredit: "Jose Ricardo Barraza Morachis / Pexels",
    keyTakeaways: [
      "After a collision, people search “auto body shop near me” under stress and pick from the map pack, so ranking there is the whole game.",
      "Trust signals matter more here than in most trades: reviews, certifications, and “works with your insurance” language reassure an anxious customer.",
      "Dedicated pages for collision repair, dent removal, paint, and each city you serve beat one generic services page.",
    ],
    intro:
      "Auto body is a distress-purchase business. A customer just had an accident, they're dealing with insurance, and they want a shop they can trust, fast. That means your job is to show up in local search at that moment and immediately look credible. Here's how to do both.",
    sections: [
      {
        heading: "Own the map pack for collision searches",
        paragraphs: [
          "The searches that matter, “auto body shop near me,” “collision repair [city],” “bumper repair,” are resolved in the [Google Maps 3-pack](/blog/how-to-rank-higher-on-google-maps). Google weighs [relevance, distance, and prominence](https://support.google.com/business/answer/7091), so a complete profile with the right category (Auto body shop), accurate hours, and steady recent reviews is the foundation.",
          "If you're not showing up at all, work through [why a business doesn't appear on Google](/blog/why-is-my-website-not-showing-up-on-google) first, an unclaimed profile or a site blocking crawlers will sink you before rankings even matter.",
        ],
      },
      {
        heading: "Lead with trust, because the customer is stressed",
        paragraphs: [
          "Body shops win on reassurance. Reviews are the biggest lever, a shop with 150 recent four- and five-star reviews reads as safe. Make [review-gathering](/blog/how-do-i-get-more-google-reviews) routine at pickup, and reply to every one, especially the tough ones.",
          "Beyond reviews, display manufacturer certifications, warranties, and clear “we work directly with your insurance” language. These are trust signals a nervous customer scans for, and they belong on your [website](/services/website-build) and profile both.",
        ],
      },
      {
        heading: "Build pages for services and the towns you serve",
        paragraphs: [
          "One “services” page can't rank for everything. Separate pages for collision repair, dent and scratch repair, auto painting, and frame work, each targeting how customers search, capture far more traffic. Add a page per city or town in your service area with genuinely local content.",
          "This service-times-location grid is a core [organic growth](/services/organic-growth) play and it compounds. Shop owners compare local-marketing notes in [r/AutoBodyRepair](https://www.reddit.com/r/AutoBodyRepair/); the recurring theme is that reviews plus a real website beat any lead-buying service.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do auto body shops get more Google reviews?",
        a: "Ask at pickup, when the customer is relieved to have their car back, and hand them a one-tap Google review link by text. Recency and volume both drive ranking, and for a trust-heavy purchase like collision repair, a steady stream of recent reviews is your strongest marketing asset.",
      },
      {
        q: "Should auto body shops buy leads from third-party services?",
        a: "Owning your own local search presence is almost always cheaper and higher-quality long term. Bought leads are often shared with competitors and dry up when you stop paying. Ranking your profile and website builds an asset that keeps producing.",
      },
      {
        q: "Does my shop need separate pages for each service?",
        a: "Yes. Google ranks individual pages, so a dedicated collision-repair page and a dedicated auto-painting page can each rank for their own searches, while one combined services page ranks weakly for all of them.",
      },
    ],
    sources: [
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "Google: How Search Works", href: "https://www.google.com/search/howsearchworks/" },
      { label: "r/AutoBodyRepair on Reddit", href: "https://www.reddit.com/r/AutoBodyRepair/" },
    ],
  },
  {
    slug: "how-to-get-more-hvac-leads",
    title: "How to get more HVAC leads online, in season and out",
    metaTitle: "How to Get More HVAC Leads",
    description:
      "An HVAC contractor's guide to generating leads: Local Services Ads for emergency calls, local SEO, maintenance-plan marketing, and fast follow-up that beats the competition.",
    question: "How do HVAC companies get more leads?",
    category: "Industry Guides",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/how-to-get-more-hvac-leads.webp",
    imageAlt: "An HVAC technician servicing an air conditioning unit",
    imageCredit: "Richard Low Hong / Pexels",
    keyTakeaways: [
      "HVAC demand spikes with the weather, so Local Services Ads and map-pack visibility capture the emergency “no heat / no AC” calls that convert instantly.",
      "Maintenance plans are the antidote to seasonality: they smooth revenue across the year and create a base of loyal, recurring customers.",
      "Speed wins: an HVAC lead that isn't contacted within minutes during a heat wave has already booked a competitor.",
    ],
    intro:
      "HVAC lives and dies by the weather. The first cold snap or heat wave sends “furnace not working” and “AC repair near me” searches through the roof, and the contractors who show up first and answer fastest book solid for weeks. The rest fight over scraps. Here's how to be the first group.",
    sections: [
      {
        heading: "Capture emergency demand with LSAs and the map pack",
        paragraphs: [
          "When someone's heat dies in January, they call one of the first businesses they see. [Google's Local Services Ads](https://support.google.com/localservices/answer/6224841) put you at the very top with a Google Guaranteed badge and charge per lead, ideal for high-value HVAC calls. Below them, the [Maps 3-pack](/blog/how-to-rank-higher-on-google-maps) captures the rest.",
          "Both reward a complete Google Business Profile and strong reviews. Getting your [local SEO](/services/local-seo) and LSAs running before the season turns is critical, ranking takes time, so you can't start when the heat wave hits.",
        ],
      },
      {
        heading: "Sell maintenance plans to beat seasonality",
        paragraphs: [
          "The smartest HVAC marketing isn't a lead source at all, it's the maintenance plan. Twice-a-year tune-up agreements smooth your revenue across the slow shoulder seasons, create priority customers who don't shop around, and generate the replacement jobs that are your highest-margin work.",
          "Market plans to your existing customer list with simple [automated follow-up and reminders](/blog/automated-lead-follow-up-for-service-businesses), and pitch them on every service call. It's far cheaper to convert an existing customer to a plan than to buy a new lead.",
        ],
      },
      {
        heading: "Answer fast or lose the job",
        paragraphs: [
          "During a weather spike, every HVAC company is slammed and the customer is calling down the list. Whoever answers or texts back first usually wins. A [missed call](/blog/what-happens-when-you-miss-a-customer-call) during peak season is pure lost revenue.",
          "A missed-call text-back and instant scheduling keep leads warm when your techs are all on jobs and your phone is ringing off the hook. HVAC owners hash out lead-gen and pricing in [r/hvacadvice](https://www.reddit.com/r/hvacadvice/); fast follow-up and maintenance plans come up as the real winners every time.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Local Services Ads good for HVAC contractors?",
        a: "Yes, they're one of the best channels for HVAC. You pay per lead rather than per click, appear above regular ads with a Google Guaranteed badge, and the format suits high-value emergency calls. They pair well with strong local SEO so you capture both paid and organic demand.",
      },
      {
        q: "How do HVAC companies get leads in the slow season?",
        a: "Maintenance plans and your existing customer list. Market tune-up agreements before peak seasons, run reminder campaigns to past customers, and use the slow months to build the SEO and content that pays off when demand returns.",
      },
      {
        q: "Why am I getting HVAC leads but not booking them?",
        a: "Usually speed and follow-up. During busy periods leads go cold in minutes, so if calls hit voicemail or form leads wait hours for a reply, they book a competitor. Automated instant response and easy scheduling fix most of this.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "r/hvacadvice on Reddit", href: "https://www.reddit.com/r/hvacadvice/" },
    ],
  },
  {
    slug: "how-to-get-more-roofing-leads",
    title: "How to get more roofing leads that turn into signed jobs",
    metaTitle: "How to Get More Roofing Leads",
    description:
      "A roofer's guide to generating quality leads: local SEO, Local Services Ads, storm-season readiness, reviews and trust, and following up before the competition does.",
    question: "How do roofers get more leads?",
    category: "Industry Guides",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/how-to-get-more-roofing-leads.webp",
    imageAlt: "A roofer working on roof shingles",
    imageCredit: "Ryan Stephens / Pexels",
    keyTakeaways: [
      "Roofing is high-ticket and trust-heavy, so reviews, licensing, and a credible website matter as much as visibility.",
      "Storm season creates demand surges, so ranking and ad campaigns need to be ready before the weather hits, not scrambled together after.",
      "Shared lead-reseller leads are sold to several roofers at once, so owning your own local search presence produces higher-quality, exclusive leads.",
    ],
    intro:
      "A new roof is one of the largest home purchases a homeowner makes, so roofing leads are valuable, expensive, and fiercely contested. Lead resellers will happily sell you the same lead they sold three competitors. The roofers who win consistently generate their own exclusive leads through search and referral. Here's the playbook.",
    sections: [
      {
        heading: "Rank locally and back it with proof",
        paragraphs: [
          "Homeowners search “roofer near me,” “roof replacement [city],” and “roof leak repair.” Winning the [Maps 3-pack](/blog/how-to-rank-higher-on-google-maps) and ranking service pages for each of those is the foundation of exclusive lead flow, and it's what our [local SEO service](/services/local-seo) is built to do.",
          "But roofing is a trust purchase. Back your visibility with a credible [website](/services/website-build): license and insurance details, real project photos, warranties, and a wall of recent [reviews](/blog/how-do-i-get-more-google-reviews). A homeowner spending five figures reads all of it before calling.",
        ],
      },
      {
        heading: "Be ready before the storm, not after",
        paragraphs: [
          "Roofing demand spikes after hail and wind events. The problem is that rankings and ad quality take time to build, so scrambling to market after a storm means missing the surge. The roofers who clean up are the ones whose [local SEO](/blog/how-long-does-local-seo-take) and [Local Services Ads](https://support.google.com/localservices/answer/6224841) were already strong when the weather hit.",
          "Keep a standing presence year-round so you're the default result when demand jumps. LSAs' per-lead pricing and Google Guaranteed badge fit roofing's high job values especially well.",
        ],
      },
      {
        heading: "Follow up faster than the reseller-fed competition",
        paragraphs: [
          "Because roofing leads are so valuable, speed is a weapon. A homeowner who requests a quote and hears nothing for a day assumes you're too busy and calls the next roofer. [Fast, automated follow-up](/blog/what-happens-when-you-miss-a-customer-call) keeps your exclusive leads from leaking to competitors who bought the shared version of that same lead.",
          "Roofers compare lead sources and close rates in [r/roofing](https://www.reddit.com/r/roofing/); the consistent lesson is that self-generated leads plus fast follow-up beat any pay-per-lead service on both cost and quality.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are shared roofing leads worth buying?",
        a: "They can fill gaps, but shared leads are sold to multiple roofers at once, so close rates are low and you're competing on speed and price. Building your own local search presence produces exclusive, higher-intent leads that don't disappear when you stop paying a reseller.",
      },
      {
        q: "How do roofers market for storm season?",
        a: "Prepare before the storm. Keep your rankings, reviews, and ad campaigns strong year-round so you're already the visible, credible option when a hail or wind event drives a demand spike. Marketing built after the storm arrives usually misses the surge.",
      },
      {
        q: "What matters most on a roofing website?",
        a: "Trust and clarity. Prominent license and insurance details, real project photos, warranty information, recent reviews, and one obvious way to request a quote. A five-figure purchase means homeowners scrutinize your credibility before they ever call.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "r/roofing on Reddit", href: "https://www.reddit.com/r/roofing/" },
    ],
  },
  {
    slug: "marketing-for-electricians",
    title: "Marketing for electricians: how to keep your schedule full",
    metaTitle: "Marketing for Electricians",
    description:
      "An electrician's marketing guide: local SEO, Local Services Ads, reviews and licensing trust, residential vs commercial targeting, and fast follow-up on service calls.",
    question: "How do electricians get more customers?",
    category: "Industry Guides",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/marketing-for-electricians.webp",
    imageAlt: "An electrician working on an electrical panel",
    imageCredit: "Florida Solar Fix / Pexels",
    keyTakeaways: [
      "Electrical work ranges from small residential service calls to large commercial contracts, and each needs its own pages and its own message.",
      "Licensing and safety are the trust signals customers look for, so make them prominent everywhere.",
      "Most electricians win locally on Google, so a strong profile, reviews, and Local Services Ads outperform any generic advertising.",
    ],
    intro:
      "Electricians serve two very different customers: the homeowner who needs a panel upgrade or a fixed outlet, and the general contractor or property manager awarding recurring commercial work. Good marketing speaks to each distinctly. Here's how to stay booked across both.",
    sections: [
      {
        heading: "Win local search for residential service calls",
        paragraphs: [
          "Homeowners search “electrician near me,” “panel upgrade [city],” and “EV charger installation.” These resolve in the [Maps 3-pack](/blog/how-to-rank-higher-on-google-maps), so a complete Google Business Profile with the right category and steady [reviews](/blog/how-do-i-get-more-google-reviews) is your highest-return work.",
          "[Local Services Ads](https://support.google.com/localservices/answer/6224841) sit above everything with a Google Guaranteed badge and charge per lead, a strong fit for residential electrical calls. This local visibility is exactly what our [local SEO service](/services/local-seo) builds.",
        ],
      },
      {
        heading: "Separate your residential and commercial message",
        paragraphs: [
          "A homeowner and a general contractor want different things. Residential pages should emphasize speed, safety, licensing, and clear pricing; commercial pages should emphasize capacity, scheduling reliability, code compliance, and past project scale. Trying to serve both on one page dilutes both.",
          "This is a straightforward [organic growth](/services/organic-growth) play: dedicated service and audience pages rank for their own searches and speak to the right buyer. For commercial work especially, referrals and relationships matter, so make your credibility easy to verify online.",
        ],
      },
      {
        heading: "Lead with licensing, and follow up fast",
        paragraphs: [
          "Electrical is a safety trade, so licensing and insurance are the trust signals customers scan for. Display your license number, certifications, and insurance prominently on your [website](/services/website-build) and profile.",
          "Then answer quickly. A homeowner with a partial outage or a contractor coordinating a build won't wait, [slow follow-up loses the job](/blog/what-happens-when-you-miss-a-customer-call). Electricians trade marketing and pricing notes in [r/electricians](https://www.reddit.com/r/electricians/); reviews and responsiveness come up as the real differentiators.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do electricians get more commercial work?",
        a: "Commercial work runs on relationships and credibility. Build dedicated commercial pages that emphasize capacity, reliability, and code compliance, keep your licensing and past projects easy to verify online, and nurture relationships with general contractors and property managers. Referrals close most commercial jobs, but a strong online presence backs them up.",
      },
      {
        q: "Should electricians use Local Services Ads?",
        a: "For residential service calls, yes. The per-lead pricing, Google Guaranteed badge, and top placement fit electrical work well. Combine them with strong local SEO so you capture both the paid and the organic searches.",
      },
      {
        q: "What's the fastest way for an electrician to get more customers?",
        a: "Fix and optimize your Google Business Profile, start collecting reviews on every job, and turn on Local Services Ads. Those three move the needle fastest, while the website and content work compound over the following months.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
      { label: "r/electricians on Reddit", href: "https://www.reddit.com/r/electricians/" },
    ],
  },

  // ---- Strategy (cross-industry pillars) ----
  {
    slug: "how-much-should-a-service-business-spend-on-marketing",
    title: "How much should a service business spend on marketing?",
    metaTitle: "How Much Should a Service Business Spend on Marketing?",
    description:
      "A practical guide to setting a marketing budget for a local service business: the percentage-of-revenue rule of thumb, what to prioritize first, and how to measure return.",
    question: "How much should a service business spend on marketing?",
    category: "Strategy",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/how-much-should-a-service-business-spend-on-marketing.webp",
    imageAlt: "A small business owner reviewing a budget at a desk",
    imageCredit: "RDNE Stock project / Pexels",
    keyTakeaways: [
      "The common rule of thumb is 5-10% of revenue for established businesses and more for those in a growth push, but the right number depends on your margins and goals.",
      "Spend is meaningless without measurement: track cost per lead and cost per booked job, not just clicks or impressions.",
      "Fix the free foundations (Google Business Profile, reviews, a working website) before pouring money into ads, or you'll pay to send traffic to a leaky funnel.",
    ],
    intro:
      "Every service business owner eventually asks the same question: how much of my revenue should go to marketing? There's a rule of thumb, but the honest answer is that the number matters far less than what you spend it on and whether you measure the return. Here's a practical framework.",
    sections: [
      {
        heading: "Start with the rule of thumb, then adjust",
        paragraphs: [
          "The [U.S. Small Business Administration](https://www.sba.gov/) has long suggested small businesses budget around 7-8% of revenue for marketing, and a common working range is 5-10% for established businesses, higher when you're actively pushing for growth or entering a new market.",
          "Treat that as a starting point, not a law. A business with high margins and ambitious growth goals can justify spending more; one with thin margins in a sleepy market should spend carefully and lean on the compounding, lower-cost channels like [organic growth](/services/organic-growth).",
        ],
      },
      {
        heading: "Fix the free foundation before you spend a dollar",
        paragraphs: [
          "The most expensive mistake is buying traffic before your basics work. If your [website is leaking leads](/blog/why-is-my-website-not-showing-up-on-google) or your [Google Business Profile](/blog/how-to-rank-higher-on-google-maps) is half-finished, ad spend just pays to expose the problem.",
          "The free and near-free work, claiming and completing your profile, gathering [reviews](/blog/how-do-i-get-more-google-reviews), fixing site speed and forms, usually delivers the highest return of anything on your list. Do it first. Our free scan exists precisely to show you which of these is costing you the most.",
        ],
      },
      {
        heading: "Judge spend by booked jobs, not vanity metrics",
        paragraphs: [
          "A budget is only as good as your measurement. Clicks and impressions feel like progress but pay no bills. Track cost per lead and, more importantly, cost per booked job, so you can see which channels actually produce revenue and shift budget toward them.",
          "This is where owners underspend on the boring parts: tracking, follow-up, and [fast lead response](/blog/what-happens-when-you-miss-a-customer-call). A cheaper lead you contact in two minutes beats an expensive one you call back tomorrow. Owners debate real numbers openly in [r/smallbusiness](https://www.reddit.com/r/smallbusiness/).",
        ],
      },
    ],
    faqs: [
      {
        q: "What percentage of revenue should go to marketing?",
        a: "A common range is 5-10% of revenue for established service businesses, with the U.S. Small Business Administration historically suggesting around 7-8% for small businesses. Push toward the higher end when you're actively growing, and lower when margins are tight, but always judge the spend by the jobs it books.",
      },
      {
        q: "Should I spend on ads or SEO first?",
        a: "Fix the free foundation first (profile, reviews, a working website), then use ads to capture demand now while SEO compounds over months. Ads pointed at a weak site or slow follow-up waste money, so the sequence matters more than the split.",
      },
      {
        q: "How do I know if my marketing is working?",
        a: "Measure cost per lead and cost per booked job by channel, not clicks or impressions. If you can't tie spend to booked revenue, you can't tell a good channel from a bad one. Set up conversion tracking before scaling any budget.",
      },
    ],
    sources: [
      { label: "U.S. Small Business Administration", href: "https://www.sba.gov/" },
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "r/smallbusiness on Reddit", href: "https://www.reddit.com/r/smallbusiness/" },
    ],
  },
  {
    slug: "local-services-ads-vs-google-ads",
    title: "Local Services Ads vs Google Ads: which is right for your trade?",
    metaTitle: "Local Services Ads vs Google Ads",
    description:
      "A plain-English comparison of Google's Local Services Ads and standard Google Ads for local service businesses: how each is priced, who should use which, and why most use both.",
    question: "What's the difference between Local Services Ads and Google Ads?",
    category: "Paid Ads",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/local-services-ads-vs-google-ads.webp",
    imageAlt: "A laptop showing a Google advertising dashboard",
    imageCredit: "cottonbro studio / Pexels",
    keyTakeaways: [
      "Local Services Ads (LSAs) sit at the very top, carry a Google Guaranteed badge, and charge per lead; standard Google Ads sit below them and charge per click.",
      "LSAs require license and background verification, which keeps competition out but limits them to eligible service categories.",
      "Most local service businesses use both: LSAs for the highest-intent calls, standard Search Ads for the keywords and services LSAs don't cover.",
    ],
    intro:
      "Google offers local service businesses two very different ad products, and the names don't make the difference obvious. One charges you when someone calls; the other charges when someone clicks. Picking the right mix can cut your cost per job significantly. Here's how they compare.",
    sections: [
      {
        heading: "How each one works",
        paragraphs: [
          "[Local Services Ads](https://support.google.com/localservices/answer/6224841) appear at the very top of the results, above the regular ads, with a “Google Guaranteed” badge. You pay per lead (a call or message), not per click, and you have to pass license and background verification to run them. That verification is a feature: it keeps low-effort competitors out.",
          "Standard [Google Ads](https://support.google.com/google-ads/answer/6146252) (the Search campaigns) appear below LSAs and charge per click regardless of whether that click becomes a lead. They're available for essentially any keyword and give you far more control over messaging, landing pages, and targeting.",
        ],
      },
      {
        heading: "Which should your trade use?",
        paragraphs: [
          "For emergency and high-value home trades, plumbers, [HVAC](/blog/how-to-get-more-hvac-leads), electricians, [roofers](/blog/how-to-get-more-roofing-leads), LSAs are often the best single channel because paying per lead fits a business where one job is worth hundreds or thousands. If your category is eligible, start there.",
          "Standard Search Ads shine when you need to target specific services or high-consideration work that LSAs don't cover well, like [remodeling project keywords](/blog/google-ads-for-remodelers), or when you want a click to land on a specific [landing page](/services/website-build) you control. They're also how you run branded-search defense.",
        ],
      },
      {
        heading: "Why most businesses run both",
        paragraphs: [
          "These aren't either/or. LSAs capture the top-of-page, ready-to-call demand at a predictable per-lead cost, while Search Ads capture the searches and services LSAs miss and defend your brand name. Together they cover the full results page.",
          "Whichever you run, the fundamentals still decide whether the money works: a fast [website](/services/website-build), strong [reviews](/blog/how-do-i-get-more-google-reviews), and [instant follow-up](/blog/what-happens-when-you-miss-a-customer-call). Ads buy the click; those three turn it into a job. This is the core of our [paid ads service](/services/paid-ads).",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Local Services Ads cheaper than Google Ads?",
        a: "Not necessarily cheaper, but often better value for high-ticket trades because you pay per lead instead of per click. If a click may never call, per-click billing can waste budget; per-lead billing ties cost directly to a contact. The right choice depends on your job value and category eligibility.",
      },
      {
        q: "Do I need to be verified for Local Services Ads?",
        a: "Yes. LSAs require license and insurance verification plus a background check for eligible categories. It's extra setup, but it earns the Google Guaranteed badge and keeps unverified competitors out of the format.",
      },
      {
        q: "Can I run Local Services Ads and Google Ads at the same time?",
        a: "Yes, and most local service businesses do. LSAs capture the top-of-page per-lead demand while standard Search Ads cover additional keywords, specific landing pages, and branded-search defense. Together they own more of the results page than either alone.",
      },
    ],
    sources: [
      { label: "Google: Local Services Ads", href: "https://support.google.com/localservices/answer/6224841" },
      { label: "Google Ads: How Search campaigns work", href: "https://support.google.com/google-ads/answer/6146252" },
      { label: "r/PPC on Reddit", href: "https://www.reddit.com/r/PPC/" },
    ],
  },
  {
    slug: "automated-lead-follow-up-for-service-businesses",
    title: "How to set up automated lead follow-up for a service business",
    metaTitle: "Automated Lead Follow-Up for Service Businesses",
    description:
      "A practical guide to automating lead follow-up: missed-call text-back, instant form replies, and reminder sequences that keep leads warm while you're on the job.",
    question: "How do I automate lead follow-up for my service business?",
    category: "Strategy",
    readMinutes: 5,
    updated: "2026-07-23",
    image: "/blog/automated-lead-follow-up-for-service-businesses.webp",
    imageAlt: "A hand holding a phone showing a text message notification",
    imageCredit: "Tranmautritam / Pexels",
    keyTakeaways: [
      "Speed is the highest-leverage fix in local marketing: responding in minutes instead of hours dramatically raises the odds a lead becomes a job.",
      "The three automations that matter most are missed-call text-back, instant replies to form leads, and a short follow-up sequence for leads that go quiet.",
      "Automation keeps leads warm while you're on a job, it doesn't replace you, it buys you the minutes you don't have when the phone rings mid-task.",
    ],
    intro:
      "Field service owners lose more revenue to slow follow-up than to almost anything else. You can't answer every call from under a sink or on a roof, and by the time you call back, the customer booked someone else. Automation solves this, not by replacing you, but by responding instantly on your behalf. Here's how to set it up.",
    sections: [
      {
        heading: "Missed-call text-back: the first automation to build",
        paragraphs: [
          "When a call goes unanswered, an automatic text fires within seconds: “Sorry we missed you, we're on a job. What do you need? We'll call back shortly.” The customer feels handled instead of ignored, which is usually enough to stop them dialing the next business.",
          "This one automation recovers a huge share of otherwise-lost leads. We break down the economics in [what a missed call actually costs](/blog/what-happens-when-you-miss-a-customer-call), the short version is that a missed call rarely becomes a voicemail, it becomes a competitor's job.",
        ],
      },
      {
        heading: "Instant replies and a follow-up sequence",
        paragraphs: [
          "Form leads deserve the same speed. Someone who submits a quote request at 9pm should get an immediate acknowledgment, not silence until Tuesday. An instant auto-reply confirms you got it and sets expectations, then a short sequence of follow-ups over the next few days catches the leads that go quiet without any manual chasing.",
          "The [Harvard Business Review's research on lead response](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) found that responding within an hour makes a lead far likelier to qualify, and most companies respond far too slowly. Automation is how a busy two-person shop hits that window every time.",
        ],
      },
      {
        heading: "Reminders and reviews close the loop",
        paragraphs: [
          "The same system that captures leads should keep customers coming back: appointment reminders that cut no-shows, and an automatic [review request](/blog/how-do-i-get-more-google-reviews) sent the moment a job is done, when satisfaction is highest. Both run without you touching them.",
          "This is the [lead-capture layer](/services/quick-wins) that sits under everything else. Winning the [search ranking](/blog/how-to-rank-higher-on-google-maps) fills the top of the funnel; automated follow-up seals the bottom so the traffic you worked for actually turns into booked, repeat revenue.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is missed-call text-back?",
        a: "It's an automation that instantly texts anyone whose call you didn't answer, so the lead gets a response in seconds instead of reaching voicemail. The customer feels handled and stays warm, and you reply when your hands are free. For field service trades, it's usually the single highest-ROI automation to set up.",
      },
      {
        q: "How fast do I really need to respond to a lead?",
        a: "Within minutes. Research from Harvard Business Review found the odds of qualifying a lead drop sharply after the first hour, and most businesses respond far too slowly. Automated instant replies let you hit that window even when you're on a job.",
      },
      {
        q: "Will automating follow-up make my business feel impersonal?",
        a: "Done right, it feels more responsive, not less. The automation buys time by acknowledging the customer instantly, then you follow up personally. The alternative, a call that goes to voicemail and a callback hours later, feels far worse to a customer who needs help now.",
      },
    ],
    sources: [
      { label: "Harvard Business Review: The Short Life of Online Sales Leads", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
      { label: "Google: Call history in Business Profile", href: "https://support.google.com/business/answer/9688285" },
      { label: "r/sweatystartup on Reddit", href: "https://www.reddit.com/r/sweatystartup/" },
    ],
  },
  {
    slug: "website-checklist-for-service-businesses",
    title: "The website checklist every service business needs to book more jobs",
    metaTitle: "Website Checklist for Service Businesses",
    description:
      "A practical website checklist for local service businesses: the pages, trust signals, speed, mobile, schema, and conversion elements that turn visitors into booked jobs.",
    question: "What should a service business website include?",
    category: "Strategy",
    readMinutes: 6,
    updated: "2026-07-23",
    image: "/blog/website-checklist-for-service-businesses.webp",
    imageAlt: "A web designer working on a website layout on a laptop",
    imageCredit: "Hanna Pad / Pexels",
    keyTakeaways: [
      "A service website has one job: turn a visitor into a call or form submission, so click-to-call, a quote form, and your service area must be obvious on every page.",
      "Trust and speed decide conversion: reviews, licensing, real photos, and a page that loads in under three seconds on a phone.",
      "One dedicated page per service and per city ranks far better than a single “services” page, and schema markup helps both Google and AI understand you.",
    ],
    intro:
      "A service business website isn't a brochure, it's a lead machine, and most of them leak badly. Use this checklist to make sure yours does the one thing it exists for: turning the visitor who found you into a booked job. Work through it top to bottom.",
    sections: [
      {
        heading: "The conversion essentials (get these first)",
        paragraphs: [
          "Every page needs an obvious way to contact you: a click-to-call phone number in the header (tappable on mobile), a short quote form, and your service area stated clearly. If a visitor has to hunt for how to reach you, you've lost them. Promise-based calls to action (“Get your free estimate”) beat generic ones (“Submit”).",
          "Speed is a conversion factor, not just an SEO one: a page that takes more than about three seconds to load on a phone loses a large share of visitors before they see anything. Check yours with Google's [PageSpeed Insights](https://pagespeed.web.dev/), most service sites have room to improve, and it's a core part of our [quick wins service](/services/quick-wins).",
        ],
      },
      {
        heading: "Trust signals, because service is a trust purchase",
        paragraphs: [
          "Hiring a contractor is a leap of faith, so your site has to earn it fast. Display recent [reviews](/blog/how-do-i-get-more-google-reviews), your license and insurance details, real project photos (not stock), warranties, and any certifications. These are the things a nervous customer scans for before calling.",
          "Real photos of your actual work matter more than polished stock imagery, they're proof, and for visual trades they're your strongest sales tool. This is also where a [custom-built website](/services/website-build) beats a template: it's built around your proof and your customers, not a generic layout.",
        ],
      },
      {
        heading: "Structure for Google and AI: pages and schema",
        paragraphs: [
          "One page can't rank for everything. Build a dedicated page for each service and each city you serve, targeting how customers actually search, this is the [organic growth](/services/organic-growth) foundation, and it's why a business [doesn't show up on Google](/blog/why-is-my-website-not-showing-up-on-google) when everything's crammed onto one page.",
          "Add [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) (schema markup) so machines understand your business, services, service area, hours, and reviews without guessing. It's what helps you appear in rich results and, increasingly, in [AI search recommendations](/blog/how-to-get-your-business-recommended-by-ai). Finish with a sitemap and clean indexing so Google can find every page.",
        ],
      },
    ],
    faqs: [
      {
        q: "What pages does a service business website need?",
        a: "At minimum: a homepage, a dedicated page for each core service, location pages for the main areas you serve, an about page with your credentials, a reviews or gallery page, and a contact page. Dedicated service and location pages rank far better than a single combined services page.",
      },
      {
        q: "How fast should my website load?",
        a: "Aim for under about three seconds on mobile. Beyond that you lose a large share of visitors before the page even renders, and speed is also a Google ranking factor. Test with Google's free PageSpeed Insights and fix the biggest offenders first, usually large images and unused scripts.",
      },
      {
        q: "Do I need a custom website or is a template fine?",
        a: "A template can work if it's fast, mobile-first, and built around conversion. Many aren't, they're slow, generic, and hard to rank. The deciding factor isn't custom vs template, it's whether the site loads fast, proves your credibility, and makes contacting you effortless on every page.",
      },
    ],
    sources: [
      { label: "Google: PageSpeed Insights", href: "https://pagespeed.web.dev/" },
      { label: "Google: Intro to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "Google: Improve your local ranking", href: "https://support.google.com/business/answer/7091" },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
