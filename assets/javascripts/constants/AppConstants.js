var keyMirror = require('react/lib/keyMirror');

module.exports = {
  CHANGE_EVENT: 'change',
  ActionTypes: keyMirror({
    BEGIN_DRAWING: null,
    MOVE_CURSOR: null,
    END_DRAWING: null,
    CHANGE_TOOL: null
  }),

  SocketActionTypes: keyMirror({
    REMOTE_BEGIN_DRAWING: null,
    REMOTE_MOVE_CURSOR: null,
    REMOTE_END_DRAWING: null
  }),

  ToolTypes: keyMirror({
    PENCIL: null,
    ERASER: null,
    COLOR_CHOOSER: null
  }),

  Tools: {
    PENCIL: {
      color: 'black'
    },

    ERASER: {
      color: 'white'
    }
  }

}
