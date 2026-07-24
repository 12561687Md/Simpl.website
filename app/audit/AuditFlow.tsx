"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ScanGate from "../components/ScanGate";
import ScanTheater from "../components/ScanTheater";
import ScanReport from "../components/ScanReport";
import type { PlaceDetails, ScanResult, Relationship, SerpBoard } from "../lib/scan-types";

// Prod backend by default; NEXT_PUBLIC_SIMPL_API points local dev at a local
// backend (http://localhost:8000) so the scan + SERP board can be reviewed
// end-to-end before anything ships.
const SIMPL_API = process.env.NEXT_PUBLIC_SIMPL_API || "https://simpl-506452749067.us-east1.run.app";
const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

type Stage = "bootstrapping" | "scanning" | "gated" | "unlocked" | "error";

/**
 * Scanner V2. Order matters here, and it flipped from V1:
 *
 *   authorize (no email)  ->  token  ->  Details + scan (metered)  ->
 *   theatre  ->  blurred report + gate overlay  ->  unlock (instant, no
 *   inbox round-trip)
 *
 * V1 gated the email BEFORE any scan work, so the visitor paid an email for
 * a promise. Scanner V2 runs the real scan first — see
 * docs/standards/SCANNER_V2_SPEC.md §4.7 — so the gate appears over a report
 * that already exists, and unlocking it is instant because the data is
 * already in this component's state. The email is capture, not a toll: if
 * it's fake, we lost nothing, they already saw the report.
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

  const [stage, setStage] = useState<Stage>("bootstrapping");
  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  // The live-SERP board loads on its own slower track (~15-25s) so it never
  // holds up the report. null = still loading, {available:false} = done, none.
  const [board, setBoard] = useState<SerpBoard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scanPromise = useRef<Promise<unknown> | null>(null);
  const started = useRef(false);

  // Fires once on mount, no user action required — this is the whole point of
  // Scanner V2. No dependency on predictedName in the effect itself so a
  // fast-changing prop can't retrigger it; `started` is the real guard.
  useEffect(() => {
    if (!placeId || started.current) return;
    started.current = true;

    (async () => {
      try {
        // 1. Authorize. Spend guard only, no email — see
        //    app/api/scan/authorize/route.ts for the daily cap reasoning.
        const authRes = await fetch("/api/scan/authorize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeId, businessName: predictedName }),
        });
        const authData = await authRes.json().catch(() => ({}));
        if (!authRes.ok || !authData.token) {
          throw new Error(authData.error || "Could not start your scan. Try again.");
        }
        const token: string = authData.token;

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
            "Google has no website listed for this business. Adding one is the single biggest win available to you right now, and it's the first thing we'd build."
          );
          setStage("error");
          return;
        }

        // Live-SERP board, fired in parallel on its own slow track. It's
        // ~15-25s of Maps Live Advanced calls, far past the theater's floor,
        // so it MUST NOT be awaited into scanPromise — it fills in during the
        // gate. Failures are swallowed to {available:false}; the board section
        // renders an honest "not available" state and the report is unaffected.
        fetch(`${SIMPL_API}/scan/serp-board`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: details.website,
            business_name: details.name ?? predictedName,
            location: details.address ?? predictedAddress,
            lat: details.lat ?? null,
            lng: details.lng ?? null,
          }),
        })
          .then((r) => (r.ok ? (r.json() as Promise<SerpBoard>) : { available: false }))
          .then((data) => setBoard(data))
          .catch(() => setBoard({ available: false }));

        // No email yet — the backend accepts that (FullReportRequest.email is
        // Optional, and _capture_lead no-ops on empty), so the scan runs
        // before anyone has told us who they are. Lead capture happens later,
        // in the unlock step, via /api/capture-email.
        const p = fetch(`${SIMPL_API}/scan/full`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: details.website }),
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
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not start your scan. Try again.");
        setStage("error");
      }
    })();
  }, [placeId, predictedName]);

  const handleTheaterDone = useCallback(() => {
    setResult((r) => {
      // The theatre only hands off once the promise settled. Settled as a
      // rejection means there is no report to show.
      setStage(r ? "gated" : "error");
      return r;
    });
  }, []);

  // The gate overlay's submit. Everything it needs is already in state — no
  // Details or backend scan call happens here, only the lead capture + email.
  const unlock = useCallback(
    async (name: string, email: string, relationship: Relationship, optIn: boolean) => {
      if (!place || !result) throw new Error("Nothing to unlock yet.");

      const res = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          scanUrl: place.website,
          scanScore: result.percentage ?? result.score,
          scanGrade: result.grade,
          businessName: place.name ?? predictedName,
          placeId,
          relationship,
          optIn,
          findings: result.findings,
          categories: result.categories,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not unlock your report. Try again.");
      }

      setStage("unlocked");
    },
    [place, result, placeId, predictedName]
  );

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

  // The theater breaks out of the normal padded container on purpose, full
  // viewport height, not boxed to the site's usual max-width. Every other
  // stage keeps the normal contained layout.
  if (stage === "scanning" && place && scanPromise.current) {
    return <ScanTheater place={place} scanPromise={scanPromise.current} onDone={handleTheaterDone} />;
  }

  return (
    <div style={{ padding: "64px 32px 96px" }}>
      {stage === "bootstrapping" && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 10 }}>{predictedName}</div>
          <p style={{ ...mono, fontSize: 13, color: "var(--muted)" }} role="status">
            Finding your business…
          </p>
        </div>
      )}

      {stage === "gated" && result && place && (
        <div style={{ position: "relative" }}>
          <ScanReport place={place} result={result} board={board} teaser />

          {/* Unlock overlay. Fixed to the viewport rather than positioned
              against the report's height, so it lands centered on screen no
              matter how tall the blurred content underneath is. */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 20px",
              overflowY: "auto",
              background: "rgba(11,13,15,0.55)",
              backdropFilter: "blur(3px)",
            }}
          >
            <ScanGate businessName={place.name ?? predictedName} address={place.address ?? predictedAddress} onUnlock={unlock} />
          </div>
        </div>
      )}

      {stage === "unlocked" && result && place && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ScanReport place={place} result={result} board={board} />
        </motion.div>
      )}
    </div>
  );
}
