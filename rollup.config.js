import serve from "rollup-plugin-serve";

export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
  },
  plugins: [serve({ contentBase: "public", port: "8080" })],
};
