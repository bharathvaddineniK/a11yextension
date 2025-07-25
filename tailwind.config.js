/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all source files
    "./public/**/*.html",              // Just in case
    "./*.html"                         // For popup.html from webpack
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
