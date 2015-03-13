var async = require('async');
var Promise = require('es6-promise').Promise;
var keyMirror = require('react/lib/keyMirror');
var SocketActionTypes = keyMirror({
    REMOTE_BEGIN_DRAWING: null,
    REMOTE_MOVE_CURSOR: null,
    REMOTE_END_DRAWING: null
  });

var _sockets = [];

function emitAction(socket, action, data) {
  return function (targetSocket) {
    if (socket.id !== targetSocket.id) {
      targetSocket.emit(action, data);
    }
  }
}

var SockServer = function(server) {
  io = require('socket.io')(server);
  io.on('connection', function (socket) {
    _sockets.push(socket);
    socket.on(SocketActionTypes.REMOTE_BEGIN_DRAWING, function (message) {
      async.each(_sockets,
        emitAction(
          socket,
          SocketActionTypes.REMOTE_BEGIN_DRAWING,
          {from: socket.id, point: message}
        )
      );
    });

    socket.on(SocketActionTypes.REMOTE_MOVE_CURSOR, function (message) {
      async.each(_sockets,
        emitAction(
          socket,
          SocketActionTypes.REMOTE_MOVE_CURSOR,
          {from: socket.id, point: message}
        )
      );
    });

    socket.on(SocketActionTypes.REMOTE_END_DRAWING, function (message) {
      async.each(_sockets,
        emitAction(
          socket,
          SocketActionTypes.REMOTE_END_DRAWING,
          {from: socket.id, point: message}
        )
      );
    });

  });
};

module.exports = SockServer;
