import { combineReducers } from 'redux';
import setting from './setting';
import downloads from './downloads';

export default combineReducers({
  setting,
  downloads,
});
