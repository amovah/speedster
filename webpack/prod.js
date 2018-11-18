/* eslint-disable */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./common');

module.exports = Object.assign(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      cache: true
    })
  ]
});
