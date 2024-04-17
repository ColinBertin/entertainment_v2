/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      red: {
        500: "#FC4747",
      },
      blue: {
        300: "#5A698F",
        500: "#161D2F",
        800: "#10141E",
      },
      green: {
        400: "#50c878",
      },
    },
    extend: {},
  },
  plugins: [],
};
