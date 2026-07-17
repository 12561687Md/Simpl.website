import React from "react";

/**
 * Renders a paragraph string with `[label](https://...)` inline links and
 * `` `code` `` spans. Deliberately tiny — the blog content is trusted, authored
 * data, so this only needs to handle the two inline forms the posts use.
 *
 * External links get rel="noopener" and open in a new tab: we send readers to
 * Google's docs and Wikipedia on purpose (an AEO trust signal), and we'd rather
 * not lose them off our own tab when we do.
 */
export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      nodes.push(
        <a
          key={k++}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}
        >
          {m[1]}
        </a>
      );
    } else if (m[3]) {
      nodes.push(
        <code
          key={k++}
          className="mono"
          style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 4, padding: "1px 6px", fontSize: "0.9em" }}
        >
          {m[3]}
        </code>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
