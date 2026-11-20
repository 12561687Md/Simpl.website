"use client";

import { useRef, useState } from "react";
import { track } from "../../lib/analytics";
import { Honeypot, SmsConsent, useFormTimer } from "../engine/FormExtras";
import { INDUSTRIES } from "../../lib/site";

/**
 * "See your market" request. Same path as every Simpl lead form: POST
 * /api/contact (DB row + team notification), forwarded server-side to the
 * backend's /lead/contact for the CRM. Service tag: "See your market".
 */
export default function MarketForm({ sourcePage, idPrefix = "mk", defaultTrade = "" }: { sourcePage: string; idPrefix?: string; defaultTrade?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const elapsed = useFormTimer();
  const formRef = useRef<HTMLFormElement>(null);
  const id = (k: string) => `${idPrefix}-${k}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const name = get("name");
    const email = get("email");
    if (name.length < 2) return setError("Tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid work email.");
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
          company: get("company"),
          service: "See your market",
          sourcePage,
          smsConsent,
          hp: get("hp"),
          elapsedMs: elapsed(),
          message: [`Trade: ${get("trade") || "(not given)"}`, `Territory: ${get("territory") || "(not given)"}`].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Could not send. Try again.");
      track("generate_lead", { form: "see_your_market" });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div role="status">
        <div className="m-label m-blue" style={{ marginBottom: 10 }}>Request received</div>
        <p className="m-h3">We&apos;ll be in touch within one business day.</p>
        <p className="m-body">We&apos;ll look at what the public record says about your territory before we talk. Need us sooner? Call <a className="m-link" href="tel:+19194289452">(919) 428-9452</a>.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="eg-form" onSubmit={onSubmit} noValidate>
      <Honeypot id={id("hp")} />
      <div className="row2">
        <div>
          <label htmlFor={id("name")}>Your name</label>
          <input id={id("name")} name="name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor={id("email")}>Work email</label>
          <input id={id("email")} name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="row2">
        <div>
          <label htmlFor={id("company")}>Company</label>
          <input id={id("company")} name="company" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor={id("trade")}>Your trade</label>
          <select id={id("trade")} name="trade" defaultValue={defaultTrade}>
            <option value="">Choose one</option>
            {INDUSTRIES.map((i) => (
              <option key={i.slug} value={i.label}>{i.label}</option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
      </div>
      <div className="row2">
        <div>
          <label htmlFor={id("territory")}>Your territory</label>
          <input id={id("territory")} name="territory" placeholder="e.g. Maryland, or Dallas-Fort Worth" />
        </div>
        <div>
          <label htmlFor={id("phone")}>Phone (optional)</label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <SmsConsent id={id("sms")} />
      {error && <div className="err" role="alert">{error}</div>}
      <div>
        <button type="submit" className="m-btn primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "See your market"} <span className="arr" aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </form>
  );
}
