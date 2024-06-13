import { resolve } from "node:path";
import nodemon from "nodemon";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import SERVER from "@root/config/server.config";
import clientConfig from "@root/webpack/client";
import serverConfig from "@root/webpack/server";

import logger from "./utils/logger";
import {exec} from "node:child_process";

const { ROOT_DIR } = process.env;
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

 exec(`cross-env STAND=local ts-node --require ./env.ts ./server/server.development.ts`)
serverCompiler.watch(
  {
    ignored: [resolve(__dirname, `${ROOT_DIR}/node_modules/`)],
  },
  async (error, stats) => {
    if (error) {
      logger.error(error);

      return;
    }

    if (stats) {
      logger.info(stats.toString());
    }

    logger.info("restarting server...");
    // s
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
