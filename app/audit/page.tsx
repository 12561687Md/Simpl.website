import { Suspense } from "react";
import type { Metadata } from "next";
import AuditFlow from "./AuditFlow";

export const metadata: Metadata = {
  title: "Your Simpl Score | Simpl",
  description: "See exactly how many more customers your business could be winning online.",
  // A report is scoped to one business and one scan. Nothing here belongs in an
  // index.
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  return (
    // useSearchParams needs a Suspense boundary or the whole route opts out of
    // static rendering at build time.
    <Suspense fallback={null}>
      <AuditFlow />
    </Suspense>
  );
}
