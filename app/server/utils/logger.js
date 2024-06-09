const SERVER = require("../../config/server.config");
const chalk = require('chalk');
 const logger = (...args) => {
    if (process.env.STAND !== 'production') {
        console.log(chalk.blue(...args))
    }
}

module.exports = logger;