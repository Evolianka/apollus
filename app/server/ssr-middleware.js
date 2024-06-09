const {Root} = require("../dist/ssr/main");
const React = require('react');
const SERVER = require('../config/server.config');
const  path = require("path");
const  { renderToString } = require('react-dom/server');
const  fs = require('fs');
const  { ChunkExtractor } = require('@loadable/server');

function ssrMiddleware(req, res) {
        try {
                let template = '';
                fs.readFile(path.resolve(__dirname, '../src/templates/index.html'), 'utf-8', (err, data) => {
                        if (err) {
                                throw err
                        }

                        template = data;

                        const extractor = new ChunkExtractor({ statsFile: SERVER.staticPath + '/loadable-stats.json' })
                        const jsx = extractor.collectChunks(React.createElement(Root));
                        const html = renderToString(jsx);
                        const scriptTags = extractor.getScriptTags();
                        const serverStatusTag = `<script>window.SERVER_STATUS=${JSON.stringify(SERVER.ssr.successStatus)};</script>`;
                        const wsTag = `<script>(function ${SERVER.ssr.clientWs.toString()})();</script>`;
                        const linkTags = extractor.getLinkTags();
                        const styleTags = extractor.getStyleTags();

                        const renderedHtml = template.replace('{{HEAD}}', linkTags + styleTags)
                            .replace('{{TITLE}}', 'Argentum Konstantinium')
                            .replace('{{BODY_TOP}}', '')
                            .replace('{{BODY_BOTTOM}}', serverStatusTag + scriptTags + wsTag)
                            .replace('{{ROOT}}', html);

                        res.status(200).set({'Content-Type': 'text/html'}).end(renderedHtml);
                })


        } catch (err) {
               res.status(200, `
                    <script>
                        window.SERVER_STATUS = {
                            success: false, 
                            message: 'internal_error', 
                            code: 500
                        }
                    </script>`);
        }
}

module.exports = ssrMiddleware;