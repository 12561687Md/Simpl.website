import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "../../../lib/db";
import { resend } from "../../../lib/resend";
import { isRateLimited, getClientIp } from "../../../lib/rate-limit";

const findingSchema = z.object({
  severity: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
});

const categorySchema = z.object({
  grade: z.string().optional(),
  score: z.number().optional(),
  max: z.number().optional(),
});

const captureEmailSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(200).optional(),
  email: z.string().email("Enter a valid email address."),
  scanUrl: z.string().min(1, "Missing scan URL."),
  scanScore: z.number().optional(),
  scanGrade: z.string().optional(),
  businessName: z.string().optional(),
  placeId: z.string().max(255).optional(),
  // The lead-quality signal. `owner` is a prospect; `works_with` is very often a
  // competing agency pulling a free audit on someone else's listing. Both get
  // their report, only one is worth outreach. Enumerated so an arbitrary string
  // can never reach the routing logic.
  relationship: z.enum(["owner", "works_with", "other"]).optional(),
  optIn: z.boolean().optional(),
  findings: z.array(findingSchema).optional(),
  categories: z.record(z.string(), categorySchema).optional(),
});

const RATE_LIMIT_MAX = 10;

function gradeColor(grade: string | undefined): string {
  // Missing or N/A is neutral grey, never a pass colour: an absent grade must
  // not read as a passing one in the emailed report.
  // Lightened from the on-white originals so they hold contrast on #0B0C0D.
  if (!grade || grade === "N/A") return "#9C9A92";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#4ADE80";
  if (grade.startsWith("C")) return "#F0B849";
  return "#F26D6D";
}

