const webpack = require("webpack");
const commonConfig = require("../common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const {mergeWithRules} = require("webpack-merge");
const LoadablePlugin = require('@loadable/webpack-plugin');

const ROOT_DIR = process.env.ROOT_DIR;

const config = mergeWithRules({
    module: {
        rules: {
            test: "match",
            use: "prepend",
        },
    },
})(commonConfig, {
    entry: [
        path.resolve(__dirname, `${ROOT_DIR}/src/App`),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, `${ROOT_DIR}/dist/client`),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader
                ],
            },
        ],
    },

    name: "client",

    plugins: [
        new webpack.DefinePlugin({"process.env": JSON.stringify(process.env)}),
        new LoadablePlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/style.css",
            linkType: 'text/css'
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, `${ROOT_DIR}/src/static`),
                    to: path.resolve(__dirname, `${ROOT_DIR}/dist/client/res`),
                },
            ],
        }),
    ],

    target: "web",
});

module.exports = config;