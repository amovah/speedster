import store from 'Root/store';
import db from 'Root/db';
import update from './update';

export default async (id) => {
  update(id, {
    downloadStatus: 'failed',
  });

  const toSave = store.getState().downloads.find(i => i.id === id);
  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
