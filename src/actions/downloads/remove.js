import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import db from 'Root/db';
import changePage from 'Root/helpers/changePage';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  await fetch({
    method: 'aria2.remove',
    params: [
      download.gid,
    ],
  });

  changePage('/all');

  store.dispatch({
    type: types.downloads.REMOVE,
    id,
  });

  db.get('downloads')
    .remove({ id })
    .write();
};
