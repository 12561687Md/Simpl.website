"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ScanTheater from "../components/ScanTheater";
import ScanReport from "../components/ScanReport";
import type { PlaceDetails, ScanResult } from "../lib/scan-types";

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";
const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

type Stage = "resolving" | "scanning" | "report" | "error";

export default function AuditFlow() {
  const params = useSearchParams();
  const placeId = params.get("place");

  const [stage, setStage] = useState<Stage>("resolving");
  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scanPromise = useRef<Promise<unknown> | null>(null);
  // React 18 StrictMode double-invokes effects in dev. Without this the scan
  // fires twice and we pay Places and ScrapingBee twice per visitor.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    if (!placeId) {
      setError("No business selected.");
      setStage("error");
      return;
    }
    started.current = true;

    fetch(`/api/places/details?placeId=${encodeURIComponent(placeId)}`)
      .then((r) => {
        if (!r.ok) throw new Error("lookup failed");
        return r.json();
      })
      .then((details: PlaceDetails) => {
        setPlace(details);

        // No website on the listing means there is nothing to scan and, more to
        // the point, it *is* the diagnosis. Skip the theatre and say so plainly
        // rather than staging a nine-step examination of nothing.
        if (!details.website) {
          setStage("error");
          setError(
            "Google has no website listed for this business. That's the single biggest thing costing you customers right now, and it's the first thing we'd fix."
          );
          return;
        }

        const p = fetch(`${SIMPL_API}/scan/quick`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: details.website }),
        })
          .then((r) => {
            if (!r.ok) throw new Error("scan failed");
            return r.json();
          })
          .then((data: ScanResult) => {
            setResult(data);
            return data;
          });

        // Attach a catch to the stored promise so a scan failure can't surface
        // as an unhandled rejection while the theatre is still running.
        p.catch(() => {
          setError("We couldn't finish scanning that site. Try again in a moment.");
        });

        scanPromise.current = p;
        setStage("scanning");
      })
      .catch(() => {
        setError("We couldn't look up that business. Try again.");
        setStage("error");
      });
  }, [placeId]);

  const handleDone = useCallback(() => {
    // The theatre only hands off once the promise settled. If it settled as a
    // rejection there's no report to show, so surface the failure instead.
    setStage(result ? "report" : "error");
  }, [result]);

  if (stage === "error") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        {place?.name && (
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>{place.name}</div>
        )}
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 26px" }}>{error}</p>
        <a
          href="/"
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

  if (stage === "resolving" || !place) {
    return (
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ ...mono, fontSize: 12, color: "var(--muted)" }} role="status">
          Looking up your business…
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "64px 32px 96px" }}>
      {stage === "scanning" && scanPromise.current && (
        <ScanTheater place={place} scanPromise={scanPromise.current} onDone={handleDone} />
      )}
      {stage === "report" && result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ScanReport place={place} result={result} />
        </motion.div>
      )}
    </div>
  );
}
