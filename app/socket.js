var async = require('async');
var Promise = require('es6-promise').Promise;
var keyMirror = require('react/lib/keyMirror');
var io = require('socket.io');
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


function socketEvent(socket, e, callback) {
  if (Array.isArray(e)) {
    e.forEach(function(es) {
      socket.on(es, function(message) {
        callback(es, message);
      });
    });
  } else {
    socket.on(e, function(message) {
      callback(e, message);
    });
  }
}

var SockServer = function(server) {
  websockServer = io(server);
  websockServer.on('connection', function (socket) {
    _sockets.push(socket);
    socketEvent(socket,[
      SocketActionTypes.REMOTE_BEGIN_DRAWING,
      SocketActionTypes.REMOTE_MOVE_CURSOR,
      SocketActionTypes.REMOTE_END_DRAWING
    ], function (e, message) {
      async.each(_sockets,
        emitAction(
          socket,
          e,
          {from: socket.id, point: message}
        )
      );
    });

  });
};

module.exports = SockServer;
