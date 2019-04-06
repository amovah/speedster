import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';

export default async (id, allowToSync = true) => {
  const download = store.getState().downloads.find(i => i.id === id);

  await fetch({
    method: 'aria2.remove',
    params: [
      download.gid,
    ],
  });

  store.dispatch({
    type: types.downloads.REMOVE,
    id,
  });

  if (allowToSync) {
    await sync();
  }
};
