"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";

const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name (at least 2 characters)."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().regex(PHONE_REGEX, "Enter a valid phone number.").optional().or(z.literal("")),
  // Must match the API's limit, or an over-long value passes here and then fails
  // server-side as a dead-end submission instead of a field error.
  website: z.string().max(200, "That's too long for a website address.").optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted)",
  display: "block",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  color: "var(--fg)",
  border: 0,
  borderBottom: "1px solid var(--rule-strong)",
  padding: "16px 0",
  fontSize: 17,
  outline: "none",
  fontFamily: "inherit",
};

const errStyle: React.CSSProperties = { color: "#E05252", fontSize: 13, marginTop: 6 };

export default function ContactForm({
  ctaLabel = "Get my plan",
  sourcePage = "/start",
}: {
  ctaLabel?: string;
  /** Which page this form sits on. Sent so leads are attributable. */
  sourcePage?: string;
}) {
  const reduce = useReducedMotion();
  // Own success state rather than RHF's isSubmitSuccessful. RHF marks a submit
  // successful whenever the handler resolves, so the only way to suppress a
  // false success screen with that flag is to throw, which surfaces as an
  // unhandled rejection. Tracking it here lets us fail quietly into the form.
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Validate on blur, not only on submit, so people fix errors as they go.
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "", website: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sourcePage }),
      });
    } catch {
      // Offline or DNS/network failure. Keep the person in the form with a real
      // message instead of letting the rejection escape.
      setError("root", { message: "Could not reach us. Check your connection and try again, or email team@simpl.pro." });
      return;
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      setError("root", { message: data.error || "Could not send your message. Try again." });
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="status"
        aria-live="polite"
        style={{ border: "1px solid var(--ok)", background: "var(--bg-soft)", padding: "40px 36px" }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--ok)", textTransform: "uppercase", marginBottom: 14 }}>Sent</div>
        <div style={{ fontSize: 22, lineHeight: 1.3 }}>Message sent. We&apos;ll reply within 4 hours.</div>
        <p style={{ marginTop: 14, marginBottom: 0, fontSize: 15, color: "var(--muted)", lineHeight: 1.55 }}>
          A person reads every one of these. Not a sequence, not a bot.
        </p>
      </motion.div>
    );
  }

  // Fields reveal as a single coherent motion, not six competing ones.
  const fields = [
    { id: "cf-name", label: "Name", el: <input id="cf-name" type="text" autoComplete="name" {...register("name")} placeholder="Your name" style={inputStyle} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} />, err: errors.name, errId: "cf-name-err" },
    { id: "cf-email", label: "Email", el: <input id="cf-email" type="email" autoComplete="email" {...register("email")} placeholder="you@company.com" style={inputStyle} aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} />, err: errors.email, errId: "cf-email-err" },
    { id: "cf-phone", label: "Phone (optional)", el: <input id="cf-phone" type="tel" autoComplete="tel" {...register("phone")} placeholder="(555) 555-5555" style={inputStyle} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "cf-phone-err" : undefined} />, err: errors.phone, errId: "cf-phone-err" },
    { id: "cf-website", label: "Your website (optional)", el: <input id="cf-website" type="text" autoComplete="url" {...register("website")} placeholder="yourbusiness.com" style={inputStyle} />, err: undefined, errId: "" },
    { id: "cf-message", label: "What's going on?", el: <textarea id="cf-message" {...register("message")} placeholder="Phone's not ringing like it used to. Not sure why." style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} />, err: undefined, errId: "" },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ display: "grid", gap: 26, border: "1px solid var(--rule)", padding: "40px 36px", background: "var(--bg-soft)" }}
    >
      {fields.map((f, i) => (
        <motion.div
          key={f.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.32, ease: "easeOut", delay: reduce ? 0 : 0.06 * i }}
        >
          <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
          {f.el}
          {f.err && <div id={f.errId} role="alert" style={errStyle}>{f.err.message}</div>}
        </motion.div>
      ))}

      {errors.root && <div role="alert" style={{ ...errStyle, marginTop: 0, fontSize: 14 }}>{errors.root.message}</div>}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.32, ease: "easeOut", delay: reduce ? 0 : 0.06 * fields.length }}
        className="cta-primary"
        style={{ border: 0, color: "var(--accent-ink)", padding: "18px 28px", fontSize: 15, fontWeight: 600, borderRadius: 2, cursor: isSubmitting ? "wait" : "pointer", justifySelf: "start", opacity: isSubmitting ? 0.7 : 1, minHeight: 44 }}
      >
        {isSubmitting ? "Sending..." : `${ctaLabel} →`}
      </motion.button>
    </motion.form>
  );
}
