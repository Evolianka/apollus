import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { merge } from "webpack-merge";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import configCommon from "./webpack.client.common";

const config: Configuration = merge(configCommon, {
  plugins: [new ReactRefreshWebpackPlugin()],
});

export default config;
