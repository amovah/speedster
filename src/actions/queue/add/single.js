import store from 'Root/store';
import types from 'Root/actions';
import { sync } from 'Root/db';
import resume from '../resume';

export default async (id) => {
  store.dispatch({
    type: types.queue.ADD,
    id,
  });

  await sync();

  resume();
};
