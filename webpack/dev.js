/* eslint-disable */

const webpack = require('webpack');
const common = require('./common');

module.exports = Object.assign(common, {
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    })
  ]
});
