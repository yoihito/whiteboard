//main
require('normalize.css');
require('../stylesheets/main.css');
var React = require('react');
var Canvas = require('./components/Canvas');


React.render(
  <Canvas/>,
  document.getElementById('main')
);
