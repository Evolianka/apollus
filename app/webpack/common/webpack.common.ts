import ESLintPlugin from "eslint-webpack-plugin";
import { resolve } from "node:path";
import webpack from "webpack";

const { MODE, ROOT_DIR } = process.env;

const mode = MODE === "production" ? "production" : "development";

const config = {
  devtool: "source-map",
  mode,

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
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: "css-loader",
            options: {
              esModule: true,
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // format of output
                namedExport: true, // named exports instead of default
              },
            },
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
    path: resolve(__dirname, `${ROOT_DIR}/dist/`),
    publicPath: "/",
  },

  plugins: [
    new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) }),
    new ESLintPlugin(),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, `${ROOT_DIR}/src`),
      "@root": resolve(__dirname, ROOT_DIR),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
