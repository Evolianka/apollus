const SERVER = require("../../config/server.config");
const chalk = require('chalk');
const logger = {
    info: (...args) => {
        console.log(chalk.hex(SERVER.colors.info)(...args))
    },

    error: (...args) => {
        console.log(chalk.hex(SERVER.colors.error)(...args))
    },

    success: (...args) => {
        console.log(chalk.hex(SERVER.colors.success)(...args))
    }

}

module.exports = logger;