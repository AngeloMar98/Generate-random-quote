/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        paleBlue: "#6466e9",
        darkBlue: "#020617",
        gray: {
          0: "#8A97AA",
          1: "#4A5567",
          2: "#20293A",
          3: "#111729",
        },
      },
      backgroundImage: {
        "quote-pattern": "url('bg-image-random-quote.svg')",
      },
    },
    fontSize: {
      sm: "0.625rem",
      med: "1rem",
      big: "1.5rem",
    },
    fontFamily: {
      default: ['"Outfit"'],
    },
  },
  plugins: [],
};
