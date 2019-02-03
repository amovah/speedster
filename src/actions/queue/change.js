import types from 'Root/actions';
import store from 'Root/store';
import db from 'Root/db';

export default (toChange) => {
  store.dispatch({
    type: types.queue.CHANGE,
    toChange,
  });

  db.get('queue')
    .assign(toChange)
    .write();
};
