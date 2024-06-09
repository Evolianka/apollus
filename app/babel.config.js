const plugins = ["@loadable/babel-plugin"];

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {"runtime": "automatic"}],
        "@babel/preset-typescript",
    ],
    plugins,
};