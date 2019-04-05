import { createStore } from 'redux';
import { remote } from 'electron';
import reducers from './reducers';

let store = createStore( // eslint-disable-line
  reducers,
);

if (process.type === 'renderer') {
  store = remote.getGlobal('store');
}

if (process.env.NODE_ENV === 'development') {
  global.store = store;
}

export default store;
