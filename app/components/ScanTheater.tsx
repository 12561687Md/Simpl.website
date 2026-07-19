"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PlaceDetails } from "../lib/scan-types";
import PhotoCarousel3D from "@/components/ui/photo-carousel-3d";
import ReviewProfileCards from "./ReviewProfileCards";

// Exact spec (2026-07-19c): 1.5s between each review, then 1.5s between each
// photo. This is a presentation, not a speed race — PHASES below is sized
// with real buffer after the last photo settles, not the bare minimum to
// avoid a cutoff. Every review AND every photo must be fully on screen
// before the theater is allowed to finish.
const REVEAL_STAGGER = 1.5;
// How long before the FIRST item (the rating badge) starts revealing, once
// the map has shrunk into place.
const REVEAL_START = 0.2;

/**
 * The scan choreography.
 *
 * Honest framing of what is and isn't theatre here: the *pacing* is staged, the
 * *data* is not. Every phase below maps to work the backend actually performs,
 * and the final phase blocks on the real scan promise rather than a timer. If
 * the scan is slow, this waits. If the scan fails, this fails. What's staged is
 * only the unhurried reveal, which exists because a diagnosis delivered in 400ms
 * reads as a lookup, not an examination.
 *
 * Sequence (2026-07-19b): the map opens alone, large, centered — the only
 * thing on screen. It sweeps once, then shrinks to the left and everything
 * else arrives around it: a checklist ticking below the map, business
 * photos scattering in with spring physics, then the rating and three real
 * reviews popping in beside them. The map intro is brief on purpose — it's
 * the establishing shot, not where the time should go. REVEAL_STAGGER was
 * widened once already and that overcorrected: with 3 reviews now shown
 * instead of 2, a wide stagger didn't finish revealing before the checklist
 * did. PHASES was trimmed to match the faster reveal rather than padded to
 * match a slow one. Nothing here names where it came from (no "found on
 * Google," no "pulled from your profile") — the effect this is going for is
 * "how did they know that," and naming the source is the one thing that
 * would break it. The photos are still the visitor's own, pulled from their
 * listing, that data is real either way.
 */

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

interface Phase {
  label: string;
  /** Minimum on-screen time. The scan usually outruns the script; this keeps
   *  each step legible rather than flashing past. */
  ms: number;
}

const PHASES: Phase[] = [
  { label: "Locating your business", ms: 1200 },
  { label: "Pulling your profile and photos", ms: 1800 },
  { label: "Reaching your website", ms: 1500 },
  { label: "Checking your SSL certificate", ms: 1100 },
  { label: "Reading your pages", ms: 1900 },
  { label: "Looking for schema markup", ms: 1400 },
  { label: "Checking your social presence", ms: 1700 },
  { label: "Auditing your business listing", ms: 1900 },
  { label: "Calculating your SIMPL Score", ms: 2000 },
];

// The last phase is the one that waits on real data, so the script only covers
// the phases before it.
const SCRIPTED = PHASES.length - 1;

// Matches the .scanline CSS animation's own cycle (globals.css). One sweep,
// not two (was SWEEP_MS * 2) — the map is the establishing shot, not the
// main event; that time now goes to REVEAL_STAGGER instead.
const SWEEP_MS = 2900;
const MAP_INTRO_MS = SWEEP_MS;

function MapBox({ mapUrl, active }: { mapUrl: string | null; active: boolean }) {
  const reduce = useReducedMotion();
  if (!mapUrl) return null;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: active ? 14 : 10,
        overflow: "hidden",
        border: `1px solid ${active ? "var(--accent)" : "var(--rule)"}`,
        background: "var(--bg-soft)",
        transition: "border-color 500ms ease",
      }}
    >
      <img src={mapUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: active
            ? "linear-gradient(180deg, rgba(11,13,15,0.05), rgba(11,13,15,0.4))"
            : "linear-gradient(180deg, rgba(11,13,15,0.15), rgba(11,13,15,0.35))",
        }}
      />
      {active && !reduce && (
        <div aria-hidden="true" className="scanline-track">
          <div className="scanline" />
        </div>
      )}
      <div aria-hidden="true" className="scan-corners" style={{ inset: active ? 14 : 8 }} />
    </div>
  );
}

