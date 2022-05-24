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
    require("tailwindcss-debug-screens"),
    function ({ addVariant }) {
      addVariant("child-svg", "& svg");
      addVariant("child-li", "& > li");
      addVariant("child", "& > *");
    },
  ],
};
