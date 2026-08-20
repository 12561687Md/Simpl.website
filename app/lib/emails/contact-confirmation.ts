import { EMAIL, esc, shell, divider, button, textLink } from "../email-brand";

/**
 * The confirmation the lead gets back.
 *
 * This is the first email a prospect ever receives from us, so it does three
 * jobs rather than one:
 *
 *   1. CONFIRMS. It reads back exactly what they sent, so they can see it
 *      arrived intact and spot their own typo in the phone number.
 *   2. SETS THE CLOCK. A named window ("within 4 hours, and before 9pm if you
 *      wrote in today") beats "we will be in touch shortly", which reads as
 *      nothing at all.
 *   3. GIVES THEM SOMETHING TO DO. The old version was a dead end with a
 *      generic "run your free scan" link. If they told us their website, the
 *      scan is pre-filled with it, so the next click is one tap and the result
 *      is about THEM. That is the whole nurture mechanism: the scan is what
 *      turns a form fill into a conversation.
 *
 * Tone is gain-framed on purpose (see CLAUDE.md): what there is to win, not
 * what they are losing. And it invites a reply, because a lead who replies to
 * an email is worth more than one who clicks a button.
 */
export function confirmationEmailHtml(params: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  website?: string;
  message?: string;
}) {
  const { name, email, phone, service, website, message } = params;
  const firstName = name.trim().split(/\s+/)[0];

  // If they gave us their site, the next step is THEIR scan, not a generic one.
  const scanUrl = website
    ? `https://simpl.pro/scan?url=${encodeURIComponent(website)}`
    : "https://simpl.pro/scan";
  const scanLabel = website ? "See what your site scores" : "Run my free scan";

  /* table-layout:fixed with an explicit label width, because the default
     algorithm sizes a table to its widest unbreakable content. A long email
     address in the value column was pushing the whole 600px email wider than a
     phone screen, and because the outer table is only max-width, it grew to
     match and the panel ran off the right edge. Fixed layout plus
     overflow-wrap:anywhere makes the value column break instead of push. */
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:7px 14px 7px 0;font-family:${EMAIL.SANS};font-size:13px;color:${EMAIL.MUTED};vertical-align:top;">${label}</td>
      <td style="padding:7px 0;font-family:${EMAIL.SANS};font-size:13px;color:${EMAIL.INK};word-break:break-word;overflow-wrap:anywhere;">${value}</td>
    </tr>`;

  const detailRows = [
    row("Name", esc(name)),
    row("Email", esc(email)),
    phone ? row("Phone", esc(phone)) : "",
    website ? row("Website", esc(website)) : "",
    service ? row("Interested in", esc(service)) : "",
    message ? row("You wrote", esc(message)) : "",
  ].join("");

  const steps = [
    ["01", "We look at what you already have", "Before we talk, we go through your site and your Google profile so the call is about your situation and not a script."],
    ["02", "You get a straight answer", `We come back ${website ? "with what we found" : "with the first questions"} within 4 hours on a working day.`],
    ["03", "You decide if it is worth continuing", "No pressure either way. If the honest answer is that you do not need us yet, we will say so."],
  ]
    .map(
      ([n, h, b]) => `
      <tr>
        <td width="34" style="width:34px;word-break:break-word;padding:0 12px 18px 0;font-family:${EMAIL.SANS};font-size:12px;font-weight:700;color:${EMAIL.ACCENT};letter-spacing:.08em;vertical-align:top;line-height:1.5;">${n}</td>
        <td style="padding:0 0 18px;font-family:${EMAIL.SANS};vertical-align:top;">
          <div style="font-size:14px;font-weight:600;color:${EMAIL.INK};line-height:1.45;">${h}</div>
          <div style="font-size:13px;color:${EMAIL.MUTED};line-height:1.6;padding-top:4px;">${b}</div>
        </td>
      </tr>`,
    )
    .join("");

  const body = `
            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${EMAIL.MUTED};padding-bottom:14px;">Message received</div>

            <div style="font-size:23px;font-weight:700;color:${EMAIL.INK};line-height:1.25;">Thanks, ${esc(firstName)}. We have got it.</div>

            <div style="font-size:15px;color:${EMAIL.MUTED};line-height:1.65;padding-top:12px;">
              A real person reads every one of these, and you will hear back <strong style="color:${EMAIL.INK};font-weight:600;">within 4 hours</strong> on a working day. If you would rather just talk it through, reply to this email or call and you will get one of us, not a queue.
            </div>

            ${divider("26px 0 22px")}

            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${EMAIL.MUTED};padding-bottom:10px;">What you sent us</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;table-layout:fixed;">
              <tr><td style="width:96px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td style="padding:0;font-size:0;line-height:0;">&nbsp;</td></tr>
              ${detailRows}
            </table>
            <div style="font-size:12px;color:${EMAIL.MUTED};line-height:1.6;padding-top:12px;">
              Something wrong there? Just reply and tell us, it goes straight back to us.
            </div>

            ${divider("22px 0")}

            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${EMAIL.MUTED};padding-bottom:14px;">What happens next</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;table-layout:fixed;">
              ${steps}
            </table>

            <div style="background:${EMAIL.BG};border:1px solid rgba(137,207,240,.4);border-radius:12px;padding:20px 18px;margin-top:6px;">
              <div style="font-size:16px;font-weight:700;color:${EMAIL.INK};line-height:1.35;">
                ${website ? "Want a head start before we call?" : "Want to see where you stand right now?"}
              </div>
              <div style="font-size:13px;color:${EMAIL.MUTED};line-height:1.6;padding:8px 0 16px;">
                ${
                  website
                    ? `Run the free scan on ${esc(website)} and you will see the same report we will be looking at. It takes about a minute, and there are usually a few wins sitting there in plain sight.`
                    : "The free scan checks your site and your Google profile and shows you exactly where the wins are. About a minute, no card, no call required."
                }
              </div>
              ${button(scanUrl, scanLabel, true)}
            </div>

            <div style="font-size:13px;color:${EMAIL.MUTED};line-height:1.65;padding-top:20px;">
              In the meantime, ${textLink("https://simpl.pro/start", "here is what working with us looks like")} and what it costs. No surprises on the call.
            </div>
  `;

  return shell({
    preheader: `Thanks ${firstName}, we have got your message and you will hear back within 4 hours.`,
    body,
  });
}
