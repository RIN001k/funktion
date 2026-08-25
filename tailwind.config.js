/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0C",
        paper: "#F5F0EC",
        pink: "#FE0187",
        pinkDeep: "#B4005F",
        line: "#E4E1D8",
        lineDark: "#2A232B",
        pop: "#FE0187",
        gold: "#FE0187",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
