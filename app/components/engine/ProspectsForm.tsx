"use client";

import { useState } from "react";
import { track } from "../../lib/analytics";
import { Honeypot, SmsConsent, useFormTimer } from "./FormExtras";

/**
 * "See your top prospects" request. Posts to /api/contact (DB row + team
 * notification, then forwarded to the backend's /lead/contact for the CRM),
 * tagged service "Top prospects sample"
 * so it's obvious in the inbox which offer the lead came from.
 */
export default function ProspectsForm({ sourcePage = "/top-prospects" }: { sourcePage?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const elapsed = useFormTimer();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const name = get("name");
    const email = get("email");
    const company = get("company");
    const sells = get("sells");
    const territory = get("territory");
    if (name.length < 2) return setError("Tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid work email.");
    if (!company) return setError("Which company is this for?");
    if (!sells) return setError("Tell us what you sell, one line is fine.");
    const smsConsent = f.get("sms") === "yes";
    if (smsConsent && !get("phone")) return setError("Add a phone number to get texts, or leave the box unchecked.");
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: get("phone"),
          website: get("website"),
          company,
          service: "Top prospects sample",
          sourcePage,
          smsConsent,
          hp: get("hp"),
          elapsedMs: elapsed(),
          message: [
            `What they sell: ${sells}`,
            `Territory: ${territory || "(not given)"}`,
            get("notes") ? `Notes: ${get("notes")}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Could not send. Try again.");
      track("generate_lead", { form: "top_prospects" });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="eg-card" style={{ borderColor: "var(--accent-line)" }}>
        <div className="eg-eyebrow">Got it</div>
        <h2 className="eg-h3" style={{ fontSize: 24 }}>We&apos;re mapping your market.</h2>
        <p className="eg-body">
          We will reply within one business day to confirm your territory and your best reasons to call, then build your sample of top prospects.
          Want to talk sooner? Call <a className="eg-link" href="tel:+19194289452">(919) 428-9452</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="eg-form" onSubmit={onSubmit} noValidate>
      <Honeypot id="t25-hp" />
      <div className="row2">
        <div>
          <label htmlFor="t25-name">Your name</label>
          <input id="t25-name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="t25-email">Work email</label>
          <input id="t25-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="row2">
        <div>
          <label htmlFor="t25-company">Company</label>
          <input id="t25-company" name="company" autoComplete="organization" required />
        </div>
        <div>
          <label htmlFor="t25-website">Website (optional)</label>
          <input id="t25-website" name="website" inputMode="url" placeholder="yourcompany.com" />
        </div>
      </div>
      <div>
        <label htmlFor="t25-sells">What you sell, and to whom</label>
        <input id="t25-sells" name="sells" placeholder="e.g. nurse call and access control to assisted living" required />
      </div>
      <div className="row2">
        <div>
          <label htmlFor="t25-territory">Territory</label>
          <input id="t25-territory" name="territory" placeholder="e.g. NC, SC, VA" />
        </div>
        <div>
          <label htmlFor="t25-phone">Phone (optional)</label>
          <input id="t25-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="t25-notes">Anything else (optional)</label>
        <textarea id="t25-notes" name="notes" rows={3} placeholder="The kind of account that's worth the most to you, a market you want to break into..." />
      </div>
      <SmsConsent id="t25-sms" />
      {error && <div className="err" role="alert">{error}</div>}
      <div>
        <button type="submit" className="eg-btn primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "See my top prospects"} <span aria-hidden="true">&rarr;</span>
        </button>
        <p className="mono" style={{ marginTop: 14, fontSize: 11.5, color: "var(--muted)", letterSpacing: "0.04em" }}>
          Free. No contract. A real person replies within one business day.
        </p>
      </div>
    </form>
  );
}
