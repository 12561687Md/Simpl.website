"use client";

import { useRouter } from "next/navigation";
import BusinessSearch, { type Prediction } from "../components/BusinessSearch";

/**
 * The same name-first scanner as the homepage (not the URL-only ScanTool),
 * dropped in beside the diagnosis form. Two doors into the same funnel: scan
 * it yourself, or tell us the symptom and skip straight to a person.
 */
export default function WhatAmIMissingScanner() {
  const router = useRouter();

  function startAudit(p: Prediction) {
    const q = new URLSearchParams({ place: p.placeId, name: p.name, address: p.address });
    router.push(`/audit?${q}`);
  }

  return <BusinessSearch onSelect={startAudit} />;
}
