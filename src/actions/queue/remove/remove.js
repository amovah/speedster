import types from 'Root/actions';
import store from 'Root/store';

export default async (id) => {
  store.dispatch({
    type: types.queue.REMOVE,
    id,
  });
};
