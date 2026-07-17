"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PlaceDetails } from "../lib/scan-types";

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
 * The photos are the visitor's own, pulled from their Google listing. That's the
 * "we know exactly who you are" beat, and it costs one Details call we already
 * made.
 */

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

interface Phase {
  label: string;
  /** Minimum on-screen time. The scan usually outruns the script; this keeps
   *  each step legible rather than flashing past. */
  ms: number;
}

const PHASES: Phase[] = [
  { label: "Found your Google listing", ms: 1400 },
  { label: "Pulling your photos and profile", ms: 1600 },
  { label: "Reaching your website", ms: 1800 },
  { label: "Checking your SSL certificate", ms: 1400 },
  { label: "Reading your pages", ms: 2000 },
  { label: "Looking for schema markup", ms: 1600 },
  { label: "Checking your social presence", ms: 1500 },
  { label: "Auditing your Business Profile", ms: 1800 },
  { label: "Calculating your SIMPL Score", ms: 1200 },
];

// The last phase is the one that waits on real data, so the script only covers
// the phases before it.
const SCRIPTED = PHASES.length - 1;

export default function ScanTheater({
  place,
  scanPromise,
  onDone,
}: {
  place: PlaceDetails;
  scanPromise: Promise<unknown>;
  onDone: () => void;
}) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [scanArrived, setScanArrived] = useState(false);
  const reduce = useReducedMotion();
  const doneRef = useRef(false);

  // The map leads. It lands on "Found your Google listing", which is exactly
  // what it shows: you, on a map, pinned. Their own photos follow.
  const frames = [...(place.mapUrl ? [place.mapUrl] : []), ...(place.photos ?? [])];

  // Advance the scripted phases on their own clock.
  useEffect(() => {
    if (phaseIdx >= SCRIPTED) return;
    const t = setTimeout(() => setPhaseIdx((i) => i + 1), PHASES[phaseIdx].ms);
    return () => clearTimeout(t);
  }, [phaseIdx]);

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
    if (phaseIdx >= SCRIPTED && scanArrived) {
      doneRef.current = true;
      const t = setTimeout(onDone, PHASES[SCRIPTED].ms);
      return () => clearTimeout(t);
    }
  }, [phaseIdx, scanArrived, onDone]);

  // Cycle the business photos underneath the scanline.
  useEffect(() => {
    if (frames.length < 2) return;
    const t = setInterval(() => setPhotoIdx((i) => (i + 1) % frames.length), 2600);
    return () => clearInterval(t);
  }, [frames.length]);

  const progress = Math.min(((phaseIdx + (scanArrived ? 1 : 0)) / PHASES.length) * 100, 98);

  // Real signals pulled from the listing, in the order they should surface.
  // Built only from data Google actually returned — a missing field produces no
  // card rather than a placeholder. This is the "how did they know?" moment, and
  // it only lands because every line is true.
  const signals: { key: string; label: string; body?: string; foot?: string }[] = [];
  if (place.rating !== null && place.reviewCount !== null) {
    signals.push({
      key: "rating",
      label: "Found on Google",
      body: `${place.rating.toFixed(1)} ★ · ${place.reviewCount.toLocaleString()} review${place.reviewCount === 1 ? "" : "s"}`,
    });
  }
  if (place.summary) {
    signals.push({ key: "summary", label: "Google describes you as", body: place.summary });
  }
  (place.reviews ?? []).forEach((rv, i) => {
    signals.push({
      key: `review-${i}`,
      label: `Recent review${rv.rating ? ` · ${rv.rating}★` : ""}`,
      body: `“${rv.text}”`,
      foot: [rv.author, rv.when].filter(Boolean).join(" · ") || undefined,
    });
  });
  if (frames.length > (place.mapUrl ? 1 : 0)) {
    const n = frames.length - (place.mapUrl ? 1 : 0);
    signals.push({ key: "photos", label: "Pulled from your profile", body: `${n} photo${n === 1 ? "" : "s"} of your business` });
  }

  return (
    <div style={{ maxWidth: 940, margin: "0 auto" }}>
      {/* Identity. Painted before a single check runs, because we already know
          who they are the moment they picked themselves out of the list. */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26, flexWrap: "wrap" }}
      >
        <span
          aria-hidden="true"
          style={{ width: 7, height: 7, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 0 4px rgba(155,255,26,0.15)" }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "clamp(20px, 3.4vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {place.name}
          </div>
          <div style={{ ...mono, fontSize: 11.5, color: "var(--muted)", marginTop: 5, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {place.address && <span>{place.address}</span>}
            {place.phone && (
              <>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>{place.phone}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="scan-theater-grid">
        {/* Viewport: their own photos with a scanline passing over them. */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 3",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid var(--rule)",
            background: "var(--bg-soft)",
          }}
        >
          <AnimatePresence mode="sync">
            {frames.length > 0 ? (
              <motion.img
                key={photoIdx}
                src={frames[photoIdx]}
                alt=""
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: frames[photoIdx] === place.mapUrl ? 0.95 : 0.62, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // No photos on the listing is itself a finding, not a blank box.
              <div
                key="nophoto"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <span style={{ ...mono, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                  No photos found on your
                  <br />
                  Google Business Profile
                </span>
              </div>
            )}
          </AnimatePresence>

          {/* Tint keeps the overlay type legible over arbitrary photography. The
              map needs far less of it: it is already styled to these surfaces and
              its labels are ours to control, so the photo-strength scrim would
              just turn it to mud. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              transition: "background 700ms ease",
              background:
                frames[photoIdx] === place.mapUrl
                  ? "linear-gradient(180deg, rgba(11,13,15,0.05), rgba(11,13,15,0.45))"
                  : "linear-gradient(180deg, rgba(11,13,15,0.5), rgba(11,13,15,0.78))",
            }}
          />

          {/* The scanline. Pure transform, so it stays on the compositor. */}
          {!reduce && (
            <div aria-hidden="true" className="scanline-track">
              <div className="scanline" />
            </div>
          )}

          {/* Corner brackets: instrument framing, cheap and effective. */}
          <div aria-hidden="true" className="scan-corners" />

          <div style={{ position: "absolute", left: 14, bottom: 12, right: 14 }}>
            <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>
              Live scan
            </div>
          </div>
        </div>

        {/* Progress column */}
        <div>
          <div style={{ position: "relative", height: 2, background: "var(--rule)", borderRadius: 1, overflow: "hidden", marginBottom: 18 }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0, right: "auto", background: "var(--accent)", borderRadius: 1 }}
            />
          </div>

          {/* One live region for the whole list. Announcing all nine phases
              individually would flood a screen reader. */}
          <ol role="status" aria-live="polite" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PHASES.map((p, i) => {
              const state = i < phaseIdx ? "done" : i === phaseIdx ? "active" : "pending";
              if (state === "pending") return null;
              return (
                <motion.li
                  key={p.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
                  animate={{ opacity: state === "active" ? 1 : 0.45, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    ...mono,
                    fontSize: 12.5,
                    lineHeight: 2.05,
                    color: state === "active" ? "var(--fg)" : "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 13,
                      flexShrink: 0,
                      color: state === "done" ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {state === "done" ? "✓" : "→"}
                  </span>
                  {p.label}
                </motion.li>
              );
            })}
          </ol>

          {/* "How did they know all that?" — real signals pulled from the
              listing, popping in as the scan runs. Every one is Google's own data
              about their business; nothing here is invented, and anything Google
              doesn't have simply doesn't appear. */}
          <div style={{ marginTop: 22, display: "grid", gap: 8 }}>
            {signals.map((s, i) => (
              <motion.div
                key={s.key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : 1.2 + i * 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  background: "var(--bg-soft)",
                }}
              >
                <div style={{ ...mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: s.body ? 4 : 0 }}>
                  {s.label}
                </div>
                {s.body && <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--fg)" }}>{s.body}</div>}
                {s.foot && <div style={{ ...mono, fontSize: 10, color: "var(--muted)", marginTop: 4 }}>{s.foot}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
