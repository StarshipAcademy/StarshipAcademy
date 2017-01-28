'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './browser/src',
  output: {
    path: __dirname,
    filename: './browser/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe.js/
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
};
