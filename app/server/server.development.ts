import express from "express";

import SERVER from "@root/config/server.config";

import logger from "./utils/logger";
import ssrMiddleware from "./ssrMiddleware";

logger.info("APP initialize");
const app = express();

logger.success("APP initialized");

logger.info("Static path initialize");
app.use(express.static(SERVER.staticPath));
logger.success("Static path initialized");

logger.info("SSR middleware initialize");
app.use("*", ssrMiddleware);
logger.success("SSR middleware initialized");

app.listen(SERVER.port, () => {
  logger.info(`Server listen: http://localhost:${SERVER.port}`);
});
