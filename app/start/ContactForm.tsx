"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ border: "1px solid var(--rule)", background: "var(--bg-soft)", padding: "40px 36px" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14 }}>Sent</div>
        <div style={{ fontSize: 22, lineHeight: 1.3 }}>Got it. We&apos;ll write back before the day is out.</div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 28, border: "1px solid var(--rule)", padding: "40px 36px", background: "var(--bg-soft)" }}>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit" }} />
      </div>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you looking for?"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 120 }} />
      </div>
      <button type="submit" style={{ background: "var(--accent)", border: 0, color: "var(--accent-ink)", padding: "18px 28px", fontSize: 15, borderRadius: 2, cursor: "pointer", justifySelf: "start" }}>
        Get my plan →
      </button>
    </form>
  );
}
