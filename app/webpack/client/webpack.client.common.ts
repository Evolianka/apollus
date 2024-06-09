import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "node:path";
import webpack, { Configuration } from "webpack";
import { mergeWithRules } from "webpack-merge";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
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
        test: /\.[jt]sx?$/,
        use: {
          loader: 'swc-loader',
        },
        include: /src/
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
    new ReactRefreshWebpackPlugin({ overlay: { sockProtocol: 'ws' } }),
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
