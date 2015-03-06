var bower_dir = __dirname + '/bower_components';
var path = require('path');
var webpack = require('webpack');
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
    filename: 'main.js',
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
      { test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name].[ext]'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ]
};

config.addVendor('react',  bower_dir + '/react/react.js');

module.exports = config;
