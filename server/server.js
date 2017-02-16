import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "./../webpack.production.config.js";

const app      = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo    : true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Listening at http://localhost:8080');
});
