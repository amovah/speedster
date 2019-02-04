import types from 'Root/actions';
import store from 'Root/store';
import db from 'Root/db';
import pause from './pause';

export default async (id) => {
  await pause(id);

  store.dispatch({
    type: types.downloads.SUSPEND,
    id,
  });

  const toSave = store.getState().downloads.find(i => i.id === id);

  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
