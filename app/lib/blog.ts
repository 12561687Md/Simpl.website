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
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
