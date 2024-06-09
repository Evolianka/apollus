import developmentConfig from "./webpack.server.dev";
import localConfig from "./webpack.server.local";
import productionConfig from "./webpack.server.prod";

const configs = {
  dev: developmentConfig,
  local: localConfig,
  prod: productionConfig,
};

const { STAND } = process.env;

export default configs[STAND];
