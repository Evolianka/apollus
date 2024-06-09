const path = require("path");

const SERVER = {
    port: 5000,
    wsPort: 9000,
    loggerMessageColor: 'yellow',
    staticPath: path.resolve(__dirname, '../dist/client'),
    ssr: {
        successStatus: {
            success: true,
            message: 'SSR finished success',
            code: 200
        },
        clientWs() {
            const ws = new WebSocket(`ws://localhost:9000`)
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.action === 'reload') {
                    location.reload();
                }
            }
        }
    },
    colors: {
        success: '#00FF5A',
        error: '#FF0000',
        info: '#6e6fdc'
    }
}

module.exports = SERVER