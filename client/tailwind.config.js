/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        dark: '#1D1D1F',
      },
    },
  },
  plugins: [],
}