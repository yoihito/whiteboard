var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;
var Socket = require('../utils/socket');

var CanvasActions = {
  beginDrawing: function(coordinates) {
    AppDispatcher.dispatch({
      type: ActionTypes.BEGIN_DRAWING,
      x: coordinates.x,
      y: coordinates.y
    });
    Socket.beginDrawing({x: coordinates.x, y: coordinates.y});

  },

  moveCursor: function(coordinates) {
    AppDispatcher.dispatch({
      type: ActionTypes.MOVE_CURSOR,
      x: coordinates.x,
      y: coordinates.y
    });
    Socket.moveCursor({x: coordinates.x, y: coordinates.y});
  },

  endDrawing: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.END_DRAWING
    });
    Socket.endDrawing();
  }

};
module.exports = CanvasActions;
