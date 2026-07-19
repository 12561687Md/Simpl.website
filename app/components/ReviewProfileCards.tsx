"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ScanReview } from "../lib/scan-types";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

function initials(name: string | null): string {
  if (!name) return "★";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "★";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Deterministic from the name, not random — the same reviewer gets the same
// color every render instead of flickering between them.
const AVATAR_HUES = ["#89CFF0", "#34A853", "#E0A852", "#E05252", "#8A5CF0"];
function avatarColor(name: string | null): string {
  if (!name) return AVATAR_HUES[0];
  const sum = [...name].reduce((n, c) => n + c.charCodeAt(0), 0);
  return AVATAR_HUES[sum % AVATAR_HUES.length];
}

// Alternating tilt + an asymmetric corner (one sharp corner, speech-bubble
// style, pointing back toward whatever revealed just before it) instead of a
// uniform rounded rectangle — deterministic per index, not random, so it
// doesn't reshuffle on re-render.
const TILTS = [-5, 4, -3, 6];
const CORNERS = ["18px 18px 18px 4px", "18px 18px 4px 18px", "4px 18px 18px 18px", "18px 4px 18px 18px"];

/**
 * Real reviews as tilted profile cards, side by side, not a stacked list of
 * quote blocks and not a flat rounded rectangle either — a speech-bubble
 * corner, a color-matched glow under the card, and a big decorative quote
 * mark give it presence instead of reading as a generic testimonial box. No
 * source named anywhere on the card, same rule as the rest of the theater:
 * the effect only works if nothing here explains itself.
 */
export default function ReviewProfileCards({ reviews, delay = 0, stagger = 2.5 }: { reviews: ScanReview[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  if (reviews.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 6 }}>
      {reviews.map((rv, i) => {
        const color = avatarColor(rv.author);
        const tilt = TILTS[i % TILTS.length];
        const corner = CORNERS[i % CORNERS.length];
        return (
          <motion.div
            key={`${rv.author}-${i}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.88, rotate: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 130, damping: 15, delay: reduce ? 0 : delay + i * stagger }}
            style={{
              position: "relative",
              flex: "1 1 210px",
              minWidth: 210,
              maxWidth: 260,
              border: `1px solid ${color}55`,
              borderRadius: corner,
              padding: "18px 20px",
              background: `linear-gradient(160deg, var(--bg-elev) 0%, var(--bg-soft) 100%)`,
              boxShadow: `0 20px 44px -22px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.02), 0 14px 30px -18px ${color}40`,
              overflow: "hidden",
            }}
          >
            {/* Oversized decorative quote mark, clipped by the card, low
                opacity — texture, not a UI element. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -22,
                right: -6,
                fontSize: 90,
                lineHeight: 1,
                fontFamily: "Georgia, serif",
                color,
                opacity: 0.14,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              &rdquo;
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 99,
                  background: color,
                  color: "#0A140D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12.5,
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: `0 0 0 3px ${color}2A`,
                }}
              >
                {initials(rv.author)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {rv.author ?? "Verified customer"}
                </div>
                {rv.rating && (
                  <div
                    aria-hidden="true"
                    style={{
                      ...mono,
                      display: "inline-flex",
                      marginTop: 3,
                      fontSize: 10,
                      letterSpacing: 1,
                      color: "#0A140D",
                      background: color,
                      borderRadius: 99,
                      padding: "1.5px 7px",
                    }}
                  >
                    {"★".repeat(Math.round(rv.rating))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ position: "relative", fontSize: 13, lineHeight: 1.5, color: "var(--fg)" }}>&ldquo;{rv.text}&rdquo;</div>
          </motion.div>
        );
      })}
    </div>
  );
}