function buildEmailHtml(params: {
  email: string;
  name?: string;
  businessName?: string;
  placeId?: string;
  scanUrl: string;
  scanScore?: number;
  scanGrade?: string;
  findings?: { severity?: string; title?: string; category?: string }[];
  categories?: Record<string, { grade?: string; score?: number; max?: number }>;
}) {
  const { name, businessName, placeId, scanUrl, scanScore, scanGrade, findings = [], categories = {} } = params;
  const firstName = name?.trim().split(/\s+/)[0];
  const color = gradeColor(scanGrade);

  // Brand palette, locked (brand/BRAND_KIT.md). Inlined rather than referenced,
  // because email clients strip CSS variables and most strip <style> blocks.
  const BG = "#0B0C0D";        // midnight, the page ground
  const PANEL = "#131517";     // cards and panels
  const INK = "#F3F2ED";       // primary text
  const MUTED = "#ADACA7";     // secondary text and labels
  const RULE = "#262829";      // borders and dividers
  const ACCENT = "#89CFF0";    // baby blue. CTA only, never body text

  // Send them back to THEIR report, not to a pricing page. `/start` was retired
  // (noindexed, out of the nav), so the old CTA was a dead end. The audit route
  // rehydrates from placeId; without one, the scanner itself is the next best step.
  const reportUrl = placeId
    ? `https://simpl.pro/audit?placeId=${encodeURIComponent(placeId)}`
    : "https://simpl.pro/scan";

  // Land them on the form with everything we already know already filled in.
  // A real <form> cannot live in an email (Gmail and Outlook strip <form> and
  // <input> outright), so the closest we can get is removing the typing.
  const q = new URLSearchParams();
  if (name) q.set("name", name);
  q.set("email", params.email);
  if (scanUrl) q.set("website", scanUrl);
  q.set(
    "message",
    businessName
      ? `Saw my Simpl Score for ${businessName}. I would like to talk through what to fix first.`
      : `Saw my Simpl Score. I would like to talk through what to fix first.`
  );
  const contactUrl = `https://simpl.pro/start-now?${q.toString()}`;

  const topFindings = findings
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .slice(0, 5);

  const categoryRows = Object.entries(categories)
    .map(
      ([name, data]) => `
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid ${RULE};font-size:14px;color:${INK};">${name}</td>
          <td style="padding:11px 0;border-bottom:1px solid ${RULE};font-size:14px;color:${gradeColor(data.grade)};font-weight:700;text-align:right;white-space:nowrap;">${data.grade ?? ""}</td>
        </tr>`
    )
    .join("");

  const findingsRows = topFindings
    .map(
      (f) => `
        <tr>
          <td style="padding:0 0 10px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="3" bgcolor="${f.severity === "critical" ? "#F26D6D" : "#F0B849"}" style="width:3px;background:${f.severity === "critical" ? "#F26D6D" : "#F0B849"};font-size:0;line-height:0;">&nbsp;</td>
                <td style="padding:2px 0 2px 14px;font-size:14px;line-height:1.5;color:${INK};">${f.title ?? ""}</td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");

  // Table-based and fully inlined on purpose. Gmail strips <style> when a message
  // is clipped, Outlook renders through Word (no flexbox, no grid), and most
  // clients block remote images by default, so the wordmark carries a styled alt
  // that still reads as the brand if it never loads.
  //
  // The two columns use the fluid-hybrid pattern: inline-block divs with a
  // max-width, wrapped in MSO conditional ghost tables. Outlook gets a real
  // table, everyone else gets blocks that stack on their own on a phone with no
  // media query, which matters because Gmail drops <style> on clipped messages.
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
</head>
<body style="margin:0;padding:0;background:${BG};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${BG}" style="background:${BG};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:600px;">

        <tr>
          <td align="center" style="padding:0 0 24px;">
            <img src="https://simpl.pro/brand/simpl-wordmark-dark.png" width="104" height="26" alt="Simpl"
                 style="display:block;border:0;outline:none;width:104px;height:auto;color:${INK};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:.18em;">
          </td>
        </tr>

        <tr>
          <td bgcolor="${PANEL}" style="background:${PANEL};border:1px solid ${RULE};border-radius:14px;padding:30px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

            <!-- Header is fluid-hybrid too, not a two-cell table. A table cell
                 cannot shrink below its content, and a long business name at 23px
                 forced the row wider than the card on a phone, pushing the grade
                 ring off the edge. Inline-block blocks stack instead. -->
            <div style="font-size:0;">
              <!--[if mso]><table role="presentation" width="100%"><tr><td width="420" valign="top"><![endif]-->
              <div style="display:inline-block;width:100%;max-width:420px;vertical-align:top;font-size:14px;">
                <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${MUTED};padding-bottom:16px;">Simpl Score Report</div>
                ${firstName ? `<div style="font-size:15px;color:${MUTED};padding-bottom:6px;">Hey ${firstName},</div>` : ""}
                ${businessName ? `<div style="font-size:23px;font-weight:700;color:${INK};letter-spacing:-.02em;line-height:1.25;">${businessName}</div>` : ""}
                <div style="font-size:12px;color:${MUTED};padding-top:6px;word-break:break-all;">${scanUrl}</div>
              </div>
              <!--[if mso]></td><td width="110" valign="top"><![endif]-->
              <div style="display:inline-block;width:100%;max-width:110px;vertical-align:top;text-align:center;font-size:14px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                  <tr>
                    <td width="84" height="84" align="center" valign="middle"
                        style="width:84px;height:84px;border:3px solid ${color};border-radius:42px;font-size:32px;font-weight:700;color:${color};line-height:1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                      ${scanGrade ?? ""}
                    </td>
                  </tr>
                  ${scanScore !== undefined ? `<tr><td align="center" style="padding-top:8px;font-size:12px;color:${MUTED};">${scanScore}% overall</td></tr>` : ""}
                </table>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
            </div>

            <div style="height:1px;background:${RULE};font-size:0;line-height:0;margin:26px 0 24px;">&nbsp;</div>

            <div style="font-size:0;">
              <!--[if mso]><table role="presentation" width="100%"><tr><td width="320" valign="top"><![endif]-->
              <div style="display:inline-block;width:100%;max-width:320px;vertical-align:top;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                <div style="padding-right:20px;">

                ${categoryRows ? `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tbody>${categoryRows}</tbody>
                </table>` : ""}

                ${findingsRows ? `
                <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${MUTED};padding:26px 0 14px;">The biggest wins waiting</div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tbody>${findingsRows}</tbody>
                </table>` : ""}

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="padding:22px 0 0;">
                    <a href="${reportUrl}" style="font-size:13px;font-weight:600;color:${ACCENT};text-decoration:none;">See the full report &rarr;</a>
                  </td></tr>
                </table>

                </div>
              </div>
              <!--[if mso]></td><td width="20">&nbsp;</td><td width="200" valign="top"><![endif]-->
              <div style="display:inline-block;width:100%;max-width:200px;vertical-align:top;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:8px;">
                  <tr>
                    <td bgcolor="${BG}" style="background:${BG};border:1px solid rgba(137,207,240,.4);border-radius:12px;padding:20px 18px;">

                      <div style="font-size:17px;font-weight:700;color:${INK};line-height:1.35;">Rather just talk it through?</div>
                      <div style="font-size:13px;line-height:1.6;color:${MUTED};padding-top:10px;">
                        Fifteen minutes and we will tell you which of these to fix first, and what it is worth. No pitch, nothing to sign.
                      </div>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr><td style="padding:18px 0 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td bgcolor="${ACCENT}" align="center" style="background:${ACCENT};border-radius:999px;">
                                <a href="${contactUrl}" style="display:block;padding:13px 10px;font-size:14px;font-weight:700;color:#081420;text-decoration:none;border-radius:999px;">
                                  Book a free call
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td></tr>
                      </table>

                      <div style="height:1px;background:${RULE};font-size:0;line-height:0;margin:18px 0;">&nbsp;</div>

                      <div style="font-size:13px;line-height:1.7;color:${MUTED};">
                        Call or text
                        <div style="padding-top:2px;"><a href="tel:+19194289452" style="color:${INK};text-decoration:none;font-weight:700;font-size:16px;">(919) 428-9452</a></div>
                      </div>

                      <div style="font-size:13px;line-height:1.6;color:${MUTED};padding-top:14px;">
                        Or just hit reply. A real person reads it, usually within 4 hours.
                      </div>

                    </td>
                  </tr>
                </table>

              </div>
              <!--[if mso]></td></tr></table><![endif]-->
            </div>

          </td>
        </tr>

        <tr>
          <td align="center" style="padding:24px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            <div style="font-size:12px;color:${MUTED};">Plain and simpl.</div>
            <div style="font-size:12px;color:#6F6D66;padding-top:6px;">
              <a href="https://simpl.pro" style="color:#6F6D66;text-decoration:none;">simpl.pro</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:team@simpl.pro" style="color:#6F6D66;text-decoration:none;">team@simpl.pro</a>
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`capture-email:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }

    const parsed = captureEmailSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Invalid input.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const { name, email, scanUrl, scanScore, scanGrade, businessName, placeId, relationship, optIn, findings, categories } =
      parsed.data;

    try {
      const pool = getPool();
      await pool.query(
        `INSERT INTO leads
           (name, email, source, source_page, scan_url, scan_score, scan_grade, place_id, relationship, opt_in, website)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          name ?? null,
          email,
          "scan_report",
          placeId ? "/audit" : "/scan",
          scanUrl,
          scanScore ?? null,
          scanGrade ?? null,
          placeId ?? null,
          relationship ?? null,
          optIn ?? null,
          scanUrl,
        ]
      );
    } catch (dbError) {
      console.error("capture-email: failed to insert lead", dbError);
      return NextResponse.json(
        { success: false, error: "Could not save your request. Try again." },
        { status: 500 }
      );
    }

    try {
      await resend.emails.send({
        from: "Simpl <team@simpl.pro>",
        to: email,
        subject: `Your Simpl Score: ${scanGrade ?? "N/A"} (${scanScore ?? 0}%)`,
        html: buildEmailHtml({ email, name, businessName, placeId, scanUrl, scanScore, scanGrade, findings, categories }),
      });
    } catch (emailError) {
      console.error("capture-email: failed to send email via Resend", emailError);
      // Lead is already saved. Degrade gracefully so the user still sees success.
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("capture-email: unexpected error", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
