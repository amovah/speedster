import types from 'Root/actions';
import store from 'Root/store';
import db from 'Root/db';

export default (toChange) => {
  store.dispatch({
    type: types.queue.CHANGE,
    toChange,
  });

  const queue = store.getState().queue;

  db.get('queue')
    .assign(queue)
    .write();
};
