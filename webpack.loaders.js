module.exports = [
  {
    test   : /\.js?$/,
    exclude: /(node_modules|bower_components|public)/,
    loader : 'babel',
    query  : {
      presets: ["es2015", "react", "stage-0", "stage-1", "stage-2", "stage-3"],
      plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
    }
  },
  {test: /.(png|jpg|jpeg|ico|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=100000'},
];
