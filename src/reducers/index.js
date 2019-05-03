import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import setting from './setting';
import downloads from './downloads';
import activeMenu from './activeMenu';
import queue from './queue';

export default combineReducers({
  setting,
  downloads,
  activeMenu,
  queue,
  form: formReducer,
});
