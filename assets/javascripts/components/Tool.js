var React = require('react');

var Tool = React.createClass({
  render: function() {
    var type = this.props.type;
    return (
      <div className="tool">
        <span className="title">{type}</span>
      </div>
    );
  }
});

module.exports = Tool;
