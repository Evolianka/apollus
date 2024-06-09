import { resolve } from "node:path";
import nodemon from "nodemon";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import SERVER from "@root/config/server.config";
import clientConfig from "@root/webpack/client";
import serverConfig from "@root/webpack/server";

import logger from "./utils/logger";

const { ROOT_DIR } = process.env;
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

serverCompiler.watch(
  {
    ignored: [resolve(__dirname, `${ROOT_DIR}/node_modules/`)],
  },
  async (error, stats) => {
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

    logger.info("restarting server...");
    setTimeout(() => {
      nodemon.emit("restart");
    }, 300);
  },
);

const devServer = new WebpackDevServer(
  {
    devMiddleware: {
      writeToDisk: true,
    },
    host: "0.0.0.0",
    hot: true,
    liveReload: false,
    port: SERVER.frontPort,
    proxy: [
      {
        changeOrigin: false,
        context: (path) => !new RegExp(/.*\..*/gm).test(path),
        target: `http://localhost:${SERVER.backPort}`,
      },
    ],
    watchFiles: {
      paths: [`${ROOT_DIR}/src/**/*.*`],
    },
  },
  clientCompiler,
);

devServer.start();
