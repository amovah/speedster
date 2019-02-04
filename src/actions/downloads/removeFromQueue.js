import db from 'Root/db';
import store from 'Root/store';
import update from './update';

export default async (id) => {
  const validate = store.getState().downloads.find(i => i.id === id);
  if (validate.downloadStatus === 'completed') {
    return;
  }

  update(id, {
    queue: false,
  });

  const download = store.getState().downloads.find(i => i.id === id);
  db.get('downloads')
    .find({ id })
    .assign(download)
    .write();
};
