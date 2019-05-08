import { createStore } from 'redux';
import { remote } from 'electron';
import reducers from './reducers';

let store;

if (process.type === 'renderer') {
  store = remote.getGlobal('store');
} else {
  store = createStore( // eslint-disable-line
    reducers,
  );
}

if (process.env.NODE_ENV === 'development') {
  global.store = store;
  global.reduxForm = require('redux-form'); // eslint-disable-line
}

function wh() {
  return store;
}

export default wh();
