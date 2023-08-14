/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('https://www.overdrive.com/Content/img/Header-Jumbo.jpg')",
      }
    }
  },
  plugins: [],
}

