"use client";

import { useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ScanGate from "../components/ScanGate";
import ScanTheater from "../components/ScanTheater";
import ScanReport from "../components/ScanReport";
import type { PlaceDetails, ScanResult, Relationship } from "../lib/scan-types";

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";
const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

type Stage = "gate" | "scanning" | "report" | "error";

/**
 * Order matters here, and it is the whole point:
 *
 *   gate (free)  ->  token  ->  Details + photos + scan (metered)  ->  report
 *
 * Everything before the token is paid for with data we already had from the
 * autocomplete prediction. Nothing that costs money runs until someone has told
 * us who they are, so Places spend and pipeline growth are the same line item.
 *
 * `name`/`address` arrive as URL params from the prediction. They are display-only
 * and untrusted — React escapes them, and the server never reads them. The only
 * thing that identifies a business to the backend is placeId.
 */
export default function AuditFlow() {
  const params = useSearchParams();
  const placeId = params.get("place");
  const predictedName = params.get("name") ?? "your business";
  const predictedAddress = params.get("address") ?? "";

  const [stage, setStage] = useState<Stage>("gate");
  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scanPromise = useRef<Promise<unknown> | null>(null);

  const startScan = useCallback(
    async (email: string, relationship: Relationship, optIn: boolean) => {
      if (!placeId) throw new Error("No business selected.");

      // 1. The gate. Lead first, permission second. Throws on failure so the
      //    gate can surface it and we never reach the metered calls.
      const startRes = await fetch("/api/scan/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId, email, relationship, optIn, businessName: predictedName }),
      });
      const startData = await startRes.json().catch(() => ({}));
      if (!startRes.ok || !startData.token) {
        throw new Error(startData.error || "Could not start your scan. Try again.");
      }
      const token: string = startData.token;

      // 2. Metered from here on.
      const details: PlaceDetails = await fetch(
        `/api/places/details?placeId=${encodeURIComponent(placeId)}&scan=${encodeURIComponent(token)}`
      ).then((r) => {
        if (!r.ok) throw new Error("We couldn't look up that business. Try again.");
        return r.json();
      });

      setPlace(details);

      // No website on the listing is not an error, it's the diagnosis. Say it
      // plainly rather than staging a nine-step examination of nothing.
      if (!details.website) {
        setError(
          "Google has no website listed for this business. That's the single biggest thing costing you customers right now, and it's the first thing we'd fix."
        );
        setStage("error");
        return;
      }

      // The email is already captured, so this goes straight to the full report.
      // There is nothing left to gate.
      const p = fetch(`${SIMPL_API}/scan/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: details.website, email }),
      })
        .then((r) => {
          if (!r.ok) throw new Error("scan failed");
          return r.json() as Promise<ScanResult>;
        })
        .then((data) => {
          setResult(data);
          return data;
        });

      p.catch(() => setError("We couldn't finish scanning that site. Try again in a moment."));

      scanPromise.current = p;
      setStage("scanning");
    },
    [placeId, predictedName]
  );

  const handleDone = useCallback(() => {
    setResult((r) => {
      // The theatre only hands off once the promise settled. Settled as a
      // rejection means there is no report to show.
      setStage(r ? "report" : "error");
      return r;
    });
  }, []);

  if (stage === "error") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>
          {place?.name ?? predictedName}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 26px" }}>{error}</p>
        <a
          href={place && !place.website ? "/start" : "/"}
          className="cta-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--accent-ink)",
            padding: "13px 22px",
            fontSize: 13.5,
            fontWeight: 600,
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          {place && !place.website ? "Talk to us about a website →" : "Try another business →"}
        </a>
      </div>
    );
  }

  if (!placeId) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 13, color: "var(--muted)" }}>
          No business selected. <a href="/" style={{ color: "var(--accent)" }}>Start from the homepage →</a>
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "64px 32px 96px" }}>
      {stage === "gate" && (
        <ScanGate businessName={predictedName} address={predictedAddress} onStart={startScan} />
      )}
      {stage === "scanning" && place && scanPromise.current && (
        <ScanTheater place={place} scanPromise={scanPromise.current} onDone={handleDone} />
      )}
      {stage === "report" && result && place && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ScanReport place={place} result={result} />
        </motion.div>
      )}
    </div>
  );
}
