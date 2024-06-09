import { createServer } from "node:http";
import path from "node:path";
import nodemon from "nodemon";
import webpack from "webpack";
import { Server } from "ws";

import webpackConfigs from "@root/webpack.config";

import logger from "./utils/logger";

const compiler = webpack(webpackConfigs);
const { ROOT_DIR } = process.env;

const server = createServer();
const ws = new Server({ server });

server.listen(9000);

ws.on("connection", () => {
  logger.info("ws client connected");
});

ws.on("reload", () => {
  for (const client of ws.clients) {
    client.send(JSON.stringify({ action: "reload" }));
  }
});

compiler.watch(
  {
    ignored: [path.resolve(__dirname, `${ROOT_DIR}/node_modules/`)],
  },
  (error, stats) => {
    // @ts-expect-error это свойство есть у nodemon и оно отображает состояние
    if (!nodemon.config.run) {
      nodemon({
        exec: "cross-env STAND=local-dev ts-node --require ./env.ts ./server/server.development.ts",
      });
    }

    if (error) {
      logger.error(error);

      return;
    }

    if (stats) {
      logger.info(stats.toString());
    }

    nodemon.emit("restart");
    ws.emit("reload");

    logger.info("reload page");
  },
);
