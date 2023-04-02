/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right bottom, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))",
      },
    },
  },
  plugins: [],
};

module.exports = config;
