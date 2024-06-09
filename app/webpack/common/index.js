const productionConfig = require("./webpack.common.prod");
const developmentConfig = require("./webpack.common.dev");

const isProduction = process.env.MODE === "production";
const config = isProduction ? productionConfig : developmentConfig;

module.exports = config;
