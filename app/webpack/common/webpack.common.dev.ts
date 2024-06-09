import { merge } from "webpack-merge";

import commonConfig from "./webpack.common";

export default merge(commonConfig, {
  devtool: "source-map",
});
