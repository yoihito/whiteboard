var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').SocketActionTypes;

var RemoteActions = {
  remoteBeginDrawing: function(message) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOTE_BEGIN_DRAWING,
      data: message
    });
  },

  remoteMoveCursor: function(message) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOTE_MOVE_CURSOR,
      data: message
    });
  },

  remoteEndDrawing: function(message) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOTE_END_DRAWING,
      data: message
    });
  }
};

module.exports = RemoteActions;
