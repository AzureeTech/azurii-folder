module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  }
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');