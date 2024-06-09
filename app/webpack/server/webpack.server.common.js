const commonConfig = require("../common");
const { mergeWithRules } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const ROOT_DIR = process.env.ROOT_DIR;

const config = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend'
    }
  }
})(commonConfig, {
  name: "server",
  target: "node20",
  entry: path.resolve(__dirname, `${ROOT_DIR}/src/server/index.tsx`),
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  output: {
    path: path.resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
    library: {
      type: 'commonjs-static'
    }
  },

  experiments: {
    outputModule: true
  },
});

module.exports = config;
