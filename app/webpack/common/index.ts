import developmentConfig from "./webpack.common.dev";
import productionConfig from "./webpack.common.prod";

const isProduction = process.env.MODE === "production";
const config = isProduction ? productionConfig : developmentConfig;

export default config;
