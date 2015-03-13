var socket = io.connect();
var SocketActionTypes = require('../constants/AppConstants').SocketActionTypes;
var RemoteActions = require('../actions/RemoteActions');

socket.on(SocketActionTypes.REMOTE_BEGIN_DRAWING, function (message) {
  RemoteActions.remoteBeginDrawing(message);
});

socket.on(SocketActionTypes.REMOTE_MOVE_CURSOR, function (message) {
  RemoteActions.remoteMoveCursor(message);
});

socket.on(SocketActionTypes.REMOTE_END_DRAWING, function (message) {
  RemoteActions.remoteEndDrawing(message);
});

module.exports = {
  beginDrawing: function (point) {
    socket.emit(SocketActionTypes.REMOTE_BEGIN_DRAWING, point);
  },

  moveCursor: function (point) {
    socket.emit(SocketActionTypes.REMOTE_MOVE_CURSOR, point);
  },

  endDrawing: function () {
    socket.emit(SocketActionTypes.REMOTE_END_DRAWING);
  }


};
