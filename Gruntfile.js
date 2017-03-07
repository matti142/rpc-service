module.exports = function (grunt) {
  "use strict";

  // load all grunt prefixed tasks
  require('load-grunt-tasks')(grunt);

  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");
  var HtmlWebpackPlugin = require('html-webpack-plugin');


  // Project configuration.
  grunt.initConfig({

    clean: ['target/'],

    webpack: {
      options: webpackConfig,
      build: {
        devtool: "inline-source-map"
      },

      // build iframe example
      "example-iframe": {
        entry: {
          consumer: "./examples/iframe/consumer.js",
          provider: "./examples/iframe/provider.js"
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: 'examples/iframe/index.html',
            chunks: ['consumer']
          }),
          new HtmlWebpackPlugin({
            filename: 'iframe.html',
            template: 'examples/iframe/iframe.html',
            chunks: ['provider']
          })
        ],
        output: {
          path: './target/examples/iframe'
        }
      },

      // build iframe example
      "example-iframe-sameorigin": {
        entry: {
          consumer: "./examples/iframe-sameorigin/consumer.js",
          provider: "./examples/iframe-sameorigin/provider.js"
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: 'examples/iframe-sameorigin/index.html',
            chunks: ['consumer']
          }),
          new HtmlWebpackPlugin({
            filename: 'iframe.html',
            template: 'examples/iframe-sameorigin/iframe.html',
            chunks: ['provider']
          })
        ],
        output: {
          path: './target/examples/iframe-sameorigin'
        }
      },

      // build localstorage example
      "example-localstorage": {
        entry: {
          consumer: "./examples/localstorage/consumer.js",
          provider: "./examples/localstorage/provider.js"
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: 'examples/localstorage/index.html',
            chunks: ['consumer']
          }),
          new HtmlWebpackPlugin({
            filename: 'tab.html',
            template: 'examples/localstorage/tab.html',
            chunks: ['provider']
          })
        ],
        output: {
          path: './target/examples/localstorage'
        }
      },

      // build window example
      "example-window": {
        entry: {
          consumer: "./examples/window/consumer.js",
          provider: "./examples/window/provider.js"
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: 'examples/window/index.html',
            chunks: ['consumer']
          }),
          new HtmlWebpackPlugin({
            filename: 'window.html',
            template: 'examples/window/window.html',
            chunks: ['provider']
          })
        ],
        output: {
          path: './target/examples/window'
        }
      }
    },

    "webpack-dev-server": {
      options: {
        port: 12345,
        webpack: webpackConfig,
        publicPath: "/" + webpackConfig.output.publicPath,
        contentBase: "target/",
        compress: false
      },
      start: {
        keepAlive: true,
        webpack: {
          devtool: "source-map",
          debug: true
        }
      }
    }

  });

  // define interface to grunt in project
  grunt.registerTask("default", ["clean", "webpack"]);

};