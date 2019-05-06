import store from 'Root/store';
import types from 'Root/actions';
import { sync } from 'Root/db';
import resume from '../resume';

export default async (ids) => {
  const list = store.getState().queue.list;
  const goodToGo = ids.filter(i => !list.includes(i));

  store.dispatch({
    type: types.queue.BULK_ADD,
    ids: goodToGo,
  });

  await sync();

  resume();
};
