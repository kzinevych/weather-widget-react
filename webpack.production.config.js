"use strict";
const webpack              = require('webpack');
const path                 = require('path');
const loaders              = require('./webpack.loaders');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const CLIENT = process.env.CLIENT;

function KeySecretSalt(len) {
  let str = "weather-widget-";
  for (let i = 0; i < len; i++) {
    let rand     = Math.floor(Math.random() * 62);
    let charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
    str += String.fromCharCode(charCode);
  }
  return str.toString();
}

// local scss modules
loaders.push({
  test   : /[\/\\]src[\/\\].*\.scss/,
  exclude: /(node_modules|bower_components|private)/,
  loader : ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=_[hash:base64:8]!postcss!sass')
});
//global css files
loaders.push({
  test  : /[\/\\](node_modules|src|private)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
});

module.exports = {
  entry  : {
    main  : './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux'
    ]
  },
  output : {
    path      : path.join(__dirname, 'public'),
    filename  : '[chunkhash].js',
    publicPath: process.env.STATIC
  },
  resolve: {
    extensions        : ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  module : {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV : '"production"',
        '__DEV__': false,
        'CLIENT' : `"${CLIENT}"`
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[hash].js', 2),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings     : false,
        screw_ie8    : true,
        drop_console : true,
        drop_debugger: true
      },
      mangle  : {
        screw_ie8: true
      },
      output  : {
        comments : false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      favicon    : './src/favicon.ico',
      template   : './src/index.html',
      minify     : {
        removeComments    : true,
        collapseWhitespace: true
      },
      publicKey  : KeySecretSalt(13),
      application: CLIENT.toString(),
      title      : `${CLIENT.toString()}`,
    }),
    new webpack.optimize.DedupePlugin()
  ]
};
