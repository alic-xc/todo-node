/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: { max: "600px" },
      sm: { min: "600px", max: "1000px" },
      md: { min: "1000px" },
      lg: { min: "1200px" },
      xl: { min: "1536px" },
    },
    extend: {
      colors: {
        primary: "#1886c7",
        secondary: "#1A1A1A",
        official: "#e8f3f9",
        blare: "#f8f8f8",
      },
    },
  },
  plugins: [],
};
