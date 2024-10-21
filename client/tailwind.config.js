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
        accent: '#24a6c9'
      }
    },
  },
  plugins: [],
}