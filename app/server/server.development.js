const express = require("express");
const SERVER = require("../config/server.config");
const path = require("path");
const ssrMiddleware = require("./ssr-middleware");
const logger = require("./utils/logger");

logger.info('APP initialize');
const app = express();
logger.success('APP initialized');

logger.info('Static path initialize');
app.use(express.static(SERVER.staticPath));
logger.success('Static path initialized');

logger.info('SSR middleware initialize');
app.use('*', ssrMiddleware);
logger.success('SSR middleware initialized');

app.listen(SERVER.port, () => {
    logger.info(`Server listen: http://localhost:${SERVER.port}`);
});