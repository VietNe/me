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
      "~hooks": path.resolve(__dirname, "src/hooks"),
      "~pages": path.resolve(__dirname, "src/pages"),
      "~utils": path.resolve(__dirname, "src/utils"),
      "~constants": path.resolve(__dirname, "src/constants"),
      "~containers": path.resolve(__dirname, "src/containers"),
    },
  },
};
