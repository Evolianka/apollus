const {Root} = require("../dist/ssr/main");
const React = require('react');
const SERVER = require('../config/server.config');
const  path = require("path");
const  { renderToString } = require('react-dom/server');
const  fs = require('fs');
const  { ChunkExtractor } = require('@loadable/server');
const statsFile = path.resolve(__dirname, '../dist/client/loadable-stats.json')

function ssrMiddleware(req, res) {
        try {
                let template = '';
                fs.readFile(path.resolve(__dirname, '../src/templates/index.html'), 'utf-8', (err, data) => {
                        if (err) {
                                throw err
                        }

                        template = data;

                        const extractor = new ChunkExtractor({ statsFile })
                        const jsx = extractor.collectChunks(React.createElement(Root));
                        const html = renderToString(jsx);
                        const scriptTags = extractor.getScriptTags();
                        const linkTags = extractor.getLinkTags();
                        const styleTags = extractor.getStyleTags()
                        const renderedHtml = template.replace('{{HEAD}}', linkTags + styleTags)
                            .replace('{{TITLE}}', 'Argentum Konstantinium')
                            .replace('{{BODY_TOP}}', '')
                            .replace('{{BODY_BOTTOM}}', scriptTags + `<script>window.SERVER_STATUS=${JSON.stringify(SERVER.successStatus)};</script>`)
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