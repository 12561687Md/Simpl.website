/**
 * Sample audit data for the homepage "what the real audit looks like" demo.
 *
 * This is a DELIBERATELY FICTIONAL business (Wildgrove Landscaping) so the demo
 * is an honest sample of the report format, never a claim about a real
 * business. "Wildgrove Landscaping" and every competitor name below were
 * checked against real companies to avoid attaching a fabricated score/reviews
 * to a real business. The homepage frame also labels it "Sample audit." Shapes
 * mirror the live scan (scan-types.ts) so the real ScanReport renders it
 * unchanged. Photos are local stock landscaping shots in /public/demo.
 */
import type { PlaceDetails, ScanResult, SerpBoard } from "./scan-types";

export const DEMO_PLACE: PlaceDetails = {
  placeId: "demo-wildgrove",
  name: "Wildgrove Landscaping",
  address: "3820 Tryon Rd, Raleigh, NC 27606",
  phone: "(919) 555-0173",
  website: "wildgrovelandscaping.com",
  rating: 4.6,
  reviewCount: 38,
  photos: [
    "/demo/landscape-1.jpg",
    "/demo/landscape-2.jpg",
    "/demo/landscape-3.jpg",
    "/demo/landscape-4.jpg",
  ],
  mapUrl: null,
  summary: null,
  lat: 35.751,
  lng: -78.700,
  reviews: [
    { rating: 5, text: "Wildgrove transformed our backyard: new sod, flower beds, and a stone patio. The crew showed up on time every single day.", author: "Jenna M.", when: "1 month ago" },
    { rating: 5, text: "Our lawn has never looked better. They handle everything now, mowing, fertilizing, seasonal cleanups. Worth every penny.", author: "David R.", when: "4 months ago" },
    { rating: 4, text: "Great landscaping work and fair pricing. Spring scheduling was a little tight, but the results speak for themselves.", author: "Priya S.", when: "6 months ago" },
  ],
  profile: {
    status: "OPERATIONAL",
    priceLevel: null,
    primaryType: "Landscaper",
    mapsUri: "https://maps.google.com/?cid=demo-wildgrove",
    openNow: true,
    hours: [
      "Monday: 7 AM – 6 PM",
      "Tuesday: 7 AM – 6 PM",
      "Wednesday: 7 AM – 6 PM",
      "Thursday: 7 AM – 6 PM",
      "Friday: 7 AM – 6 PM",
      "Saturday: 8 AM – 2 PM",
      "Sunday: Closed",
    ],
    attributes: ["Online estimates", "On-site services"],
  },
};

