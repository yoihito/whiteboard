var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// webpack hashes support
var webpackAssets = require('express-webpack-assets');
app.use(webpackAssets('./config/webpack-assets.json'));

var socket = require('./app/socket.js')
var routes = require('./config/routes')
routes(app, {verbose: !module.parent});

// development settings

if (app.get('env') === 'development') {
  // on-change reload assets
  var webpackDevMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');
  var config = require('./dev.webpack.config.js');
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }));

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//zazaa test

module.exports = app;
