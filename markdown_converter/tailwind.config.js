/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: "#302f2c",
        paper: "#efede3",
      },
    },
  },
  plugins: [],
}
