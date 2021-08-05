module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "pw-grey": "#333333",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
