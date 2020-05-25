const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const json = require("@rollup/plugin-json");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "public/bundle.js",
  },
  watch: {
    exclude: ["node_modules/**"],
  },
  plugins: [json(), serve({ port: "8080", contentBase: "public" }), livereload()],
};
