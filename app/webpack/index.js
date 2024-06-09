const local = require('./dev-server');
const client = require('./client');
const server = require("./server");

const standConfigs = {
    local,
    server,
    client,
}

const BUILD_TARGET = process.env.BUILD_TARGET;
const configs = [];

for (const target of BUILD_TARGET.split(',')) {
    configs.push(standConfigs[target.trim()])
}

module.exports = configs;