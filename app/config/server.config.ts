import { resolve } from "node:path";

const SERVER = {
  colors: {
    error: "#FF0000",
    info: "#6e6fdc",
    success: "#00FF5A",
  },
  loggerMessageColor: "yellow",
  port: 5000,
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
  staticPath: resolve(__dirname, "../dist/client"),
  wsPort: 9000,
};

export default SERVER;
