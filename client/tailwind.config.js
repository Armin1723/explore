/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#103d3d",
        secondary: "#f8f5f6",
        accent: "#ed722a",
        brand: " #000080",
      },
    },
  },
  plugins: [],
};
