/**
 * Shared shapes for the scan flow. `PlaceDetails` mirrors /api/places/details;
 * `ScanResult` mirrors the Simpl backend's /scan/quick response.
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
  /** Up to four real Google reviews (the theatre shows the first 3), for the
   *  "how did they know" theatre. */
  reviews: ScanReview[];
  /** Everything Google publicly lists about the profile. Real fields or null —
   *  the absence of hours/price/etc. is itself a finding the report uses. */
  profile?: PlaceProfile;
  /** The business's own coordinates, so the SERP board searches from its exact
   *  location instead of the city centroid. */
  lat?: number | null;
  lng?: number | null;
}

export interface PlaceProfile {
  /** OPERATIONAL | CLOSED_TEMPORARILY | CLOSED_PERMANENTLY, or null. */
  status: string | null;
  /** "$".."$$$$" from Google's price level, or null when not set. */
  priceLevel: string | null;
  /** Google's own primary category label, e.g. "Mediterranean restaurant". */
  primaryType: string | null;
  /** Link to the live Google listing. */
  mapsUri: string | null;
  openNow: boolean | null;
  /** Seven "Monday: 11 AM – 9 PM" strings, or empty when no hours are set. */
  hours: string[];
  /** Human labels for the service attributes Google reports true (dine-in,
   *  delivery, reservations, ...). Shows how much the profile actually says. */
  attributes: string[];
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
  /** Real, general remediation guidance for this class of problem (from the
   *  rubric config, not fabricated per-business). Null for the rare
   *  meta-findings that aren't tied to a specific rubric check. */
  fix: string | null;
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
  /** Real count of every check the rubric evaluates (currently 67) — not a
   *  marketing round number. Optional: older cached scans predate this field. */
  total_checks?: number;
  is_free_tier: boolean;
  /** Real DataForSEO search-visibility data (2026-07-19: wired into the
   *  free scan, not email-gated). {available: false} with no credentials
   *  or on any upstream failure — never a fabricated rank or keyword. */
  search?: SearchData;
}

export interface SearchKeyword {
  keyword: string;
  search_volume: number | null;
  rank: number | null;
}

export interface SearchCompetitor {
  domain: string;
  common_keywords: number | null;
  organic_keywords: number | null;
}

export interface SearchData {
  available: boolean;
  organic_keywords?: number | null;
  pos_1?: number | null;
  pos_2_3?: number | null;
  pos_4_10?: number | null;
  keywords?: SearchKeyword[];
  competitors?: SearchCompetitor[];
}

/**
 * How the visitor relates to the business they scanned.
 *
 * This single answer is the cheapest lead-quality signal in the funnel: it
 * separates a buyer from a rival agency pulling a free audit on someone else's
 * listing. Everyone sees their report; only `owner` is worth our hours.
 */
/**
 * The live-SERP "how you're doing online" board, from POST /scan/serp-board.
 * Loaded separately from the main scan (it's ~15-25s of Maps Live Advanced
 * calls) so the report renders fast while this fills in during the gate.
 */
export interface SerpBoard {
  available: boolean;
  location?: string;
  snapshots?: SerpSnapshot[];
  keyword_ideas?: KeywordOpportunity[];
}

export interface SerpSnapshot {
  keyword: string;
  your_maps_rank: number | null;
  your_organic_rank: number | null;
  maps: SerpMapsResult[];
  organic: SerpOrganicResult[];
}

export interface SerpMapsResult {
  title: string | null;
  rank: number | null;
  rating: number | null;
  reviews: number | null;
  is_you: boolean;
}

export interface SerpOrganicResult {
  title: string | null;
  domain: string | null;
  rank: number | null;
  is_you: boolean;
}

export interface KeywordOpportunity {
  keyword: string;
  search_volume: number | null;
  competition: string | null;
}

export type Relationship = "owner" | "works_with" | "other";

export const RELATIONSHIP_OPTIONS: { value: Relationship; label: string }[] = [
  { value: "owner", label: "I own or manage this business" },
  { value: "works_with", label: "I provide services to this business" },
  { value: "other", label: "Something else" },
];
