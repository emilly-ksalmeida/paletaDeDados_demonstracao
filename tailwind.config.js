/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ice: "#F7FDFC",
        cyan: "#38CED6",
        blue: "#389CD6",
        green: "#38D673",
        navy: "#2A50A1",
        red: "#D6453F",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
