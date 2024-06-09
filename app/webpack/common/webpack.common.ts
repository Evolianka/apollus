import { resolve } from "node:path";
import webpack, { Configuration } from "webpack";

const { MODE, ROOT_DIR } = process.env;

const config: Configuration = {
  mode: MODE,
  module: {
    rules: [
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

  plugins: [
    new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, `${ROOT_DIR}/src`),
      "@client": resolve(__dirname, `${ROOT_DIR}/dist/client`),
      "@dist": resolve(__dirname, `${ROOT_DIR}/dist`),
      "@root": resolve(__dirname, ROOT_DIR),
      "@ssr": resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
