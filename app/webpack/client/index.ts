import developmentConfig from "./webpack.client.dev";
import localConfig from "./webpack.client.local";
import productionConfig from "./webpack.client.prod";

const configs = {
  dev: developmentConfig,
  local: localConfig,
  prod: productionConfig,
};

const { STAND } = process.env;

export default configs[STAND];
