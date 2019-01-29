import { createStore } from 'redux';

import reducers from './reducers';

const store = createStore(
  reducers,
);

if (process.env.NODE_ENV === 'development') {
  global.store = store;
}

export default store;
