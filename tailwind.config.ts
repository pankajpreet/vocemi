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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

