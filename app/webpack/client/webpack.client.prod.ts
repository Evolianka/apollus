import FileManagerPlugin from "filemanager-webpack-plugin";
import { merge } from "webpack-merge";

import clientCommon from "./webpack.client.common";

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

export default config;
