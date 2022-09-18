const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.ts",
    "index.min": "./src/index.ts",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    library: "convertNumberCN",
    libraryTarget: "umd",
    globalObject: "this",
  },
  mode: "none",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min.js/,
      }),
    ],
  },
};
