import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "node:path";
import webpack from "webpack";
import { mergeWithRules } from "webpack-merge";

import LoadablePlugin from "@loadable/webpack-plugin";

import commonConfig from "../common";

const ROOT_DIR = process.env.ROOT_DIR;

const config = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
})(commonConfig, {
  entry: [resolve(__dirname, `${ROOT_DIR}/src/App`)],
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  name: "client",

  output: {
    filename: "[name].js",
    path: resolve(__dirname, `${ROOT_DIR}/dist/client`),
    publicPath: "/",
  },

  plugins: [
    new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
      linkType: "text/css",
    }),

    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, `${ROOT_DIR}/src/static`),
          to: resolve(__dirname, `${ROOT_DIR}/dist/client/res`),
        },
      ],
    }),
  ],

  target: "web",
});

export default config;
