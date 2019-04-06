import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);
  if (download.downloadStatus === 'completed') {
    return;
  }

  await fetch({
    method: 'aria2.pause',
    params: [
      download.gid,
    ],
  });

  store.dispatch({
    type: types.downloads.PAUSE,
    id,
  });

  await sync();
};
