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

  // Table-based and fully inlined on purpose. Gmail strips <style> blocks when a
  // message is clipped, Outlook renders through Word (no flexbox, no grid, no
  // border-radius), and most clients block remote images by default, so the
  // wordmark carries a styled alt text that still reads as the brand if it never
  // loads. color-scheme + explicit bgcolor stop dark-mode clients inverting a
  // design that is already dark.
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

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;">

        <tr>
          <td align="center" style="padding:0 0 26px;">
            <img src="https://simpl.pro/brand/simpl-wordmark-dark.png" width="104" height="26" alt="Simpl"
                 style="display:block;border:0;outline:none;width:104px;height:auto;color:${INK};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:.18em;">
          </td>
        </tr>

        <tr>
          <td bgcolor="${PANEL}" style="background:${PANEL};border:1px solid ${RULE};border-radius:14px;padding:34px 30px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

            <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${MUTED};padding-bottom:20px;">Simpl Score Report</div>
            ${firstName ? `<div style="font-size:15px;color:${MUTED};padding-bottom:8px;">Hey ${firstName},</div>` : ""}
            ${businessName ? `<div style="font-size:25px;font-weight:700;color:${INK};letter-spacing:-.02em;line-height:1.25;">${businessName}</div>` : ""}
            <div style="font-size:13px;color:${MUTED};padding-top:6px;word-break:break-all;">${scanUrl}</div>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding:30px 0 6px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="118" height="118" align="center" valign="middle"
                          style="width:118px;height:118px;border:3px solid ${color};border-radius:59px;font-size:46px;font-weight:700;color:${color};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1;">
                        ${scanGrade ?? ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${scanScore !== undefined ? `<tr><td align="center" style="padding:14px 0 0;font-size:13px;color:${MUTED};">${scanScore}% overall</td></tr>` : ""}
            </table>

            ${categoryRows ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:30px;">
              <tbody>${categoryRows}</tbody>
            </table>` : ""}

            ${findingsRows ? `
            <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${MUTED};padding:32px 0 14px;">The biggest wins waiting</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tbody>${findingsRows}</tbody>
            </table>` : ""}

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding:34px 0 6px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td bgcolor="${ACCENT}" style="background:${ACCENT};border-radius:999px;">
                        <a href="${reportUrl}"
                           style="display:inline-block;padding:15px 34px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#081420;text-decoration:none;border-radius:999px;">
                          See everything we found &rarr;
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">
                  Want us to fix it for you? <a href="https://simpl.pro/start-now" style="color:${ACCENT};text-decoration:none;font-weight:600;">Start here</a>.
                </td>
              </tr>
            </table>

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
