/**
 * This webpack configuration bundles all RPCService classes
 * for distribution.
 *
 * The bundle will be stored into the window object "RPCService"
 */
const path = require("path");
const webpack = require('webpack');
const yargs = require('yargs');
const argv = yargs.alias('p', 'prod').argv;
const outputPath = path.resolve(__dirname, argv.p ? "./dist/min" : "./dist");
const output = argv.p ? "[name].rpcservice.min.js" : "[name].rpcservice.js";

let config = {
  context: __dirname,
  name: "RPCService",
  entry: {
    server: "./src/server",
    client: "./src/client"
  },

  output: {
    path: outputPath,
    filename: output,
    library: "RPCService",
    libraryTarget: "umd"
  },

  devtool: "source-map",
  plugins: [],

  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["es6-promise", "transform-es2015-parameters", ["transform-es2015-classes", {loose: true}]]
        }
      }
    ]
  }
};

// minimize in production mode
/*if (argv.p) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}*/

module.exports = config;