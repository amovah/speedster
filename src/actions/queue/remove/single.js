import types from 'Root/actions';
import store from 'Root/store';
import { sync } from 'Root/db';

export default async (id) => {
  store.dispatch({
    type: types.queue.REMOVE,
    id,
  });

  await sync();
};
