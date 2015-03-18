var bower_dir = __dirname + '/bower_components';
var path = require('path');
var webpack = require('webpack');
var SaveHashes = require('assets-webpack-plugin');

var config = {

  context: __dirname,
  cache: true,
  debug: true,
  entry: {
    main: ['./assets/javascripts/main'],
    vendors: ['react', 'lodash', 'normalize.css']
  },

  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
    pathinfo: true
  },

  resolve: {
    extensions: ['', '.js'],
    root: [
      path.join(__dirname, "bower_components"),
      path.join(__dirname, "node_modules")
    ]
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
      { test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader?indentedSyntax=sass&outputStyle=expanded&'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name].[ext]'},
    ]
  },

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors-[chunkhash].js'),
    new SaveHashes({path: path.join(__dirname, 'config')})
  ]
};

module.exports = config;
