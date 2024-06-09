import { resolve } from "node:path";

const { ROOT_DIR } = process.env;

const SERVER = {
  backPort: 3000,
  colors: {
    error: "#FF0000",
    info: "#6e6fdc",
    success: "#00FF5A",
  },
  frontPort: 5000,
  loggerMessageColor: "yellow",
  ssr: {
    clientWs() {
      const ws = new WebSocket(`ws://localhost:9000`);

      ws.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        if (data.action === "reload") {
          location.reload();
        }
      });
    },
    successStatus: {
      code: 200,
      message: "SSR finished success",
      success: true,
    },
  },
  staticPath: resolve(__dirname, `${ROOT_DIR}/dist/client`),
  wsPort: 9000,
};

export default SERVER;
