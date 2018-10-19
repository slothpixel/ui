import { combineReducers } from 'redux';
import reducer from './reducer';

export default combineReducers({
  player: reducer('player'),
  guild: reducer('guild'),
  strings: (state = {}, action) => ((action && action.type === 'strings') ? action.payload : state),
});
