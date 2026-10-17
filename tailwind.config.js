/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Indigo — the chalkboard base
        ink: {
          DEFAULT: "#1E1B4B",
          light: "#312E81",
          soft: "#4338CA",
        },
        // Amber — the primary glow
        amber: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#B45309",
        },
        // Crimson — the rupture
        crimson: {
          DEFAULT: "#DC2626",
          dark: "#991B1B",
          light: "#F87171",
        },
        // Erratic Mint — the unexpected detour
        mint: {
          DEFAULT: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#0F766E",
        },
        chalk: "#EDE9FE",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
