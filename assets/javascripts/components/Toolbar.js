var React = require('react');
var Tool = require('./Tool');


var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
        <Tool type="PENCIL" />
        <Tool type="COLOR_CHOOSER" />
        <Tool type="ERASER" />
      </div>
    );
  }
});

module.exports = Toolbar;
