const plugins = ["@loadable/babel-plugin"];

module.exports = {
  plugins,
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
