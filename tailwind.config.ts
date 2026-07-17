import type { Config } from "tailwindcss";

/**
 * Tailwind on simpl.pro is ADDITIVE, not a rebuild.
 *
 * The site is built with inline styles + CSS variables in globals.css. Tailwind
 * is here so we can drop in shadcn / 21st.dev components and use utilities on new
 * work, without touching the existing pages.
 *
 * preflight is OFF on purpose. Tailwind's preflight is a global CSS reset that
 * would strip the browser defaults and inline styling the current pages rely on.
 * With it off, Tailwind adds only the utilities we actually use, so nothing that
 * already renders changes.
 *
 * Colors point at the existing CSS variables, so the brand has ONE source of
 * truth (globals.css). Change a value there and both inline styles and Tailwind
 * utilities move together.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-ink": "var(--accent-ink)",
        pulse: "var(--pulse)",
        warn: "#E0A852",
        danger: "#E05252",
        // shadcn/21st token aliases, mapped to the brand so pasted components
        // come out on-theme instead of default slate.
        background: "var(--bg)",
        foreground: "var(--fg)",
        primary: "var(--accent)",
        "primary-foreground": "var(--accent-ink)",
        secondary: "var(--bg-soft)",
        "secondary-foreground": "var(--fg)",
        border: "var(--rule)",
        input: "var(--rule-strong)",
        ring: "var(--accent)",
        card: "var(--bg-soft)",
        "card-foreground": "var(--fg)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "3px",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        rippling: {
          "0%": { opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // 600ms matches the ripple cleanup timeout so it never cuts off mid-play.
        rippling: "rippling 600ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
