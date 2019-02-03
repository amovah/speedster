import store from 'Root/store';
import start from './start';
import stop from './stop';
import change from './change';

export default (toChange) => {
  change(toChange);

  if (store.getState().queue.status) {
    stop();
    start();
  }
};
