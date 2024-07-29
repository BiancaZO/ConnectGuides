/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{        
        blue:"#479ccb",
        blueLight: "#e7f6fd",
        blue200: "#0096c7",
        blueDark: "#113050",
        primary: '#479ccb',

      }

    },
  },
  plugins: [],
}