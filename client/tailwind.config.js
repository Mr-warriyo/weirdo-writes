/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{jsx, js}",
    "./src/**/**.{jsx, js}",
  ],
  theme: {
    fontFamily: {
      "headingM": ["Dancing Script"]
    },
    extend: {},
  },
  plugins: [],
}
