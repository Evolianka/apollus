import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "node:path";
import webpack, { Configuration } from "webpack";
import { mergeWithRules } from "webpack-merge";

import LoadablePlugin from "@loadable/webpack-plugin";
import commonConfig from "@root/webpack/common";

const { ROOT_DIR, STAND } = process.env;
const isLocal = STAND === "local";

const config: Configuration = mergeWithRules({
  entry: "replace",
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
        use: [isLocal ? "style-loader" : MiniCssExtractPlugin.loader],
      },
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
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
