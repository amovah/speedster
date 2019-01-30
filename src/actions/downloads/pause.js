import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import db from 'Root/db';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

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

  const toSave = store.getState().downloads.find(i => i.id === id);
  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
