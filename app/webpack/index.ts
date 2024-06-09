import client from "./client";
import server from "./server";

const standConfigs = {
  client,
  server,
};

const BUILD_TARGET = process.env.BUILD_TARGET;
const configs = [];

for (const target of BUILD_TARGET.split(",")) {
  configs.push(standConfigs[target.trim()]);
}

export default configs;
