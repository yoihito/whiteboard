var React = require('react');
var ToolActions = require('../actions/ToolActions');

var Tool = React.createClass({
  render: function() {
    var type = this.props.type;
    return (
      <div className="tool" onClick={this._onClick}>
        <span className="title">{type}</span>
      </div>
    );
  },

  _onClick: function() {
    console.log(this.props.type);
    ToolActions.changeTool(this.props.type);
  }


});

module.exports = Tool;
