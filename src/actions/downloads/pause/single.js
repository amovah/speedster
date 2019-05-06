import types from 'Root/actions';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import store from 'Root/store';

export default async (id) => {
  await fetch({
    method: 'aria2.pause',
    params: [
      store.getState().downloads.find(i => i.id === id).gid,
    ],
  });

  store.dispatch({
    type: types.downloads.PAUSE,
    id,
  });

  await sync();
};
