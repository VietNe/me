module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "pw-grey": "#333333",
      "pw-grey-70": "rgba(51,51,51,0.7)",
      "pw-grey-100": "rgba(255, 255, 255, 0.87)",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      "pw-grey": "#333333",
    }),
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      "white-10": "rgba(255,255,255,0.1)",
      "black-0": "rgba(0,0,0,0)",
    }),
    maxHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      "1/2-screen": "50vh",
      "3/4-screen": "75vh",
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
    extend: {
      width: {
        "screen-30": "30vw",
      },
      backdropBlur: {
        xs: "1.2px",
      },
      inset: {
        "1/24": "4.16666666667%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
