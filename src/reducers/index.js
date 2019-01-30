import { combineReducers } from 'redux';
import setting from './setting';
import downloads from './downloads';
import activeMenu from './activeMenu';

export default combineReducers({
  setting,
  downloads,
  activeMenu,
});
