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
        brand: {
          primary: "#0077B6",
          secondary: "#00B4D8",
          accent: "#FFD166",
          dark: "#1A1A2E",
          light: "#90E0EF",
          neutral: "#F8F9FA",
        },
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,119,182,0.10)",
        hero: "0 8px 48px rgba(0,119,182,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