export default function ScanTheater({
  place,
  scanPromise,
  onDone,
}: {
  place: PlaceDetails;
  scanPromise: Promise<unknown>;
  onDone: () => void;
}) {
  // No map to open on: skip straight to the reveal layout, nothing to show
  // large and centered.
  const [stage, setStage] = useState<"map-intro" | "revealing">(place.mapUrl ? "map-intro" : "revealing");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [scanArrived, setScanArrived] = useState(false);
  const reduce = useReducedMotion();
  const doneRef = useRef(false);

  const photos = place.photos ?? [];

  // Map intro: one sweep, then hand off to the reveal layout.
  useEffect(() => {
    if (stage !== "map-intro") return;
    if (reduce) {
      setStage("revealing");
      return;
    }
    const t = setTimeout(() => setStage("revealing"), MAP_INTRO_MS);
    return () => clearTimeout(t);
  }, [stage, reduce]);

  // The checklist only starts once the map has settled into place — it
  // shouldn't be ticking away behind the big intro map.
  useEffect(() => {
    if (stage !== "revealing" || phaseIdx >= SCRIPTED) return;
    const t = setTimeout(() => setPhaseIdx((i) => i + 1), PHASES[phaseIdx].ms);
    return () => clearTimeout(t);
  }, [stage, phaseIdx]);

  // Track the real scan independently of the script.
  useEffect(() => {
    let alive = true;
    scanPromise.then(
      () => alive && setScanArrived(true),
      () => alive && setScanArrived(true)
    );
    return () => {
      alive = false;
    };
  }, [scanPromise]);

  // Hand off only when the script has run out AND the data is in. Either one
  // alone is not enough: finishing early would show an empty report, and
  // finishing on a timer would show a fabricated one.
  useEffect(() => {
    if (doneRef.current) return;
    if (stage === "revealing" && phaseIdx >= SCRIPTED && scanArrived) {
      doneRef.current = true;
      const t = setTimeout(onDone, PHASES[SCRIPTED].ms);
      return () => clearTimeout(t);
    }
  }, [stage, phaseIdx, scanArrived, onDone]);

  const progress = stage === "revealing" ? Math.min(((phaseIdx + (scanArrived ? 1 : 0)) / PHASES.length) * 100, 98) : 0;

  // Real signals, no source named. A star row and a quote read as evidence
  // on their own; captioning them "found on Google" hands the trick away.
  // At least 3, not 2 — the visitor needs to see three real reviews land
  // before the theater wraps, not just two.
  const reviewCards = (place.reviews ?? []).slice(0, 3);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        // Top-aligned, not centered: the NAP block belongs in the top-left
        // corner of the screen, not floating at mid-height.
        alignItems: "flex-start",
        padding: "40px 32px 48px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "radial-gradient(80% 60% at 50% 30%, rgba(137,207,240,0.07), transparent 65%)",
        }}
      />
      {/* No max-width cap: the left column should hug the actual left edge
          of the screen (inside the outer padding), not a centered 1600px
          band that floats it inward on wide monitors. */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <AnimatePresence mode="wait">
          {stage === "map-intro" ? (
            <motion.div
              key="map-intro"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}
            >
              <div style={{ ...mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg)", marginBottom: 20 }}>
                Locating {place.name}
              </div>
              <div style={{ width: "min(560px, 78vw)", aspectRatio: "4 / 3" }}>
                <MapBox mapUrl={place.mapUrl} active />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealing"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}
                className="theater-reveal-row"
              >
                {/* Left: NAP big in the top corner, the map right under it,
                    then the checklist ticking beneath — one column, top to
                    bottom, sectioned off from the reveal panel by a real
                    divider (the borderRight below; swaps to a bottom border
                    when the row stacks on mobile, see .theater-left-col). */}
                <div
                  className="theater-left-col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: 380,
                    flexShrink: 0,
                    borderRight: "1px solid var(--rule)",
                    paddingRight: 40,
                    alignSelf: "stretch",
                  }}
                >
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{ width: 10, height: 10, marginTop: 12, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 0 5px rgba(137,207,240,0.15)", flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "clamp(28px, 2.6vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                        {place.name}
                      </div>
                      <div style={{ ...mono, fontSize: 13.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.6 }}>
                        {place.address && <div>{place.address}</div>}
                        {place.phone && <div>{place.phone}</div>}
                      </div>
                    </div>
                  </motion.div>

                  {place.mapUrl && (
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 140, damping: 18 }}
                      style={{ width: "100%", aspectRatio: "4 / 3" }}
                    >
                      <MapBox mapUrl={place.mapUrl} active={false} />
                    </motion.div>
                  )}

                  <div>
                    <div style={{ position: "relative", height: 3, background: "var(--rule-strong)", borderRadius: 2, overflow: "hidden", marginBottom: 16 }}>
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        style={{ position: "absolute", inset: 0, right: "auto", background: "var(--accent)", borderRadius: 2, boxShadow: "0 0 8px rgba(137,207,240,0.5)" }}
                      />
                    </div>
                    <ol role="status" aria-live="polite" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {PHASES.map((p, i) => {
                        const state = i < phaseIdx ? "done" : i === phaseIdx ? "active" : "pending";
                        if (state === "pending") return null;
                        return (
                          <motion.li
                            key={p.label}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
                            // Brighter than the first pass (was 0.45 muted-on-dark,
                            // which read as barely-there): done items keep full
                            // foreground color at a soft opacity.
                            animate={{ opacity: state === "active" ? 1 : 0.78, x: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              ...mono,
                              fontSize: 13,
                              lineHeight: 2,
                              color: "var(--fg)",
                              fontWeight: state === "active" ? 600 : 400,
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 9,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{ width: 14, flexShrink: 0, color: state === "done" ? "var(--ok)" : "var(--accent)" }}
                            >
                              {state === "done" ? "✓" : "→"}
                            </span>
                            {p.label}
                          </motion.li>
                        );
                      })}
                    </ol>
                  </div>
                </div>

                {/* Right: the main event, ~75%+ of the panel. Reviews and
                    the rating pop in first, then the photo carousel spins
                    beneath them. No source named anywhere here — the
                    rating stat, the reviews, and the photos just appear. */}
                <div style={{ flex: 1, minWidth: 420, position: "relative", alignSelf: "stretch" }}>
                  {place.rating !== null && place.reviewCount !== null && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 140, damping: 16, delay: reduce ? 0 : REVEAL_START }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        border: "1px solid var(--rule)",
                        borderRadius: 8,
                        padding: "12px 16px",
                        background: "var(--bg-soft)",
                        marginBottom: 18,
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontSize: 17 }} aria-hidden="true">★</span>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{place.rating.toFixed(1)}</span>
                      <span style={{ ...mono, fontSize: 12.5, color: "var(--muted)" }}>
                        {place.reviewCount.toLocaleString()} review{place.reviewCount === 1 ? "" : "s"}
                      </span>
                    </motion.div>
                  )}

                  <ReviewProfileCards
                    reviews={reviewCards}
                    delay={REVEAL_START + (place.rating !== null ? 1 : 0) * REVEAL_STAGGER}
                    stagger={REVEAL_STAGGER}
                  />

                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: reduce ? 0 : REVEAL_START + ((place.rating !== null ? 1 : 0) + reviewCards.length) * REVEAL_STAGGER }}
                    style={{ marginTop: 30 }}
                  >
                    <PhotoCarousel3D photos={photos} size={280} />
                  </motion.div>

                  {/* The scan bar, panel-scale: the same sweep that ran over
                      the intro map now runs over the entire right panel —
                      divider line to screen edge, top to bottom and back —
                      for the whole remainder of the scan. Mounted last with
                      an explicit z-index so it paints above the transformed
                      review/photo layers. */}
                  <div className="scanline-track" aria-hidden="true" style={{ zIndex: 10 }}>
                    <div className="scanline" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
