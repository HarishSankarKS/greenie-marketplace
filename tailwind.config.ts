import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f0fbf4",
          100: "#dcf5e8",
          200: "#b8ebd0",
          300: "#6dd19f",
          400: "#3db87a",
          500: "#2d9a63",
          600: "#22874d",
          700: "#1a6b3c",
          800: "#14522e",
          900: "#0d3d22",
          950: "#072516",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(135deg, #0d3d22 0%, #1a6b3c 55%, #2d9a63 100%)",
        "green-subtle": "linear-gradient(135deg, #f0fbf4 0%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
