import store from 'Root/store';
import types from 'Root/actions';
import { sync } from 'Root/db';
import resume from '../resume';

export default async (ids) => {
  store.dispatch({
    type: types.queue.BULK_ADD,
    ids,
  });

  await sync();

  resume();
};
