"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Business typeahead. Type a name, pick your business, go.
 *
 * The whole point is that it feels instant and certain: by the time someone has
 * typed six characters, their own business is looking back at them. That
 * recognition is what makes the scan that follows feel like a diagnosis rather
 * than a form submission.
 */

export interface Prediction {
  placeId: string;
  name: string;
  address: string;
}

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

// Long enough that a Places call isn't fired on every dropped keystroke, short
// enough that the list feels like it is tracking the typing.
const DEBOUNCE_MS = 160;
const MIN_CHARS = 2;

function newSessionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function BusinessSearch({
  onSelect,
  autoFocus = false,
}: {
  onSelect: (prediction: Prediction, sessionToken: string) => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sessionToken = useRef<string>("");
  // Monotonic request id. Autocomplete responses can land out of order, and
  // without this an older, slower response for "sto" can overwrite the results
  // for "stone creek".
  const reqSeq = useRef(0);
  const selectedRef = useRef(false);

  const listboxId = useId();
  const reduce = useReducedMotion();

  if (!sessionToken.current) sessionToken.current = newSessionToken();

  useEffect(() => {
    if (autoFocus && typeof window !== "undefined" && window.innerWidth > 768) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  // Close on outside click so the dropdown never strands itself over the page.
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (selectedRef.current) return;
    if (q.length < MIN_CHARS) {
      setPredictions([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const seq = ++reqSeq.current;
    const controller = new AbortController();

    const timer = setTimeout(() => {
      fetch(
        `/api/places/autocomplete?q=${encodeURIComponent(q)}&token=${encodeURIComponent(sessionToken.current)}`,
        { signal: controller.signal }
      )
        .then((r) => r.json())
        .then((data) => {
          // A stale response for an earlier keystroke must never win.
          if (seq !== reqSeq.current) return;
          const next: Prediction[] = data.predictions ?? [];
          setPredictions(next);
          setOpen(next.length > 0);
          setActiveIdx(-1);
          setLoading(false);
        })
        .catch(() => {
          if (seq !== reqSeq.current) return;
          setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const choose = useCallback(
    (p: Prediction) => {
      // Freeze the input on the chosen name without firing another lookup for it.
      selectedRef.current = true;
      setQuery(p.name);
      setOpen(false);
      setPredictions([]);
      onSelect(p, sessionToken.current);
      // The session is spent once Details is called against it; the next search
      // must start a fresh one or Google bills per keystroke.
      sessionToken.current = newSessionToken();
    },
    [onSelect]
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || predictions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % predictions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? predictions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (activeIdx >= 0) {
        e.preventDefault();
        choose(predictions[activeIdx]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", maxWidth: 660, minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          border: "1px solid var(--rule)",
          borderRadius: 8,
          background: "var(--bg-soft)",
          overflow: "hidden",
          transition: "border-color 180ms ease, box-shadow 180ms ease",
          ...(open ? { borderColor: "var(--accent)", boxShadow: "0 0 0 3px rgba(137,207,240,0.10)" } : {}),
        }}
      >
        <span
          aria-hidden="true"
          style={{ display: "flex", alignItems: "center", paddingLeft: 16, color: "var(--muted)", flexShrink: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            selectedRef.current = false;
            setQuery(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder="Start typing your business name"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIdx >= 0 ? `${listboxId}-opt-${activeIdx}` : undefined}
          aria-label="Search for your business"
          style={{
            flex: 1,
            border: 0,
            outline: "none",
            background: "transparent",
            padding: "16px 14px",
            fontSize: "clamp(15px, 3.2vw, 17px)",
            color: "var(--fg)",
            letterSpacing: "-0.01em",
            minHeight: 54,
            minWidth: 0,
          }}
        />

        {loading && (
          <span
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: 12,
              color: "var(--accent)",
              flexShrink: 0,
            }}
          >
            <span className="ts-spinner" />
          </span>
        )}

        {/* Attached CTA, not a floating callout: pressing it selects the top
            result if one is showing, otherwise just focuses the input. Real
            affordance, not decoration. */}
        <button
          type="button"
          className="business-search-cta"
          onClick={() => {
            if (predictions.length > 0) choose(predictions[activeIdx >= 0 ? activeIdx : 0]);
            else inputRef.current?.focus();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            flexShrink: 0,
            border: 0,
            borderRadius: "0 7px 7px 0",
            padding: "0 18px",
            background: "var(--bg)",
            color: "var(--accent)",
            fontSize: 13.5,
            fontWeight: 700,
            letterSpacing: "-0.005em",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <span className="business-search-cta-label">Free audit</span>
          <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>↑</span>
        </button>
      </div>

      {/* Screen readers get the result count; the visual list alone is silent. */}
      <div role="status" aria-live="polite" className="sr-only">
        {open && predictions.length > 0 ? `${predictions.length} businesses found` : ""}
      </div>

      <AnimatePresence>
        {open && predictions.length > 0 && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label="Business results"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              zIndex: 40,
              margin: 0,
              padding: 6,
              listStyle: "none",
              background: "var(--bg-soft)",
              border: "1px solid var(--rule)",
              borderRadius: 8,
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            {predictions.map((p, i) => (
              <li
                key={p.placeId}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={i === activeIdx}
                onMouseEnter={() => setActiveIdx(i)}
                // mousedown, not click: the input's blur would close the list
                // before a click ever lands.
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(p);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 12px",
                  borderRadius: 5,
                  cursor: "pointer",
                  background: i === activeIdx ? "rgba(137,207,240,0.08)" : "transparent",
                  transition: "background 120ms ease",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ color: i === activeIdx ? "var(--accent)" : "var(--muted)", flexShrink: 0, display: "flex" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                </span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14.5,
                      color: "var(--fg)",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      ...mono,
                      display: "block",
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.address}
                  </span>
                </span>
                {i === activeIdx && (
                  <span aria-hidden="true" style={{ ...mono, fontSize: 10, color: "var(--accent)", flexShrink: 0 }}>
                    ↵
                  </span>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
