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
  email: "hello@wildgrovelandscaping.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "210 Kildaire Farm Rd, Suite 4",
    addressLocality: "Cary",
    addressRegion: "NC",
    postalCode: "27511",
    addressCountry: "US",
  },
  areaServed: ["Cary", "Apex", "Morrisville", "Holly Springs", "Fuquay-Varina", "Raleigh", "Garner", "Wake Forest"].map((n) => ({ "@type": "City", name: `${n}, NC` })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "84" },
  openingHours: "Mo-Sa 07:00-18:00",
};

export default function WildgroveDemoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }} />
      <WildgroveDemo />
    </>
  );
}
