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
              additionalData: `@import '@shared/ui/scss/index.scss';`,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, `${ROOT_DIR}/src`),
      "@client": resolve(__dirname, `${ROOT_DIR}/dist/client`),
      "@dist": resolve(__dirname, `${ROOT_DIR}/dist`),
      "@root": resolve(__dirname, ROOT_DIR),
      "@ssr": resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
      "@shared": resolve(__dirname, `${ROOT_DIR}/src/shared`),
      "@entities": resolve(__dirname, `${ROOT_DIR}/src/entities`),
      "@features": resolve(__dirname, `${ROOT_DIR}/src/features`),
      "@widgets": resolve(__dirname, `${ROOT_DIR}/src/widgets`),
      "@pages": resolve(__dirname, `${ROOT_DIR}/src/pages`),
      "@app": resolve(__dirname, `${ROOT_DIR}/src/app`)
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
