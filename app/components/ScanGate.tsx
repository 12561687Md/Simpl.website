"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RELATIONSHIP_OPTIONS } from "../lib/scan-types";
import type { Relationship } from "../lib/scan-types";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The gate, shown before the scan runs.
 *
 * It is personalised entirely from the autocomplete prediction (name + address),
 * which we already have for free. Nothing here costs a Places call — the
 * expensive work only starts once this returns a token.
 *
 * Design note: asking before showing value costs completion, so the ask has to
 * feel like it is already working. Hence their own business name and address at
 * the top: we found you, we just need somewhere to send it.
 */
export default function ScanGate({
  businessName,
  address,
  onStart,
}: {
  businessName: string;
  address: string;
  onStart: (email: string, relationship: Relationship, optIn: boolean) => Promise<void>;
}) {
  const [step, setStep] = useState<"email" | "relationship">("email");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const reduce = useReducedMotion();

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setErr(null);
    setStep("relationship");
  }

  async function choose(rel: Relationship) {
    setBusy(true);
    setErr(null);
    try {
      await onStart(email.trim(), rel, optIn);
    } catch (e) {
      setBusy(false);
      setErr(e instanceof Error ? e.message : "Could not start your scan. Try again.");
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Identity, straight from the prediction. Free, and it does the
          reassurance work that earns the email. */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: "center", marginBottom: 28 }}
      >
        <div
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--pulse)" }} />
          Found you
        </div>
        <div style={{ fontSize: "clamp(22px, 3.6vw, 30px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          {businessName}
        </div>
        {address && (
          <div style={{ ...mono, fontSize: 11.5, color: "var(--muted)", marginTop: 7 }}>{address}</div>
        )}
      </motion.div>

      <div
        style={{
          background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
          border: "1px solid var(--accent)",
          boxShadow: "0 0 0 1px rgba(155,255,26,0.08), 0 16px 48px -24px var(--accent)",
          borderRadius: 8,
          padding: "28px 30px",
        }}
      >
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: reduce ? 0 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -10 }}
              transition={{ duration: 0.22 }}
            >
              <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
                Step 1 of 2
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, lineHeight: 1.35 }}>
                Where should we send your audit?
              </div>
              <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.55 }}>
                We&apos;ll run the full scan now and show you everything on this page. The email is so you can come back
                to your report later.
              </p>
              <form onSubmit={submitEmail} style={{ display: "flex" }}>
                <label htmlFor="gate-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="gate-email"
                  type="email"
                  required
                  autoFocus
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...mono,
                    flex: 1,
                    border: "1px solid var(--rule)",
                    borderRight: 0,
                    background: "var(--bg)",
                    color: "var(--fg)",
                    padding: "13px 14px",
                    fontSize: 14,
                    outline: "none",
                    borderRadius: "4px 0 0 4px",
                    minHeight: 48,
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  className="cta-primary"
                  style={{
                    color: "var(--accent-ink)",
                    padding: "0 20px",
                    fontSize: 13,
                    border: 0,
                    borderRadius: "0 4px 4px 0",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    cursor: "pointer",
                    minHeight: 48,
                  }}
                >
                  Continue →
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="rel"
              initial={{ opacity: 0, x: reduce ? 0 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -10 }}
              transition={{ duration: 0.22 }}
            >
              <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
                Step 2 of 2
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18, lineHeight: 1.35 }}>
                What&apos;s your relationship to {businessName}?
              </div>

              <div role="group" aria-label="Your relationship to this business" style={{ display: "grid", gap: 8 }}>
                {RELATIONSHIP_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={busy}
                    onClick={() => choose(opt.value)}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: 5,
                      border: "1px solid var(--rule)",
                      background: "var(--bg)",
                      color: "var(--fg)",
                      fontSize: 14.5,
                      cursor: busy ? "wait" : "pointer",
                      minHeight: 48,
                      opacity: busy ? 0.6 : 1,
                      transition: "border-color 140ms ease, background 140ms ease",
                    }}
                    onMouseEnter={(e) => !busy && (e.currentTarget.style.borderColor = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 18, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  style={{ marginTop: 3, accentColor: "var(--accent)", width: 15, height: 15, flexShrink: 0 }}
                />
                <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                  Keep watching my score and my competitors. Email me when something changes.
                </span>
              </label>

              {busy && (
                <div style={{ ...mono, fontSize: 11.5, color: "var(--accent)", marginTop: 14 }} role="status">
                  Starting your scan…
                </div>
              )}
              {err && <div style={{ fontSize: 12.5, color: "#E05252", marginTop: 12 }}>{err}</div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
