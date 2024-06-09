import developmentConfig from "./webpack.client.dev";
import productionConfig from "./webpack.client.prod";

const isProduction = process.env.MODE === "production";
const config = isProduction ? productionConfig : developmentConfig;

export default config;
