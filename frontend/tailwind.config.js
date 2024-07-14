/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        logo: ["Allura", "cursive"],
      },
      colors: {
        primary: "#B024DA",
        secondary: "#31C4F3",
      },
    },
  },
  plugins: [],
};
