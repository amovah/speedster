/* eslint-disable */

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./common.js');

module.exports = Object.assign({}, common, {
  mode: 'development',
  watch: true,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  devtool: 'source-map',
})
