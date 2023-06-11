/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      aspectRatio: {
        square: "1",
      },
      colors: {
        btnL: "#e55547",
        btnR: "#b02619",
      },
    },
  },
  plugins: [require("daisyui")],
};
