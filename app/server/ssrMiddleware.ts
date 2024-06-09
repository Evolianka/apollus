import { createElement } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { Request, Response } from "express";
import { readFile } from "node:fs";
import { resolve } from "node:path";

import { createFetchRequest } from "@/server/utils/createRequest";
import { ChunkExtractor } from "@loadable/server";
import SERVER from "@root/config/server.config";
import routes from "@root/dist/ssr/main";

const { ROOT_DIR } = process.env;
const handler = createStaticHandler(routes);

function ssrMiddleware(req: Request, res: Response) {
  try {
    let template = "";

    readFile(
      resolve(__dirname, `${ROOT_DIR}/src/templates/index.html`),
      "utf8",
      async (error, data) => {
        if (error) {
          throw error;
        }

        template = data;
        const fetchRequest = createFetchRequest(req, res);
        const context = await handler.query(fetchRequest);
        const router = createStaticRouter(handler.dataRoutes, context);
        const extractor = new ChunkExtractor({
          statsFile: resolve(
            __dirname,
            `${ROOT_DIR}/dist/client/loadable-stats.json`,
          ),
        });
        const jsx = extractor.collectChunks(
          createElement(StaticRouterProvider, {
            context,
            router,
          }),
        );
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const renderedJsx = renderToString(jsx);
        const scriptTags = extractor.getScriptTags();
        const serverStatusTag = `<script>window.SERVER_STATUS=${JSON.stringify(SERVER.ssr.successStatus)};</script>`;
        const linkTags = extractor.getLinkTags();
        const styleTags = extractor.getStyleTags();

        const renderedHtml = template
          .replace("{{HEAD}}", linkTags + styleTags)
          .replace("{{TITLE}}", "Argentum Konstantinium")
          .replace("{{BODY_TOP}}", "")
          .replace("{{BODY_BOTTOM}}", serverStatusTag + scriptTags)
          .replace("{{ROOT}}", renderedJsx);

        res.status(200).set({ "Content-Type": "text/html" }).end(renderedHtml);
      },
    );
  } catch {
    res.status(200).set({ "Content-type": "text/html" }).end(`
        <script>
            window.SERVER_STATUS = {
            success: false, 
                message: 'internal_error', 
                code: 500
            }
        </script>
      `);
  }
}

export default ssrMiddleware;
