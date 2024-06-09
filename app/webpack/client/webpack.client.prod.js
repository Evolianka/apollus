const clientCommon = require("./webpack.client.common");
const { merge } = require("webpack-merge");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const config = merge(clientCommon, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: "vendors/[name].js",
        },
      },
      chunks: "all",
    },
  },

  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
  ],
});

module.exports = config;