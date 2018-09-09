import { combineReducers } from 'redux';

export default combineReducers({
  strings: (state = {}, action) => ((action && action.type === 'strings') ? action.payload : state)
});