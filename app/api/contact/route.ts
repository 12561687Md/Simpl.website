import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "../../../lib/db";
import { resend } from "../../../lib/resend";
import { isRateLimited, getClientIp } from "../../../lib/rate-limit";

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
  // Which page the lead came from. Was hardcoded to "/start", which became wrong
  // the moment a second page carried the form.
  sourcePage: z.string().max(120).optional(),
});

const ALLOWED_SOURCE_PAGES = new Set(["/start", "/start-now"]);

const RATE_LIMIT_MAX = 5;
const TEAM_INBOX = "team@simpl.pro";

function confirmationEmailHtml() {
  return `
  <div style="background:#f5f5f3;padding:32px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
      <div style="padding:36px 32px 8px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#888;margin-bottom:20px;">SIMPL</div>
        <div style="font-size:20px;font-weight:600;color:#111;margin-bottom:12px;">We got your message</div>
        <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px;">
          Thanks for reaching out. We&rsquo;ll get back to you within 4 hours.
        </p>
        <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 24px;">
          Haven&rsquo;t run your free scan yet? See exactly what&rsquo;s broken on your site in under a minute.
        </p>
      </div>
      <div style="padding:0 32px 36px;">
        <a href="https://simpl.pro/scan" style="display:inline-block;background:#89CFF0;color:#0A140D;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:4px;">
          Run my free scan &rarr;
        </a>
      </div>
      <div style="background:#fafafa;border-top:1px solid #e5e5e5;padding:20px 32px;text-align:center;">
        <div style="font-size:12px;color:#999;">Plain and simpl.</div>
        <div style="font-size:12px;color:#999;margin-top:4px;">SIMPL &middot; simpl.pro</div>
      </div>
    </div>
  </div>`;
}

/** Escape user input before it goes into an HTML email. */
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

function notificationEmailHtml(params: { name: string; email: string; phone?: string; message?: string; service?: string; website?: string; sourcePage?: string }) {
  const { name, email, phone, message, service, website, sourcePage } = params;
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
        ${website ? row("Website", esc(website)) : ""}
        ${service ? row("Service", esc(service)) : ""}
        ${sourcePage ? row("From page", esc(sourcePage)) : ""}
        ${row("Message", message ? esc(message) : "(none)", true)}
      </tbody>
    </table>
    ${website ? `<p style="margin-top:16px;font-size:14px;"><a href="https://simpl.pro/scan?url=${encodeURIComponent(website)}">Scan ${esc(website)} before you reply</a></p>` : ""}
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

    const { name, email, phone, message, service, website, sourcePage } = parsed.data;

    // Only accept source pages we actually ship, so a caller can't write
    // arbitrary strings into our own reporting.
    const fromPage = sourcePage && ALLOWED_SOURCE_PAGES.has(sourcePage) ? sourcePage : "/start";

    // No `website` column on `leads` yet, so keep it with the message instead of
    // dropping it. See the schema comment above.
    const storedMessage = [website ? `Website: ${website}` : null, message || null]
      .filter(Boolean)
      .join("\n\n") || null;

    try {
      const pool = getPool();
      await pool.query(
        `INSERT INTO leads (name, email, phone, message, source, source_page)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, email, phone || null, storedMessage, "contact_form", fromPage]
      );
    } catch (dbError) {
      console.error("contact: failed to insert lead", dbError);
      return NextResponse.json(
        { success: false, error: "Could not send your message. Try again." },
        { status: 500 }
      );
    }

    try {
      await resend.emails.send({
        from: "SIMPL <team@simpl.pro>",
        to: email,
        subject: "We got your message",
        html: confirmationEmailHtml(),
      });
    } catch (emailError) {
      console.error("contact: failed to send confirmation email via Resend", emailError);
    }

    try {
      await resend.emails.send({
        from: "SIMPL <team@simpl.pro>",
        to: TEAM_INBOX,
        subject: `New lead: ${name}${website ? ` (${website})` : ""}`,
        html: notificationEmailHtml({ name, email, phone, message, service, website, sourcePage: fromPage }),
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
