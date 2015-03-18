var React = require('react');
var Toolbar = require('./Toolbar');
var Canvas = require('./Canvas');

var Whiteboard = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Toolbar />
        <Canvas />
      </div>
    );
  }
});

module.exports = Whiteboard;
