/** @type {import('tailwindcss').Config} */

/* Colours are driven by the RGB-channel variables in src/index.css (:root),
   so Tailwind alpha utilities (bg-ink/60, border-chalk/10 …) keep working and
   there is a single place to edit each hex. */
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* Token names are unchanged. Values now follow the RIC'27 "Changing
         Tangents" palette: Prismatic Glassmorphism & Iridescence. */
      colors: {
        // Midnight Teal — the stage (#062B32) and its depth steps
        ink: {
          DEFAULT: c("ink"),
          light: c("ink-light"),
          soft: c("ink-soft"),
          deep: c("ink-deep"),
        },
        // Refraction Amber — warm light where the beam catches a surface
        amber: {
          DEFAULT: c("amber"),
          light: c("amber-light"),
          dark: c("amber-dark"),
        },
        // Spectral Coral — the red end of the split beam
        crimson: {
          DEFAULT: c("coral"),
          dark: c("coral-dark"),
          light: c("coral-light"),
        },
        // Iridescent Cyan — secondary accent, labels, hover states
        mint: {
          DEFAULT: c("cyan"),
          light: c("cyan-light"),
          dark: c("cyan-dark"),
        },
        // Soft Lavender Pearl — primary text on the dark stage
        chalk: c("pearl"),

        // New: Prismatic Blue and the glass neutrals
        prism: {
          DEFAULT: c("blue"),
          light: c("blue-light"),
          dark: c("blue-dark"),
        },
        titanium: c("titanium"), // Frosted Titanium Grey
        chrome: c("chrome"), // Prismatic Chrome
        magenta: c("magenta"), // rare accent only (magenta-teal gradient)

        // Tailwind's slate ramp re-tinted to titanium so body copy stays
        // >= WCAG AA on Midnight Teal and on glass surfaces.
        slate: {
          300: "#CBD3DE",
          400: "#B0BCCA",
          500: "#A0AEBE",
          600: "#8A9BAE",
        },
      },
      /* Fonts are CSS variables so the header "Font test" switcher can swap
         whole sets live (see src/data/fontSets.js). */
      fontFamily: {
        display: ["var(--font-display)"],
        sub: ["var(--font-sub)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
