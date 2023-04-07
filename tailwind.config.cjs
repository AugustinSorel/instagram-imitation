/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "drop-in": { from: { translate: "0 -100%" }, to: { translate: "0" } },
        "drop-out": { from: { translate: "0" }, to: { translate: "0 100%" } },
        "scale-in-sm": { from: { scale: "0.8" }, to: { scale: "1" } },
        "scale-out-sm": { from: { scale: "1" }, to: { scale: "0.8" } },
      },

      animation: {
        "fade-in": "fade-in 300ms ease-out",
        "fade-out": "fade-out 300ms ease-out forwards",
        "drop-in": "drop-in 300ms ease-out",
        "drop-out": "drop-out 300ms ease-out forwards",
        "scale-in-sm": "scale-in-sm 300ms ease-out",
        "scale-out-sm": "scale-out-sm 300ms ease-out forwards",
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right bottom, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))",
      },
    },
  },
  plugins: [],
};

module.exports = config;
