import { createStore } from 'redux';
import { remote } from 'electron';
import reducers from './reducers';

let store; // eslint-disable-line

if (process.type === 'renderer') {
  store = remote.getGlobal('store');
} else {
  store = createStore( // eslint-disable-line
    reducers,
  );

  global.store = store;
}

if (process.env.NODE_ENV === 'development') {
  global.store = store;
}

export default store;
