import { resolve } from "node:path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";

import commonConfig from "@root/webpack/common";

const { ROOT_DIR } = process.env;

const config: Configuration = merge(commonConfig, {
  entry: [resolve(__dirname, `${ROOT_DIR}/src/router/routes.tsx`)],
  externals: [webpackNodeExternals()],
  externalsPresets: { node: true },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
          },
        },
      },
    ],
  },

  name: "server",

  output: {
    libraryTarget: "umd",
    path: resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
    publicPath: "/",
  },

  target: "node",
});

export default config;
