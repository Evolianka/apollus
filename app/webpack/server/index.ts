import developmentConfig from "./webpack.server.dev";
import productionConfig from "./webpack.server.prod";

const isProduction = process.env.MODE === "production";
const config = isProduction ? productionConfig : developmentConfig;

export default config;
