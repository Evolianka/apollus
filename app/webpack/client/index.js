const productionConfig = require("./webpack.client.prod");
const developmentConfig = require("./webpack.client.dev");

const isProduction = process.env.MODE === "production";
const config = isProduction ? productionConfig : developmentConfig;

module.exports = config;
