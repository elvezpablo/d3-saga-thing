const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");

module.exports = {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
  },
  watch: {
    exclude: ["node_modules/**"],
  },
  plugins: [serve({ port: "8080", contentBase: "public" }), livereload()],
};
