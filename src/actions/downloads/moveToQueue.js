import db from 'Root/db';
import store from 'Root/store';
import update from './update';

export default async (id) => {
  update(id, {
    queue: true,
  });

  const download = store.getState().downloads.find(i => i.id === id);
  db.get('downloads')
    .find({ id })
    .assign(download)
    .write();
};
