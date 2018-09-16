/* eslint-disable */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const babelConfig = require('./babel.config.json');

module.exports = {
  mode: 'production',
  entry: {
    electron: resolve(__dirname, '..', 'src/electron.js'),
    app: resolve(__dirname, '..', 'src/app.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '..', 'build/')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: babelConfig.presets,
          plugins: babelConfig.plugins
        }
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '..', 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      cache: true
    })
  ],
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
};
