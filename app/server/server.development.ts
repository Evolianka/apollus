import express from "express";

import SERVER from "@root/config/server.config";

import logger from "./utils/logger";
import ssrMiddleware from "./ssrMiddleware";

logger.info("Server: initialize");
const app = express();

logger.success("Server: initialized");

logger.info("Server: static path initialize");
app.use(express.static(SERVER.staticPath));
logger.success("Server: static path initialized");

logger.info("Server: SSR middleware initialize");
app.use("*", ssrMiddleware);
logger.success("Server: SSR middleware initialized");

app.listen(SERVER.backPort, () => {
  logger.info(`Server listen: http://localhost:${SERVER.backPort}`);
});
