import { combineReducers } from 'redux';
import config from './config';
import downloads from './downloads';

export default combineReducers({
  config,
  downloads,
});
