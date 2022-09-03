/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode:'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors:{
        gray: colors.zinc,
        brand: colors.violet
      }
    },
  },
  plugins: [],
}
