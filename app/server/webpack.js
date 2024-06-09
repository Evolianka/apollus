const webpack = require("webpack");
const path = require("path");
const webpackConfigs = require("../webpack.config.js");
console.log(webpackConfigs)
const nodemon = require('nodemon');
const SERVER = require("../config/server.config.js");
const WebSocket = require('ws');
const logger = require('./utils/logger');
const compiler = webpack(webpackConfigs);
const {ROOT_DIR} = process.env

const http = require('http');
const server = http.createServer();
const ws = new WebSocket.Server({ server });

server.listen(9000);

ws.on('connection', () => {
    logger.info('ws client connected')
})

ws.on('reload', () => {
    ws.clients.forEach((client) => {
        client.send(JSON.stringify({action: 'reload'}))
    })
})

compiler.watch({
    ignored: [path.resolve(__dirname, `${ROOT_DIR}/node_modules/`)]
}, (err, stats) => {
    if (!nodemon.config.run) {
        nodemon({
            script: './server/server.development.js'
        })
    }



    if (err) {
       logger.error(err);
        return;
    }

    logger.info(stats.toString())
    nodemon.emit('restart')
    ws.emit('reload');
    logger.info('reload page')
});
