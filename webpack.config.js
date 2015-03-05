var bower_dir = __dirname + '/bower_components';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },

  context: __dirname,
  cache: true,
  debug: true,
  devtool: false,
  entry: {
    app: ['./assets/javascripts/app'],
    vendors: ['react']
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: './javascripts/[name].js',
    publicPath: '/public',
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {}
  },

  module: {
    noParse: [],
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  plugins: [
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ]),
    new webpack.optimize.CommonsChunkPlugin('vendors', './javascripts/vendors.js'),
  ]
};

config.addVendor('react',  bower_dir + '/react/react.min.js');

module.exports = config;
