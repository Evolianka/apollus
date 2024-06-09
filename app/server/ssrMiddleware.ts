import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Request, Response } from "express";
import { readFile } from "node:fs";
import { resolve } from "node:path";

import { ChunkExtractor } from "@loadable/server";
import SERVER from "@root/config/server.config";
import { Root } from "@root/dist/ssr/main";

function ssrMiddleware(_: Request, response: Response) {
  try {
    let template = "";

    readFile(
      resolve(__dirname, "../src/templates/index.html"),
      "utf8",
      (error, data) => {
        if (error) {
          throw error;
        }

        template = data;

        const extractor = new ChunkExtractor({
          statsFile: SERVER.staticPath + "/loadable-stats.json",
        });
        const jsx = extractor.collectChunks(createElement(Root));
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const renderedJsx = renderToString(jsx);
        const scriptTags = extractor.getScriptTags();
        const serverStatusTag = `<script>window.SERVER_STATUS=${JSON.stringify(SERVER.ssr.successStatus)};</script>`;
        const wsTag = `<script>(function ${SERVER.ssr.clientWs.toString()})();</script>`;
        const linkTags = extractor.getLinkTags();
        const styleTags = extractor.getStyleTags();

        const renderedHtml = template
          .replace("{{HEAD}}", linkTags + styleTags)
          .replace("{{TITLE}}", "Argentum Konstantinium")
          .replace("{{BODY_TOP}}", "")
          .replace("{{BODY_BOTTOM}}", serverStatusTag + scriptTags + wsTag)
          .replace("{{ROOT}}", renderedJsx);

        response
          .status(200)
          .set({ "Content-Type": "text/html" })
          .end(renderedHtml);
      },
    );
  } catch {
    response.status(200).set({ "Content-type": "text/html" }).end(`
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
