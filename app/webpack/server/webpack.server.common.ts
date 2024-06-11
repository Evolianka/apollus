import {resolve} from "node:path";
import webpack, {Configuration} from "webpack";
import {merge} from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";

import commonConfig from "@root/webpack/common";

const {ROOT_DIR} = process.env;

const config: Configuration = merge(commonConfig, {
    entry: [resolve(__dirname, `${ROOT_DIR}/src/app/App.server`)],
    externals: [webpackNodeExternals()],
    externalsPresets: {node: true},

    module: {
        rules: [
            {
                test: /\.([jt])sx?$/,
                use: {
                    loader: 'swc-loader',
                },
                include: /src/
            },
        ],
    },

    name: "server",

    output: {
        libraryTarget: "umd",
        path: resolve(__dirname, `${ROOT_DIR}/dist/ssr`),
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({"process.env": JSON.stringify({...process.env, IS_SSR: true})}),
    ],

    target: "node",
});

export default config;
