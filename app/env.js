const dotenv = require('dotenv');
const path = require("path");

const {STAND} = process.env;
const ROOT_DIR = path.resolve(__dirname, './');
process.env.ROOT_DIR = ROOT_DIR;

dotenv.config({
    path: [
        `${ROOT_DIR}/.env`,
        `${ROOT_DIR}/.env.${STAND}`
    ]
})
