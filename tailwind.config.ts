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
        // New homepage palette (from Vocemi Homepage.dc.html mockup)
        cream: "#FAFAF7",
        sand: "#F3F1EC",
        ink: "#16181C",
        coal: "#14161B",
        brand: {
          DEFAULT: "#3B54F4",
          dark: "#2338C7",
          light: "#7C90FF",
          tint: "#EEF0FE",
        },
        // Legacy palette used by inner pages
        primary: {
          dark: "#1A1A2E",
          "dark-alt": "#11121A",
          secondary: "#222244",
          accent: "#7D3CFE",
          "accent-alt": "#6B1DAF",
          "accent-cyan": "#4DECE1",
        },
        text: {
          primary: "#FFFFFF",
          dark: "#1A1A2E",
          secondary: "#5F5F5F",
          muted: "#666666",
        },
        background: {
          light: "#F5F6FA",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        popIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        badgePulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,84,244,0.5)" },
          "50%": { boxShadow: "0 0 0 6px rgba(59,84,244,0)" },
        },
      },
      animation: {
        wave: "wave 1s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease both",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        popIn: "popIn 0.3s ease",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        badgePulse: "badgePulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
