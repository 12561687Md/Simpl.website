import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "../../../lib/db";
import { resend } from "../../../lib/resend";
import { isRateLimited, getClientIp } from "../../../lib/rate-limit";
import { esc } from "../../lib/email-brand";
import { confirmationEmailHtml } from "../../lib/emails/contact-confirmation";
import { forwardLead } from "../../lib/backend";

const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().regex(PHONE_REGEX, "Enter a valid phone number.").optional().or(z.literal("")),
  message: z.string().optional(),
  service: z.string().optional(),
  // The lead's own site. There is no `website` column on `leads` yet, so this is
  // folded into `message` and surfaced in the notification email rather than
  // risking a blind migration on the one flow that must never break.
  // TODO: add a `website` column to `leads` and store it properly.
  website: z.string().max(200).optional(),
  company: z.string().max(160).optional(),
  // Optional, unchecked by default on every form (carrier/A2P rules). Requires a phone.
  smsConsent: z.boolean().optional(),
  // Bot checks: a hidden field people never fill, and how long the form was open.
  hp: z.string().max(200).optional(),
  elapsedMs: z.number().nonnegative().optional(),
  // Which page the lead came from. Was hardcoded to "/start", which became wrong
  // the moment a second page carried the form.
  sourcePage: z.string().max(120).optional(),
});

// Any of our own page paths (lowercase slug segments only), so a caller can't
// write arbitrary strings into our own reporting. Widened 2026-10-22 when the
// form moved onto /top-25, the service pages and the blog.
const SOURCE_PAGE_RE = /^\/[a-z0-9\-/]{0,118}$/;

const RATE_LIMIT_MAX = 5;
// A person needs a few seconds to fill even the short form.
const MIN_FILL_MS = 2500;
const TEAM_INBOX = "team@simpl.pro";

function notificationEmailHtml(params: { name: string; email: string; phone?: string; message?: string; service?: string; website?: string; company?: string; sourcePage?: string; smsConsent?: boolean }) {
  const { name, email, phone, message, service, website, company, sourcePage, smsConsent } = params;
  const row = (label: string, value: string, pre = false) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;${pre ? "vertical-align:top;" : ""}">${label}</td><td style="padding:4px 0;${pre ? "white-space:pre-wrap;" : ""}">${value}</td></tr>`;
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:24px;">
    <h2 style="font-size:18px;margin:0 0 16px;">New contact form submission</h2>
    <table style="border-collapse:collapse;">
      <tbody>
        ${row("Name", esc(name))}
        ${row("Email", esc(email))}
        ${row("Phone", phone ? esc(phone) : "(none)")}
        ${company ? row("Company", esc(company)) : ""}
        ${row("Texts OK", smsConsent ? "Yes (checked the optional box)" : "No, do not text")}
        ${website ? row("Website", esc(website)) : ""}
        ${service ? row("Service", esc(service)) : ""}
        ${sourcePage ? row("From page", esc(sourcePage)) : ""}
        ${row("Message", message ? esc(message) : "(none)", true)}
      </tbody>
    </table>
    ${website ? `<p style="margin-top:16px;font-size:14px;"><a href="https://www.simpl.pro/scan?url=${encodeURIComponent(website)}">Scan ${esc(website)} before you reply</a></p>` : ""}
  </div>`;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`contact:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid input.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const { name, email, phone, message, service, website, company, smsConsent, hp, elapsedMs, sourcePage } = parsed.data;

    // Bots get the same success a person gets, and nothing is stored or sent.
    if ((hp && hp.trim()) || (elapsedMs !== undefined && elapsedMs < MIN_FILL_MS)) {
      return NextResponse.json({ success: true });
    }
    if (smsConsent && !phone) {
      return NextResponse.json(
        { success: false, error: "Add a phone number to get texts, or leave the box unchecked." },
        { status: 400 }
      );
    }

    // Only accept source pages we actually ship, so a caller can't write
    // arbitrary strings into our own reporting.
    const fromPage = sourcePage && SOURCE_PAGE_RE.test(sourcePage) ? sourcePage : "/start";

    // No `website` column on `leads` yet, so keep it with the message instead of
    // dropping it. See the schema comment above.
    const storedMessage = [
      company ? `Company: ${company}` : null,
      website ? `Website: ${website}` : null,
      smsConsent ? "Texts OK: yes (optional box checked)" : null,
      message || null,
    ]
      .filter(Boolean)
      .join("\n\n") || null;

    // Two copies, so one outage never loses a lead: the website's own `leads`
    // row, and the backend's (which feeds the CRM when that is switched on).
    const [dbResult, forwarded] = await Promise.all([
      getPool()
        .query(
          `INSERT INTO leads (name, email, phone, message, source, source_page)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [name, email, phone || null, storedMessage, "contact_form", fromPage]
        )
        .then(() => true)
        .catch((dbError) => {
          console.error("contact: failed to insert lead", dbError instanceof Error ? dbError.name : "error");
          return false;
        }),
      forwardLead(
        "/lead/contact",
        {
          name,
          email,
          phone: phone || undefined,
          company: company || undefined,
          website: website || undefined,
          message: message || undefined,
          service: service || undefined,
          source_page: fromPage,
          sms_consent: smsConsent === true,
        },
        { ip, userAgent: req.headers.get("user-agent") }
      ),
    ]);
    if (!dbResult && !forwarded) {
      return NextResponse.json(
        { success: false, error: "Could not send your message. Try again." },
        { status: 500 }
      );
    }

    try {
      await resend.emails.send({
        from: "Simpl <team@simpl.pro>",
        to: email,
        subject: "We got your message",
        replyTo: TEAM_INBOX,
        html: confirmationEmailHtml({ name, email, phone, service, website, message }),
      });
    } catch (emailError) {
      console.error("contact: failed to send confirmation email via Resend", emailError);
    }

    try {
      await resend.emails.send({
        from: "Simpl <team@simpl.pro>",
        to: TEAM_INBOX,
        subject: `New lead${service ? ` [${service}]` : ""}: ${name}${website ? ` (${website})` : ""}`,
        html: notificationEmailHtml({ name, email, phone, message, service, website, company, sourcePage: fromPage, smsConsent }),
      });
    } catch (emailError) {
      console.error("contact: failed to send notification email via Resend", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("contact: unexpected error", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
