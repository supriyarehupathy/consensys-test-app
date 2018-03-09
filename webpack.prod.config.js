const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPluginCommonConfig = new ExtractTextPlugin('common.[hash].css');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  chunksSortMode: 'dependency',
  alwaysWriteToDisk: true,
  minify: {
    collapseWhitespace: true
  }
});

const FeatureFlagsPluginConfig = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify("production")
  }
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: './src/assets', to: './src/assets' },
]);

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/index.js'],
    commonChunk1: ['lodash'],
  },
  output: {
    publicPath: "/",
    path: path.resolve('dist'),
    chunkFilename: '[name]-chunk.[hash].js',
    filename: "[name]-bundle.[hash].js",
    sourceMapFilename: '[name]-map.map'
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ]
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      include: path.resolve('./src/common/styles'),
      loader: ExtractTextPluginCommonConfig.extract({
        fallback: 'style-loader',
        use: {
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: true,
          }
        },
      })
    },
    {
      test: /\.(jpe?g|png|gif|eot|svg|otf)$/i,
      use: 'file-loader?name=[name].[ext]'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
    },
    {
      test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: "url-loader?limit=10000&mimetype=application/font-otf&name=fonts/[name].[ext]"
    },
    ]
  },
  plugins: [
    CopyWebpackPluginConfig,
    FeatureFlagsPluginConfig,
    HtmlWebpackPluginConfig,
    ExtractTextPluginCommonConfig,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: function (module, count) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commonChunk1',
      chunks: ['main', 'commonChunk1', 'vendor'],
      minChunks: Infinity,
    }),
  ]
}
