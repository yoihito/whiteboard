var bower_dir = __dirname + '/bower_components';
var path = require('path');
var webpack = require('webpack');
var SaveHashes = require('assets-webpack-plugin');

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },

  context: __dirname,
  cache: true,
  debug: true,
  entry: {
    main: ['./assets/javascripts/main'],
    vendors: ['react']
  },

  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
    pathinfo: true
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {}
  },

  module: {
    noParse: [],
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],
    loaders: [
      { test: /\.js$/, loader: 'react-hot!jsx-loader?harmony'},
      { test: /\.(sass|scss)$/, loader: 'style-loader!css-loader!sass-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name].[ext]'},
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors-[chunkhash].js'),
    new SaveHashes({path: path.join(__dirname, 'config')})
  ]
};

config.addVendor('react',  bower_dir + '/react/react.js');

module.exports = config;
