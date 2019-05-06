import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';

export default async (id) => {
  await fetch({
    method: 'aria2.remove',
    params: [
      store.getState().downloads.find(i => i.id === id).gid,
    ],
  });

  store.dispatch({
    type: types.downloads.REMOVE,
    id,
  });

  await sync();
};
