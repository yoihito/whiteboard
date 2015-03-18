var React = require('react');
var Tool = require('./Tool');


var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
        <Tool type="pencil" />
        <Tool type="color chooser" />
        <Tool type="eraser" />
      </div>
    );
  }
});

module.exports = Toolbar;
