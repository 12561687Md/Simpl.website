"use client";

import { useState } from "react";

/** Turns "Acme Security" into acme-security and sends them to acme-security.simpl.pro. */
export default function PortalLogin() {
  const [name, setName] = useState("");
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);

  return (
    <form
      className="eg-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (slug) window.location.href = `https://${slug}.simpl.pro`;
      }}
    >
      <div>
        <label htmlFor="portal-name">Your portal address</label>
        <div style={{ display: "flex", alignItems: "stretch", border: "1px solid var(--rule-strong)", borderRadius: 12, overflow: "hidden", background: "var(--bg-elev)" }}>
          <input
            id="portal-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="yourcompany"
            autoComplete="organization"
            autoCapitalize="none"
            spellCheck={false}
            style={{ border: 0, borderRadius: 0, flex: 1, minWidth: 0 }}
          />
          <span className="mono" style={{ display: "flex", alignItems: "center", padding: "0 16px", fontSize: 14, color: "var(--muted)", borderLeft: "1px solid var(--rule)" }}>.simpl.pro</span>
        </div>
      </div>
      <button type="submit" className="eg-btn primary cta-primary" disabled={!slug} style={{ justifyContent: "center", opacity: slug ? 1 : 0.6 }}>
        {slug ? `Go to ${slug}.simpl.pro` : "Go to my portal"} <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
