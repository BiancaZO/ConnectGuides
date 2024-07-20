/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{        
        blue:"#479ccb",
        blueLight: "#e7f6fd",
        blueDark: "#113050",

      }
    },
  },
  plugins: [],
}
