import { config } from "dotenv";
import path from "node:path";

const { STAND } = process.env;
const ROOT_DIR = path.resolve(__dirname, "./");

process.env.ROOT_DIR = ROOT_DIR;

config({
  path: [`${ROOT_DIR}/.env`, `${ROOT_DIR}/.env.${STAND}`],
});
