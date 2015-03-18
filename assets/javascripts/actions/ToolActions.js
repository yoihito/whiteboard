var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var ToolActions = {
  changeTool: function(tool) {
    AppDispatcher.dispatch({
      type: ActionTypes.CHANGE_TOOL,
      tool: tool
    })
  }
};

module.exports = ToolActions;
