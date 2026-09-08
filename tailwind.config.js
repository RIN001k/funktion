/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        pink: "#FE0187",
        pinkDeep: "#B4005F",
        line: "#DEDAD2",
        lineDark: "#2A232B",
        pop: "#FE0187",
        gold: "#FE0187",
      },
      fontFamily: {
        display: ["var(--font-body)", "-apple-system", "Segoe UI", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "Segoe UI", "sans-serif"],
        helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
