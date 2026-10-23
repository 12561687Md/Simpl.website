"use client";

import { useRef } from "react";

/**
 * Shared bits for every lead form (Book a call, See your top prospects).
 *
 * - Honeypot: a field people never see. Bots fill every input; a filled one
 *   gets a quiet "success" and is dropped server-side.
 * - Fill timer: the server drops forms sent faster than a person can type.
 * - SMS consent: OPTIONAL and UNCHECKED by default, for carrier (A2P) rules.
 *   The wording must match SMS_CONSENT_TEXT in the backend
 *   (Simpl.master/backend/contact_leads.py), which stores it with the consent.
 */

export const SMS_CONSENT_TEXT =
  "Text me about my request. Msg & data rates may apply. Reply STOP to opt out.";

export function useFormTimer() {
  const started = useRef<number>(Date.now());
  return () => Date.now() - started.current;
}

export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="hp" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function SmsConsent({ id }: { id: string }) {
  return (
    <div className="eg-consent">
      <input id={id} name="sms" type="checkbox" value="yes" />
      <label htmlFor={id}>
        {SMS_CONSENT_TEXT} Optional. See our <a className="eg-link" href="/privacy#sms">Privacy Policy</a> and{" "}
        <a className="eg-link" href="/terms#sms">Terms</a>.
      </label>
    </div>
  );
}
