var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var CHANGE_EVENT = AppConstants.CHANGE_EVENT;
var ActionTypes = AppConstants.ActionTypes;
var SocketActionTypes = AppConstants.SocketActionTypes;

var _actions = [];
var _remotes = {};
var _mouseDown = false;

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

  push: function(action) {
    _actions.push(action);
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
        _actions.push({
          points: [{x: action.x, y: action.y}]
        });
        CanvasStore.emitChange();
      break;

      case ActionTypes.MOVE_CURSOR:
        if (_mouseDown) {
          _actions[_actions.length - 1].points.push({x: action.x, y: action.y});
          CanvasStore.emitChange();
        }
      break;

      case ActionTypes.END_DRAWING:
        _mouseDown = false;
        CanvasStore.emitChange();
      break;

      case SocketActionTypes.REMOTE_BEGIN_DRAWING:
        console.log(action);
        var message = action.data;
        _actions.push({
          points: [{x: message.data.x, y: message.data.y}]
        });
        _remotes[message.from] = _actions.length - 1;
        CanvasStore.emitChange();
      break;

      case SocketActionTypes.REMOTE_MOVE_CURSOR:
        var message = action.data;
        var actionId = _remotes[message.from];
        if (actionId) {
          _actions[actionId].points.push({x: message.data.x, y: message.data.y});
          CanvasStore.emitChange();
        }
      break;

      case SocketActionTypes.REMOTE_END_DRAWING:
        var message = action.data;
        delete _remotes[message.from];
      break;

      default:
    }
  })

})
module.exports = CanvasStore;
