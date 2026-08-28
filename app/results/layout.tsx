import type { Metadata } from "next";

/**
 * Metadata for /results, which cannot declare its own.
 *
 * WHY THIS FILE EXISTS
 *
 * `app/results/page.tsx` is a client component: it reads the scan out of the
 * URL and renders it in the browser. A client component cannot export
 * `metadata`, so the page shipped with no title of its own, no description and
 * no canonical. It was the only page on the site missing one, and an audit
 * flagged it as a defect.
 *
 * It was a defect, but "add a canonical and some copy" is the wrong fix.
 *
 * WHY IT IS DELIBERATELY NOINDEXED
 *
 * /results has no stable content. What it shows depends entirely on whose
 * website was scanned, so there is nothing here for Google to index that will
 * still be true tomorrow. Left indexable it produces an unbounded set of
 * near-identical thin pages, all of them somebody else's scan, all competing
 * with the pages that are meant to rank. That is worse than having no metadata
 * at all.
 *
 * So it is excluded on purpose, and the exclusion is stated here rather than
 * left as an accident of the framework. The page that SHOULD rank for this
 * intent is /scan, which is static, has real copy, and is where a visitor
 * starts.
 */
export const metadata: Metadata = {
  title: "Your Simpl Score",
  description:
    "Your website's Simpl Score: what is working, what is costing you customers, and what to fix first.",
  robots: {
    index: false,
    follow: true, // the links out of it are still worth crawling
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
