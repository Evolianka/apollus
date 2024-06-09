const webpack = require("webpack");
const path = require("path");
const webpackConfigs = require("../webpack.config.js");
const nodemon = require('nodemon');
const chalk = require("chalk");

const compiler = webpack(webpackConfigs);
const {ROOT_DIR} = process.env


compiler.watch({
    ignored: [path.resolve(__dirname, `${ROOT_DIR}/node_modules/`)]
}, (err, stats) => {
    if (!nodemon.config.run) {
        nodemon({
            script: './server/server.development.js'
        })
    }



    if (err) {
        console.log(err);
        return;
    }

    console.log(chalk.yellow(stats.toString()))
    nodemon.emit('restart')
});
