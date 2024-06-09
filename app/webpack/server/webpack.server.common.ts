import { resolve } from "node:path";
import { mergeWithRules } from "webpack-merge";
import nodeExternals from "webpack-node-externals";

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
  entry: [resolve(__dirname, `${ROOT_DIR}/src/server/index.tsx`)],
  experiments: {
    outputModule: true,
  },
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  name: "server",
  output: {
    library: {
      type: "commonjs-static",
    },
    path: resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
  },

  target: "node20",
});

export default config;
