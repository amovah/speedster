/* eslint-disable */

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    electron: resolve(__dirname, '..', 'src/electron/index.js'),
    app: resolve(__dirname, '..', 'src/app.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '..', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
          ],
        }
      }, {
        test: /\.(css|less)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          'url-loader'
        ]
      },
    ]
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '..' ,'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  target: 'electron-renderer',
  externals: [
    nodeExternals({
      whitelist: ['antd/dist/antd.less'],
    }),
  ],
  node: {
    __dirname: false,
  },
};
