const serve = require("rollup-plugin-serve");

module.exports = {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
  },
  watch: {
    exclude: ["node_modules/**"],
  },
  plugins: [serve({ port: "8080", contentBase: "public" })],
};
