var React = require('react');
var assign = require('object-assign');
var _ = require('lodash');

var Canvas = React.createClass({

  componentDidMount: function() {
    this.canvas = this.getDOMNode();
    var canvasStyle = window.getComputedStyle(this.canvas, null)
    this.canvas.width = canvasStyle.width.replace('px','');
    this.canvas.height = canvasStyle.height.replace('px','');
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 3;
    this.mouseDown = false;
    this.points = [];
  },

  render: function() {
    return (
      <canvas
        id="board"
        onMouseDown={this._onMouseDown}
        onMouseMove={this._onMouseMove}
        onMouseUp={this._onMouseUp}>

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

  _redraw: function () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    _.each(this.points, (function(that) {
      return function(point) {
        that.ctx.lineTo(point.x, point.y);
      }
    })(this));
    this.ctx.stroke();
  },

  _onMouseDown: function(event) {
    var position = this._mousePosition(event);
    this.mouseDown = true;
    this.points.push(position);
  },

  _onMouseMove: function(event) {
    if (this.mouseDown) {
      var position = this._mousePosition(event);
      this.points.push(position);
      this._redraw();
    }
  },

  _onMouseUp: function(event) {
    this.points = [];
    this.mouseDown = false;
  }

})

module.exports = Canvas;
