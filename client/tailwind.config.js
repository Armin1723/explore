/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // './node_modules/@mantine/core/**/*'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#113c3d',
        secondary: '#f7f6f6',
        accent: '#ed722a'
      }
    },
  },
  plugins: [],
}