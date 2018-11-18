/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
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
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
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
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    })
  ],
  watch: true,
  devtool: 'source-map',
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['typeface-roboto'],
    }),
  ],
  node: {
    __dirname: false,
  },
};
