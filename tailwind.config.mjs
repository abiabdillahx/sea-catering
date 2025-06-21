/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
}