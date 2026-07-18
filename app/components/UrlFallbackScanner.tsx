"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScanTool from "./ScanTool";

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";
const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The URL fallback used to drop into ScanTool directly, a plainer inline
 * result with no business photos, no map, no theater, the generic
 * experience regardless of which business it was. That's wrong: even
 * without a Google listing picked by hand, most real businesses still HAVE
 * one, we just haven't looked it up yet.
 *
 * So this runs a quick backend scan first, purely to recover the Google
 * place_id the backend's own GBP lookup already resolves and verifies
 * (backend/gbp_finder.py, matched against the domain before trusting it,
 * see backend comments). If found, it hands off into the exact same
 * /audit flow a name-search gets: real photos, the map, the theater,
 * the blurred report, instant unlock. Only when no verified GBP match
 * exists does it fall back to ScanTool's plainer inline result, which is
 * still a real, honest scan, just without the identity the business
 * database can't independently confirm.
 */
export default function UrlFallbackScanner() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "looking" | "not-found">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed || status === "looking") return;
    setStatus("looking");

    try {
      const res = await fetch(`${SIMPL_API}/scan/quick`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.gbp_place_id) {
        const q = new URLSearchParams({
          place: data.gbp_place_id,
          name: data.business?.name ?? "",
          address: data.business?.location ?? "",
        });
        router.push(`/audit?${q}`);
        return;
      }
    } catch {
      // Falls through to the plain scan below either way.
    }
    setStatus("not-found");
  }

  // No verified Google listing for this URL: still a real scan, just the
  // plainer path. ScanTool takes it from here with its own full flow —
  // handed the URL that was already typed (ScanTool owns its own `url`
  // state, so without this the visitor would have to retype what they just
  // submitted) and told to run immediately, no second click needed.
  if (status === "not-found") {
    return <ScanTool compact initialUrl={url} autoRun />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "stretch", border: "1px solid var(--rule)", borderRadius: 8, background: "var(--bg-soft)", overflow: "hidden" }}>
        <span className="hide-mobile" style={{ ...mono, display: "flex", alignItems: "center", paddingLeft: 16, color: "var(--muted)", fontSize: 14, flexShrink: 0 }}>
          https://
        </span>
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourbusiness.com"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          disabled={status === "looking"}
          style={{ flex: 1, border: 0, outline: "none", background: "transparent", padding: "16px 14px 16px 8px", fontSize: "clamp(15px, 3.2vw, 17px)", color: "var(--fg)", letterSpacing: "-0.01em", minHeight: 54, minWidth: 0 }}
        />
        <button
          type="submit"
          disabled={status === "looking"}
          className="cta-primary"
          style={{ border: 0, color: "var(--accent-ink)", padding: "0 20px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: status === "looking" ? "wait" : "pointer", opacity: status === "looking" ? 0.7 : 1 }}
        >
          {status === "looking" ? "Finding your business…" : "Scan →"}
        </button>
      </form>
    </div>
  );
}
