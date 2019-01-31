import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import db from 'Root/db';
import readd from './readd';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  if (download.downloadStatus === 'suspend') {
    readd(id);
  } else {
    await fetch({
      method: 'aria2.unpause',
      params: [
        download.gid,
      ],
    });

    store.dispatch({
      type: types.downloads.RESUME,
      id,
    });
  }

  const toSave = store.getState().downloads.find(i => i.id === id);
  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
