import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4f46e5",
          "primary-content": "#ffffff",
          secondary: "#5eead4",
          "secondary-content": "#000000",
          accent: "#facc15",
          "accent-content": "#000000",
          neutral: "#020617",
          "neutral-content": "#ffffff",
          "base-100": "#000000",
          "base-200": "#020617",
          "base-300": "#1e293b",
          "base-content": "#ffffff",
          info: "#4338ca",
          "info-content": "#ffffff",
          success: "#5eead4",
          "success-content": "#ffffff",
          warning: "#facc15",
          "warning-content": "#ffffff",
          error: "#dc2626",
          "error-content": "#ffffff",
        },
      },
    ],
    logs: false,
  },
} satisfies Config;
