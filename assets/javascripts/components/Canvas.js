var React = require('react');
var _ = require('lodash');
var CanvasStore = require('../stores/CanvasStore');
var CanvasActions = require('../actions/CanvasActions');


function getStateFromStore() {
  return {
    actions: CanvasStore.getAllActions(),
    mouseDown: CanvasStore.getLeftButtonState()
  };
}

var Canvas = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    this.canvas = this.getDOMNode().firstChild;
    this.ctx = this.canvas.getContext("2d");
    this._onResize();
    CanvasStore.addChangeListener(this._onChange);
    window.addEventListener('resize', this._onResize);
  },

  componentWillUnmount: function() {
    CanvasStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', this._onResize);
  },

  render: function() {
    if (typeof this.canvas !== "undefined") {
      this.canvas.width = this.state.width;
      this.canvas.height = this.state.height;
    }

    if (this.state.actions.length > 0) {
      var actions = this.state.actions;
      var ctx = this.ctx;
      _.each(actions, function (action) {
          var points = action.points;

          ctx.beginPath();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = 5;
          ctx.strokeStyle = action.tool.color;
          ctx.fillStyle = action.tool.color;
          ctx.moveTo(points[0].x, points[0].y);
          ctx.fillRect(points[0].x-5, points[0].y-5, 5, 5);
          _.each(points, function(point) {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();
      });
    }

    return (
      <div className="canvas">
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
      </div>
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
  },

  _onResize: function () {
    var canvasStyle = window.getComputedStyle(this.canvas, null);
    this.setState({
      width: canvasStyle.width.replace('px',''),
      height: canvasStyle.height.replace('px','')
    });
  }

})

module.exports = Canvas;
