//main
require('normalize.css');
require('../stylesheets/main.sass');
var React = require('react');
var Whiteboard = require('./components/Whiteboard');

React.render(
  <Whiteboard/>,
  document.getElementById('main')
);


