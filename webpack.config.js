const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  module: {
      loaders: [
          {
              test: /\.ejs$/,
              loader: 'ejs-loader',
          },
      ]
  }
};
