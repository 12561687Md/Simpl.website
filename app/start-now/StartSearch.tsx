"use client";

import { useRouter } from "next/navigation";
import BusinessSearch, { type Prediction } from "../components/BusinessSearch";

/** Business search for the Fix-your-business page: pick your business, go to the audit. */
export default function StartSearch() {
  const router = useRouter();
  function onSelect(p: Prediction) {
    const q = new URLSearchParams({ place: p.placeId, name: p.name, address: p.address });
    router.push(`/audit?${q}`);
  }
  return <BusinessSearch onSelect={onSelect} autoFocus />;
}
