import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.3" },
        },
        appearBottom: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        swapout: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        swapin: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "50%": { transform: "translateY(0%)", opacity: "1" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "85%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1s forwards",
        slideBottom: "appearBottom 0.5s ease forwards",
        swapin: "swapin 0.5s linear forwards",
        swapout: "swapout 1s ease forwards",
        progress: "progress 10s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
