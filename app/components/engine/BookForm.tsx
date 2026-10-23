"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "../../lib/analytics";
import { Honeypot, SmsConsent, useFormTimer } from "./FormExtras";

/**
 * "Book a call" request. Posts to /api/contact (DB row + team notification,
 * then forwarded to the backend's /lead/contact for the CRM), tagged service
 * "Book a call". Shown on /book until a booking calendar link is set, and
 * under the calendar after that.
 */
export default function BookForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const elapsed = useFormTimer();
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from the query string so a link from the scan report email lands
  // with what we already know filled in. Runs once on mount, only fills empty
  // fields, and caps length so a crafted link cannot stuff the form.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const q = new URLSearchParams(window.location.search);
    const map: Record<string, string | null> = {
      name: q.get("name"),
      email: q.get("email"),
      phone: q.get("phone"),
      company: q.get("company") || q.get("website"),
      topic: q.get("topic") || q.get("message"),
    };
    for (const [field, value] of Object.entries(map)) {
      const el = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && !el.value && value && value.trim()) el.value = value.trim().slice(0, 1000);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const name = get("name");
    const email = get("email");
    if (name.length < 2) return setError("Tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email.");
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
          service: "Book a call",
          sourcePage: "/book",
          smsConsent,
          hp: get("hp"),
          elapsedMs: elapsed(),
          message: [`Best times: ${get("times") || "(not given)"}`, get("topic") ? `Topic: ${get("topic")}` : null]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Could not send. Try again.");
      track("generate_lead", { form: "book_a_call" });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div>
        <div className="eg-eyebrow">Request received</div>
        <h2 className="eg-h3" style={{ fontSize: 24 }}>We&apos;ll confirm a time within one business day.</h2>
        <p className="eg-body">Watch your inbox for a calendar invite. Need us sooner? Call <a className="eg-link" href="tel:+19194289452">(919) 428-9452</a>.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="eg-form" onSubmit={onSubmit} noValidate>
      <Honeypot id="bk-hp" />
      <div className="row2">
        <div>
          <label htmlFor="bk-name">Your name</label>
          <input id="bk-name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="bk-email">Email</label>
          <input id="bk-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="row2">
        <div>
          <label htmlFor="bk-company">Company</label>
          <input id="bk-company" name="company" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="bk-phone">Phone (optional)</label>
          <input id="bk-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="bk-times">Best days and times</label>
        <input id="bk-times" name="times" placeholder="e.g. Tue or Wed afternoon, Eastern" />
      </div>
      <div>
        <label htmlFor="bk-topic">What do you want to cover? (optional)</label>
        <textarea id="bk-topic" name="topic" rows={3} placeholder="What you sell, your territory, or the local business you want found" />
      </div>
      <SmsConsent id="bk-sms" />
      {error && <div className="err" role="alert">{error}</div>}
      <div>
        <button type="submit" className="eg-btn primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Book a call"}
        </button>
      </div>
    </form>
  );
}
