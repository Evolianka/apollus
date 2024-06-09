const productionConfig = require('./webpack.server.prod');
const devConfig = require('./webpack.server.dev');

const isProduction = process.env.MODE === 'production';
const config = isProduction ? productionConfig : devConfig;

module.exports = config;
