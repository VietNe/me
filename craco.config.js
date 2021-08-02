const path = require("path");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: {
      "~styles": path.resolve(__dirname, "src/styles"),
      "~components": path.resolve(__dirname, "src/components"),
      "~assets": path.resolve(__dirname, "src/assets"),
    },
  },
};
