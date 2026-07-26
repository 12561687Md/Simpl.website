import type { Metadata } from "next";
import WildgroveDemo from "./WildgroveDemo";

export const metadata: Metadata = {
  title: "Wildgrove Landscaping — Simpl demo",
  description: "A live before/after demo of a landscaping website built by Simpl.",
  robots: { index: false, follow: false },
};

export default function WildgroveDemoPage() {
  return <WildgroveDemo />;
}
