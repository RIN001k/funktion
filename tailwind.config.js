/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141312",
        paper: "#FBFAF7",
        gold: "#B08A3E",
        line: "#E4E1D8",
        pop: "#2338F2",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
