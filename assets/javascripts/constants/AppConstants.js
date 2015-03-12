var keyMirror = require('react/lib/keyMirror');

module.exports = {
  CHANGE_EVENT: 'change',
  ActionTypes: keyMirror({
    BEGIN_DRAWING: null,
    MOVE_CURSOR: null,
    END_DRAWING: null
  })
}
