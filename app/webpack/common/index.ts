import developmentConfig from "./webpack.common.dev";
import localConfig from "./webpack.common.local";
import productionConfig from "./webpack.common.prod";

const configs = {
  dev: developmentConfig,
  local: localConfig,
  prod: productionConfig,
};

const { STAND } = process.env;

export default configs[STAND];
