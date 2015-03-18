var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var CHANGE_EVENT = AppConstants.CHANGE_EVENT;
var ActionTypes = AppConstants.ActionTypes;
var ToolTypes = AppConstants.ToolTypes;
var Tools = AppConstants.Tools;
var SocketActionTypes = AppConstants.SocketActionTypes;
var Socket = require('../utils/socket');

var _actions = [];
var _remotes = {};
var _mouseDown = false;
var _localActionId;
var _tool = Tools.PENCIL;

function getLastActionId() {
  return _actions.length - 1;
}

function newAction(tool, point) {
  _actions.push({
    tool: tool,
    points: [point]
  });
}

function pushPointToAction(actionId, point) {
  _actions[actionId].points.push(point);
}

function updateLocalAction() {
  _localActionId = getLastActionId()
}

function updateRemotesAction(remoteId) {
  _remotes[remoteId] = getLastActionId();
}


var CanvasStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllActions: function() {
    return _actions;
  },

  getLeftButtonState: function() {
    return _mouseDown;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListene: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchIndex: AppDispatcher.register(function(action) {
    switch (action.type) {

      case ActionTypes.BEGIN_DRAWING:
        _mouseDown = true;
        newAction(_tool, {x: action.x, y: action.y});
        updateLocalAction();
        Socket.beginDrawing({options:{ tool: _tool}, coordinates:{ x: action.x, y: action.y }});
        CanvasStore.emitChange();
      break;

      case ActionTypes.MOVE_CURSOR:
        if (CanvasStore.getLeftButtonState()) {
          pushPointToAction(_localActionId, {x: action.x, y: action.y});
          Socket.moveCursor({coordinates: {x: action.x, y: action.y}});
          CanvasStore.emitChange();
        }
      break;

      case ActionTypes.END_DRAWING:
        _mouseDown = false;
        Socket.endDrawing();
        CanvasStore.emitChange();
      break;

      case ActionTypes.CHANGE_TOOL:
        console.log(action.tool);
        switch (action.tool){
          case ToolTypes.PENCIL:
            _tool = Tools.PENCIL;
          break;
          case ToolTypes.ERASER:
            _tool = Tools.ERASER;
          break;
          default:
        }
      break;

      case SocketActionTypes.REMOTE_BEGIN_DRAWING:
        var message = action.message;
        var data = message.data;
        newAction(data.options.tool, data.coordinates);
        updateRemotesAction(message.from);
        CanvasStore.emitChange();
      break;

      case SocketActionTypes.REMOTE_MOVE_CURSOR:
        var message = action.message;
        var data = message.data;
        var remotesActionId = _remotes[message.from];
        if (typeof remotesActionId !== "undefined") {
          pushPointToAction(remotesActionId, data.coordinates);
          CanvasStore.emitChange();
        }
      break;

      case SocketActionTypes.REMOTE_END_DRAWING:
        var message = action.message;
        delete _remotes[message.from];
      break;

      default:
    }
  })

})
module.exports = CanvasStore;
