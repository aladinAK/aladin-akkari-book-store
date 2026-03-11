import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0a",
        "void-light": "#111111",
        "void-mid": "#1a1a1a",
        steel: "#3a3a3a",
        "steel-light": "#6b6b6b",
        "steel-mist": "#9a9a9a",
        ruby: "#8B1A1A",
        "ruby-bright": "#C41E3A",
        "ruby-glow": "#ff2244",
        parchment: "#d4c9b0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "line-draw": "lineDraw 2s ease forwards",
      },
      keyframes: {
        lineDraw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
