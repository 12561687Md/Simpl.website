/**
 * Shared chrome for transactional email.
 *
 * Two emails now go out from the site (the scan report and the contact
 * confirmation) and more will follow. The palette and the outer shell live here
 * so a brand change is one edit rather than a hunt through route files, and so
 * the second email cannot quietly drift away from the first.
 *
 * WHY EVERY VALUE IS INLINED AND THE LAYOUT IS TABLE-BASED
 *
 * Email clients are not browsers. Outlook on Windows renders through Word,
 * Gmail strips <style> blocks in some contexts, and none of them support CSS
 * custom properties. Everything below is an inline style on a table, which is
 * the only thing that renders the same in all of them.
 *
 * The "fluid hybrid" pattern is used for anything that must stack on a phone:
 * inline-block divs with max-width, wrapped in MSO conditional ghost tables so
 * Outlook still sees a table. A real table cell cannot shrink below its own
 * content, which is what makes a normal two-column email overflow the moment a
 * business name or a URL runs long.
 */

/** Brand palette, locked. See brand/BRAND_KIT.md in the backend repo. */
export const EMAIL = {
  /** Midnight, the page ground. */
  BG: "#0B0C0D",
  /** Cards and panels. */
  PANEL: "#131517",
  /** Primary text. */
  INK: "#F3F2ED",
  /** Secondary text and labels. */
  MUTED: "#ADACA7",
  /** Borders and dividers. */
  RULE: "#262829",
  /** Baby blue. Calls to action only, never body text: it fails contrast at
   *  body size on the dark ground. */
  ACCENT: "#89CFF0",
  /** Text that sits ON the accent. */
  ON_ACCENT: "#081420",
  /** Footer text. */
  FAINT: "#6F6D66",
  SANS: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
} as const;

/** Escape anything a user typed before it goes near an HTML email. */
export function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** A horizontal rule that survives Outlook, which ignores border-top on a div. */
export function divider(margin = "24px 0"): string {
  return `<div style="height:1px;background:${EMAIL.RULE};font-size:0;line-height:0;margin:${margin};">&nbsp;</div>`;
}

/**
 * A pill button. Bulletproof: the background is on the <td>, so it still paints
 * if the client drops the border-radius, and the <a> fills the cell so the
 * whole button is the tap target rather than just the text.
 */
export function button(href: string, label: string, full = false): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" ${full ? 'width="100%" style="width:100%;"' : ""}>
    <tr>
      <td bgcolor="${EMAIL.ACCENT}" align="center" style="background:${EMAIL.ACCENT};border-radius:999px;">
        <a href="${href}" style="display:block;padding:14px 26px;font-family:${EMAIL.SANS};font-size:14px;font-weight:700;color:${EMAIL.ON_ACCENT};text-decoration:none;border-radius:999px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

/** A quiet secondary link, for the action we do not want to compete with the
 *  primary button. */
export function textLink(href: string, label: string): string {
  return `<a href="${href}" style="color:${EMAIL.ACCENT};text-decoration:none;font-weight:600;">${label}</a>`;
}

/**
 * Wraps panel content in the standard page: dark ground, centred 600px column,
 * wordmark above, footer below.
 *
 * `preheader` is the grey line the inbox shows next to the subject. Left unset
 * it fills with whatever text comes first, which is usually the wordmark alt
 * text, so it is always worth writing.
 */
export function shell(opts: { preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
</head>
<body style="margin:0;padding:0;background:${EMAIL.BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(opts.preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${EMAIL.BG}" style="background:${EMAIL.BG};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:600px;">

        <tr>
          <td align="center" style="padding:0 0 24px;">
            <img src="https://simpl.pro/brand/simpl-wordmark-dark.png" width="104" height="26" alt="Simpl"
                 style="display:block;border:0;outline:none;width:104px;height:auto;color:${EMAIL.INK};font-family:${EMAIL.SANS};font-size:17px;font-weight:700;letter-spacing:.18em;">
          </td>
        </tr>

        <tr>
          <td bgcolor="${EMAIL.PANEL}" style="background:${EMAIL.PANEL};border:1px solid ${EMAIL.RULE};border-radius:14px;padding:30px 26px;font-family:${EMAIL.SANS};">
${opts.body}
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:24px 0 0;font-family:${EMAIL.SANS};">
            <div style="font-size:12px;color:${EMAIL.FAINT};">Plain and simpl.</div>
            <div style="font-size:12px;color:${EMAIL.FAINT};padding-top:6px;">
              <a href="https://simpl.pro" style="color:${EMAIL.FAINT};text-decoration:none;">simpl.pro</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:team@simpl.pro" style="color:${EMAIL.FAINT};text-decoration:none;">team@simpl.pro</a>
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
