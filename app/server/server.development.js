const express = require("express");
const SERVER = require("../config/server.config");
const path = require("path");
const ssrMiddleware = require("./server.common");
const logger = require("./utils/logger");

logger('APP initialize');
const app = express();
logger('APP initialized');

logger('Static path initialize');
app.use(express.static(path.resolve(__dirname, '../dist/client')));
logger('Static path initialized');

logger('SSR middleware initialize');
app.use('*', ssrMiddleware);
logger('SSR middleware initialized');

app.listen(SERVER.port, () => {
    logger(`Server started: http://localhost:${SERVER.port}`);
})