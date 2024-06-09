const path = require("path");

const SERVER = {
    port: 5000,
    loggerMessageColor: 'yellow',
    staticPath: path.resolve(__dirname, '../dist/client'),
    successStatus: {
        success: true,
        message: 'SSR finished success',
        code: 200
    }
}

module.exports = SERVER