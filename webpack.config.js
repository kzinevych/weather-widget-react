"use strict";
const webpack           = require('webpack');
const path              = require('path');
const loaders           = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST   = process.env.HOST || "localhost";
const PORT   = process.env.PORT || "9000";
const CLIENT = process.env.CLIENT;

/**
 * @return {string}
 */
function KeySecretSalt(len) {
  let str = "weather-widget-";
  for (let i = 0; i < len; i++) {
    let rand     = Math.floor(Math.random() * 62);
    let charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
    str += String.fromCharCode(charCode);
  }
  return str.toString();
}

loaders.push({
  test   : /[\/\\](node_modules|bower_components|private|src)[\/\\].*\.css$/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
});

loaders.push({
  test   : /[\/\\]src[\/\\].*\.scss/,
  exclude: /(node_modules|bower_components)/,
  loaders: [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    'postcss',
    'sass'
  ]
});

module.exports = {
  entry    : {
    main  : [
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      `webpack/hot/only-dev-server`,
      `./src/index.js`
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux'
    ]
  },
  devtool  : process.env.WEBPACK_DEVTOOL || 'source-map',
  output   : {
    filename     : '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath   : `//${HOST}:${PORT}/`,
    path         : path.join(__dirname, 'public')
  },
  resolve  : {
    extensions: ['', '.js', '.jsx']
  },
  module   : {
    loaders
  },
  devServer: {
    contentBase       : "./public",
    noInfo            : true,
    hot               : true,
    inline            : true,
    clientLogLevel    : "info",
    historyApiFallback: true,
    port              : PORT,
    host              : HOST
  },
  plugins  : [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV : '"development"',
        '__DEV__': true,
        'CLIENT' : `"${CLIENT}"`
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new HtmlWebpackPlugin({
      favicon    : './src/favicon.ico',
      hash       : true,
      title      : `${CLIENT.toString()}`,
      template   : './src/index.html',
      filename   : 'index.html',
      publicKey  : KeySecretSalt(13),
      application: CLIENT.toString()
    })
  ]
};
