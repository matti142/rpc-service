/**
 * Webpack configuration to build an example.
 *
 * Build all (-p stands for production), or "-w" for watch:
 *   webpack -p
 *
 * Build specific example, e.g. "iframe":
 *   webpack -p --env.example=iframe
 *
 * alias via npm scripts:
 *   npm run build -- --env.example=iframe
 *   npm run watch -- --env.example=iframe
 *
 * Examples:
 *   iframe
 *   iframe-sameorigin
 *   localstorage
 *   window
 */
const path = require("path");
const _ = require("lodash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require('yargs')
  .alias('w', 'watch')
  .argv;

/**
 * default config to be used for all examples
 */
const defaultConfig = {
  context: path.resolve(__dirname),

  entry: {
    server: "./src/Server.js",
    client: "./src/Client.js"
  },

  output: {
    path: "./target",
    filename: "[name].bundle.js",
    libraryTarget: "umd"
  },

  plugins: [],

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = function(env) {

  let config = [];
  function addConfig(name, conf) {
    if (!env.example || env.example && env.example === name) {
      config.push(_.merge(_.cloneDeep(defaultConfig), conf));
    }
  }

  /**
   * iframe cross origin
   */
  addConfig("iframe", {
    entry: {
      server: "./examples/iframe/server.js",
      client: "./examples/iframe/client.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'examples/iframe/index.html',
        chunks: ['server']
      }),
      new HtmlWebpackPlugin({
        filename: 'iframe.html',
        template: 'examples/iframe/iframe.html',
        chunks: ['client']
      })
    ],
    output: {
      path: './target/examples/iframe'
    }
  });

  /**
   * iframe same origin
   */
  addConfig("iframe-sameorigin", {
    entry: {
      server: "./examples/iframe-sameorigin/server.js",
      client: "./examples/iframe-sameorigin/client.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'examples/iframe-sameorigin/index.html',
        chunks: ['server']
      }),
      new HtmlWebpackPlugin({
        filename: 'iframe.html',
        template: 'examples/iframe-sameorigin/iframe.html',
        chunks: ['client']
      })
    ],
    output: {
      path: './target/examples/iframe-sameorigin'
    }
  });

  /**
   * local storage
   */
  addConfig("localstorage", {
    entry: {
      server: "./examples/localstorage/server.js",
      client: "./examples/localstorage/client.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'examples/localstorage/index.html',
        chunks: ['server']
      }),
      new HtmlWebpackPlugin({
        filename: 'tab.html',
        template: 'examples/localstorage/tab.html',
        chunks: ['client']
      })
    ],
    output: {
      path: './target/examples/localstorage'
    }
  });

  /**
   * local storage
   */
  addConfig("window", {
    entry: {
      server: "./examples/window/server.js",
      client: "./examples/window/client.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'examples/window/index.html',
        chunks: ['server']
      }),
      new HtmlWebpackPlugin({
        filename: 'window.html',
        template: 'examples/window/window.html',
        chunks: ['client']
      })
    ],
    output: {
      path: './target/examples/window'
    }
  });

  // clean target dir before building (do not while watching)
  if (!argv.w && config.length > 0) {
    config[0].plugins.push(new CleanWebpackPlugin(["target"], {
      verbose: false
    }));
  }

  return config;
};