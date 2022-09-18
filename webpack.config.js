const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      '@':path.resolve(__dirname,'src')
    }
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
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
