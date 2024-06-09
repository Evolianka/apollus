const path = require("node:path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

const LoadablePlugin = require('@loadable/webpack-plugin');
const { ROOT_DIR, MODE } = process.env;

const mode = MODE === "production" ? "production" : "development";

const config = {
  devtool: "source-map",
  mode,

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
          },
        },
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // format of output
                namedExport: true, // named exports instead of default
              },
              esModule: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import '@/scss/index.scss';`,
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, `${ROOT_DIR}/dist/`),
    publicPath: "/",
  },

  plugins: [
    new LoadablePlugin(),
    new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) }),
    new ESLintPlugin(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, `${ROOT_DIR}/src`),
      "@root": path.resolve(__dirname, ROOT_DIR),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = config;