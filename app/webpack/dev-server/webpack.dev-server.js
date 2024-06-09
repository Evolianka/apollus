const client = require("../client");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const ROOT_DIR = process.env.ROOT_DIR;



const config = merge(client, {
  entry: 'prepend'
}, {
  entry: [path.resolve(__dirname, `${ROOT_DIR}/src/front/index.tsx`)],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: "whm",
      },
    }),
  ],
});

module.exports = config;