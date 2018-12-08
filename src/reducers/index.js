import { combineReducers } from 'redux';
import reducer from './reducer';

export default combineReducers({
  player: reducer('player'),
  playerAchievements: reducer('playerAchievements'),
  playerQuests: reducer('playerQuests'),
  guild: reducer('guild'),
  strings: (state = {}, action) => ((action && action.type === 'strings') ? action.payload : state),
});
