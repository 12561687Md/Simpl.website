import { Resend } from "resend";

// Lazily instantiated so a missing RESEND_API_KEY doesn't throw at module
// load time (e.g. during build-time page data collection). The Resend SDK
// throws synchronously in its constructor if no key is passed at all, so we
// fall back to an empty string and let the actual send() call fail instead,
// which the API routes already catch and degrade gracefully.
let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY || "missing_api_key");
  }
  return client;
}

export const resend = {
  emails: {
    send: (...args: Parameters<Resend["emails"]["send"]>) => getClient().emails.send(...args),
  },
};