export const DEMO_RESULT: ScanResult = {
  url: "https://wildgrovelandscaping.com",
  score: 57,
  percentage: 52,
  grade: "D",
  business: {
    name: "Wildgrove Landscaping",
    type: "Landscaper",
    industry: "Landscaping & Lawn Care",
    location: "Raleigh, NC",
    phone: "(919) 555-0173",
    email: null,
  },
  summary: "A well-reviewed local landscaper that's nearly invisible in search. The work is clearly good; the online presence just isn't showing it to the people looking right now.",
  response_time_ms: 3400,
  ssl_valid: true,
  social_profiles: ["facebook"],
  social_missing: ["instagram", "linkedin"],
  categories: {
    "Website Foundation": { grade: "C", score: 9, max: 15 },
    "Crawlability": { grade: "B", score: 8, max: 10 },
    "On-Page SEO": { grade: "D", score: 12, max: 24 },
    "Content & Pages": { grade: "D", score: 16, max: 35 },
    "Social Presence": { grade: "F", score: 2, max: 10 },
    "Google Business Profile": { grade: "C", score: 10, max: 15 },
  },
  findings: [
    { severity: "critical", title: "No structured data (schema markup) found", category: "On-Page SEO", fix: "Without schema, Google can't confirm your services, service area, or hours, so it ranks landscapers it understands better." },
    { severity: "critical", title: "Slow mobile load time (3.4 seconds)", category: "Website Foundation", fix: "Pages over three seconds lose roughly half their mobile visitors before a single photo of your work loads." },
    { severity: "critical", title: "No Instagram presence", category: "Social Presence", fix: "Landscaping sells on before-and-after photos. An empty Instagram is a showroom you're leaving dark while competitors fill theirs." },
    { severity: "warning", title: "Missing meta descriptions on 5 pages", category: "On-Page SEO", fix: "Write a unique 150-character summary per page so Google shows a compelling snippet instead of guessing." },
    { severity: "warning", title: "No dedicated service pages", category: "Content & Pages", fix: "Create a page per service (lawn care, landscaping, hardscaping, irrigation) targeting how customers actually search." },
    { severity: "warning", title: "No project gallery or before/after photos", category: "Content & Pages", fix: "A gallery of finished jobs is the single strongest proof a landscaper can show. Add one and feature it on the homepage." },
    { severity: "warning", title: "Google Business Profile missing recent photos", category: "Google Business Profile", fix: "Post recent project photos every month. Google favors active listings in the local map pack." },
    { severity: "warning", title: "No owner responses to reviews", category: "Google Business Profile", fix: "Reply to every review. Active profiles earn stronger local rankings and read as a business that cares." },
  ],
  findings_count: 8,
  findings_shown: 8,
  findings_hidden: 0,
  critical_count: 3,
  warning_count: 5,
  total_checks: 67,
  is_free_tier: true,
  search: {
    available: true,
    organic_keywords: 76,
    pos_1: 3,
    pos_2_3: 6,
    pos_4_10: 12,
    keywords: [
      { keyword: "wildgrove landscaping", search_volume: 40, rank: 1 },
      { keyword: "landscaping raleigh nc", search_volume: 720, rank: 9 },
      { keyword: "lawn care raleigh", search_volume: 590, rank: 14 },
      { keyword: "hardscaping raleigh nc", search_volume: 210, rank: 22 },
    ],
    competitors: [
      { domain: "larksfieldlandscaping.com", common_keywords: 38, organic_keywords: 420 },
      { domain: "thornhilllawn.com", common_keywords: 29, organic_keywords: 560 },
      { domain: "fernwayoutdoor.com", common_keywords: 24, organic_keywords: 180 },
    ],
  },
};

export const DEMO_BOARD: SerpBoard = {
  available: true,
  location: "Raleigh, NC",
  snapshots: [
    {
      keyword: "landscaping raleigh nc",
      your_maps_rank: 6,
      your_organic_rank: 9,
      maps: [
        { title: "Larksfield Landscaping", rank: 1, rating: 4.8, reviews: 206, is_you: false },
        { title: "Thornhill Lawn & Landscape", rank: 2, rating: 4.7, reviews: 171, is_you: false },
        { title: "Fernway Outdoor", rank: 3, rating: 4.6, reviews: 132, is_you: false },
        { title: "Wildgrove Landscaping", rank: 6, rating: 4.6, reviews: 38, is_you: true },
      ],
      organic: [
        { title: "Best Landscapers in Raleigh, NC (2026)", domain: "larksfieldlandscaping.com", rank: 1, is_you: false },
        { title: "Raleigh Landscaping & Lawn Care", domain: "thornhilllawn.com", rank: 4, is_you: false },
        { title: "Wildgrove Landscaping | Raleigh", domain: "wildgrovelandscaping.com", rank: 9, is_you: true },
      ],
    },
    {
      keyword: "lawn care raleigh",
      your_maps_rank: null,
      your_organic_rank: 14,
      maps: [
        { title: "Thornhill Lawn & Landscape", rank: 1, rating: 4.7, reviews: 171, is_you: false },
        { title: "Fernway Outdoor", rank: 2, rating: 4.6, reviews: 132, is_you: false },
        { title: "Larksfield Landscaping", rank: 3, rating: 4.8, reviews: 206, is_you: false },
      ],
      organic: [
        { title: "Lawn Care Services in Raleigh NC", domain: "thornhilllawn.com", rank: 1, is_you: false },
        { title: "Wildgrove Landscaping", domain: "wildgrovelandscaping.com", rank: 14, is_you: true },
      ],
    },
  ],
  keyword_ideas: [
    { keyword: "landscaping raleigh nc", search_volume: 720, competition: "HIGH" },
    { keyword: "lawn care service raleigh", search_volume: 480, competition: "MEDIUM" },
    { keyword: "paver patio installation raleigh", search_volume: 160, competition: "MEDIUM" },
    { keyword: "backyard landscaping ideas raleigh", search_volume: 190, competition: "LOW" },
  ],
};
