"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name (at least 2 characters)."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().regex(PHONE_REGEX, "Enter a valid phone number.").optional().or(z.literal("")),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      setError("root", { message: data.error || "Could not send your message. Try again." });
      throw new Error(data.error || "submit failed");
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ border: "1px solid var(--rule)", background: "var(--bg-soft)", padding: "40px 36px" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14 }}>Sent</div>
        <div style={{ fontSize: 22, lineHeight: 1.3 }}>Message sent. We&apos;ll reply within 4 hours.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 28, border: "1px solid var(--rule)", padding: "40px 36px", background: "var(--bg-soft)" }}>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Name</label>
        <input type="text" {...register("name")} placeholder="Your name"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit" }} />
        {errors.name && <div style={{ color: "#E05252", fontSize: 13, marginTop: 6 }}>{errors.name.message}</div>}
      </div>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Email</label>
        <input type="email" {...register("email")} placeholder="you@company.com"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit" }} />
        {errors.email && <div style={{ color: "#E05252", fontSize: 13, marginTop: 6 }}>{errors.email.message}</div>}
      </div>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Phone (optional)</label>
        <input type="tel" {...register("phone")} placeholder="(555) 555-5555"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit" }} />
        {errors.phone && <div style={{ color: "#E05252", fontSize: 13, marginTop: 6 }}>{errors.phone.message}</div>}
      </div>
      <div>
        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Message</label>
        <textarea {...register("message")} placeholder="What are you looking for?"
          style={{ width: "100%", background: "transparent", color: "var(--fg)", border: 0, borderBottom: "1px solid var(--rule)", padding: "16px 0", fontSize: 17, outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 120 }} />
      </div>
      {errors.root && <div style={{ color: "#E05252", fontSize: 14 }}>{errors.root.message}</div>}
      <button type="submit" disabled={isSubmitting}
        style={{ background: "var(--accent)", border: 0, color: "var(--accent-ink)", padding: "18px 28px", fontSize: 15, borderRadius: 2, cursor: isSubmitting ? "wait" : "pointer", justifySelf: "start", opacity: isSubmitting ? 0.7 : 1 }}>
        {isSubmitting ? "Sending…" : "Get my plan →"}
      </button>
    </form>
  );
}
