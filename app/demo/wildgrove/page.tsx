import type { Metadata } from "next";
import WildgroveDemo from "./WildgroveDemo";

export const metadata: Metadata = {
  title: "Wildgrove Landscaping — Simpl demo",
  description: "A live before/after demo of a landscaping website built by Simpl.",
  robots: { index: false, follow: false },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: "Wildgrove Landscaping",
  image: "https://simpl.pro/icons/icon-512.png",
  telephone: "+19195550142",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cary",
    addressRegion: "NC",
    addressCountry: "US",
  },
  areaServed: ["Cary", "Apex", "Morrisville", "Holly Springs", "Fuquay-Varina", "Raleigh", "Garner", "Wake Forest"].map((n) => ({ "@type": "City", name: `${n}, NC` })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "84" },
  openingHours: "Mo-Sa 07:00-18:00",
};

export default async function WildgroveDemoPage({ searchParams }: { searchParams: Promise<{ embed?: string }> }) {
  const sp = await searchParams;
  const embed = sp?.embed === "1";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }} />
      <WildgroveDemo embed={embed} />
    </>
  );
}
