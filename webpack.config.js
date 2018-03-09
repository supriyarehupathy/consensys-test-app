const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: true,
});

const ExtractTextPluginConfig = new ExtractTextPlugin('style.bundle.css')
const FeatureFlagsPluginConfig = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify("development")
  }
});

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'src'),
}

module.exports = {
  entry: ['babel-polyfill',path.join(paths.JS, 'index.js')],
  output: {
    path: paths.DIST,
    filename: "bundle.js",
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    {
      test: /\.(jpe?g|png|gif|eot|svg|otf)$/i,
      loader: 'file-loader'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-otf"
    },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    FeatureFlagsPluginConfig,
  ],
  devServer: {
    port: 2000,
    historyApiFallback: true
  }
}