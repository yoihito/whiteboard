var React = require('react');
var _ = require('lodash');
var CanvasStore = require('../stores/CanvasStore');
var CanvasActions = require('../actions/CanvasActions');


function getStateFromStore() {
  return {
    actions: CanvasStore.getAllActions(),
    mouseDown: CanvasStore.getLeftButtonState()
  }
}

var Canvas = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    this.canvas = this.getDOMNode();
    this.ctx = this.canvas.getContext("2d");
    var canvasStyle = window.getComputedStyle(this.canvas, null)
    this.canvas.width = canvasStyle.width.replace('px','');
    this.canvas.height = canvasStyle.height.replace('px','');

    CanvasStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CanvasStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.actions.length > 0) {
      var actions = this.state.actions;
      _.each(actions, (function(that) {
        return function (action) {
          var points = action.points;
          that.ctx.beginPath();
          that.ctx.lineCap = "round";
          that.ctx.lineJoin = "round";
          that.ctx.lineWidth = 5;
          that.ctx.moveTo(points[0].x, points[0].y);
          _.each(points, function(point) {
            that.ctx.lineTo(point.x, point.y);
          });
          that.ctx.stroke();
        }
      })(this));

    }
    return (
      <canvas
        id="board"
        onTouchStart={this._onTouchStart}
        onMouseDown={this._onMouseDown}
        onMouseMove={this._onMouseMove}
        onTouchMove={this._onTouchMove}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseUp}
        onTouchEnd={this._onTouchEnd}
      >
      </canvas>
    );
  },

  _mousePosition: function(event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  _onTouchStart: function(touchEvent) {
    this._onMouseDown(touchEvent.touches.item(0));
  },

  _onTouchMove: function(touchEvent) {
    this._onMouseMove(touchEvent.touches.item(0));
  },

  _onTouchEnd: function(touchEvent) {
    this._onMouseUp(touchEvent.touches.item(0));
  },

  _onMouseDown: function(event) {
    CanvasActions.beginDrawing(this._mousePosition(event));
  },

  _onMouseMove: function(event) {
    CanvasActions.moveCursor(this._mousePosition(event));
  },

  _onMouseUp: function(event) {
    CanvasActions.endDrawing();
  }

})

module.exports = Canvas;
