module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: { center: true, padding: "12px" },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child-svg", "& svg");
    },
  ],
};
