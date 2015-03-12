var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var CHANGE_EVENT = AppConstants.CHANGE_EVENT;
var ActionTypes = AppConstants.ActionTypes;

var _actions = [];
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
      default:
    }
  })

})
module.exports = CanvasStore;
