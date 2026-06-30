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
  email: z.string().email("Enter a valid email address."),
  scanUrl: z.string().min(1, "Missing scan URL."),
  scanScore: z.number().optional(),
  scanGrade: z.string().optional(),
  businessName: z.string().optional(),
  findings: z.array(findingSchema).optional(),
  categories: z.record(z.string(), categorySchema).optional(),
});

const RATE_LIMIT_MAX = 10;

function gradeColor(grade: string | undefined): string {
  if (!grade) return "#8FB4A8";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#8FB4A8";
  if (grade.startsWith("C")) return "#E0A852";
  return "#E05252";
}

function buildEmailHtml(params: {
  email: string;
  businessName?: string;
  scanUrl: string;
  scanScore?: number;
  scanGrade?: string;
  findings?: { severity?: string; title?: string; category?: string }[];
  categories?: Record<string, { grade?: string; score?: number; max?: number }>;
}) {
  const { businessName, scanUrl, scanScore, scanGrade, findings = [], categories = {} } = params;
  const accent = "#8FB4A8";
  const color = gradeColor(scanGrade);

  const topFindings = findings
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .slice(0, 5);

  const categoryRows = Object.entries(categories)
    .map(
      ([name, data]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;font-size:14px;color:#222;">${name}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;font-size:14px;color:${gradeColor(data.grade)};font-weight:600;text-align:right;">${data.grade ?? ""}</td>
        </tr>`
    )
    .join("");

  const findingsRows = topFindings
    .map(
      (f) => `
        <tr>
          <td style="padding:8px 0;border-left:3px solid ${f.severity === "critical" ? "#E05252" : "#E0A852"};padding-left:12px;font-size:14px;color:#222;line-height:1.4;">${f.title ?? ""}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="background:#f5f5f3;padding:32px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">

      <div style="padding:32px 32px 0;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#888;margin-bottom:24px;">SIMPL Score Report</div>
        ${businessName ? `<div style="font-size:20px;font-weight:600;color:#111;margin-bottom:4px;">${businessName}</div>` : ""}
        <div style="font-size:13px;color:#666;margin-bottom:24px;">${scanUrl}</div>
      </div>

      <div style="padding:0 32px 24px;text-align:center;">
        <div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:4px solid ${color};line-height:112px;font-size:44px;font-weight:300;color:${color};">
          ${scanGrade ?? ""}
        </div>
        <div style="font-size:13px;color:#666;margin-top:8px;">${scanScore !== undefined ? `${scanScore}% overall` : ""}</div>
      </div>

      ${categoryRows ? `
      <div style="padding:0 32px 24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tbody>${categoryRows}</tbody>
        </table>
      </div>` : ""}

      ${findingsRows ? `
      <div style="padding:0 32px 24px;">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;margin-bottom:12px;">Top findings</div>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>${findingsRows}</tbody>
        </table>
      </div>` : ""}

      <div style="padding:8px 32px 36px;text-align:center;">
        <a href="https://simpl.pro/start" style="display:inline-block;background:${accent};color:#0b1f1a;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:4px;">
          See the full report &rarr;
        </a>
      </div>

      <div style="background:#fafafa;border-top:1px solid #e5e5e5;padding:20px 32px;text-align:center;">
        <div style="font-size:12px;color:#999;">Plain and simpl.</div>
        <div style="font-size:12px;color:#999;margin-top:4px;">SIMPL &middot; simpl.pro</div>
      </div>

    </div>
  </div>`;
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

    const { email, scanUrl, scanScore, scanGrade, businessName, findings, categories } = parsed.data;

    try {
      const pool = getPool();
      await pool.query(
        `INSERT INTO leads (email, source, source_page, scan_url, scan_score, scan_grade)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [email, "scan_report", "/scan", scanUrl, scanScore ?? null, scanGrade ?? null]
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
        from: "SIMPL <team@simpl.pro>",
        to: email,
        subject: `Your SIMPL Score: ${scanGrade ?? "N/A"} (${scanScore ?? 0}%)`,
        html: buildEmailHtml({ email, businessName, scanUrl, scanScore, scanGrade, findings, categories }),
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
