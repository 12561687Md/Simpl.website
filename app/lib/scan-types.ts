/**
 * Shared shapes for the scan flow. `PlaceDetails` mirrors /api/places/details;
 * `ScanResult` mirrors the SIMPL backend's /scan/quick response.
 */

export interface PlaceDetails {
  placeId: string;
  name: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  /** Google's real rating, or null when Google has none. Never defaulted to a
   *  number: an invented rating is a fabricated trust signal. */
  rating: number | null;
  reviewCount: number | null;
  photos: string[];
  /** Proxied dark-styled Static Map of this business. */
  mapUrl: string | null;
  /** Google's one-line description ("...since 1975"). Real or null. */
  summary: string | null;
  /** Up to two real Google reviews, for the "how did they know" theatre. */
  reviews: ScanReview[];
}

export interface ScanReview {
  rating: number | null;
  text: string;
  author: string | null;
  when: string | null;
}

export interface Finding {
  severity: string;
  title: string;
  category: string;
}

export interface BusinessInfo {
  name: string | null;
  type: string | null;
  industry: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
}

export interface ScanResult {
  url: string;
  score: number;
  percentage: number;
  grade: string;
  business: BusinessInfo;
  summary: string;
  response_time_ms: number;
  ssl_valid: boolean;
  social_profiles: string[];
  social_missing: string[];
  categories: Record<string, { grade: string; score?: number; max?: number }>;
  findings: Finding[];
  findings_count: number;
  findings_shown: number;
  findings_hidden: number;
  critical_count: number;
  warning_count: number;
  is_free_tier: boolean;
}

/**
 * How the visitor relates to the business they scanned.
 *
 * This single answer is the cheapest lead-quality signal in the funnel: it
 * separates a buyer from a rival agency pulling a free audit on someone else's
 * listing. Everyone sees their report; only `owner` is worth our hours.
 */
export type Relationship = "owner" | "works_with" | "other";

export const RELATIONSHIP_OPTIONS: { value: Relationship; label: string }[] = [
  { value: "owner", label: "I own or manage this business" },
  { value: "works_with", label: "I provide services to this business" },
  { value: "other", label: "Something else" },
];
