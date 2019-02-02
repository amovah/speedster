import uid from 'uuid/v4';
import types from 'Root/actions';
import db from 'Root/db';
import store from 'Root/store';
import changePage from 'Root/helpers/changePage';

export default async (downloadInfo, details) => {
  const download = {
    id: uid(),
    downloadStatus: 'suspend',
    ...downloadInfo,
    ...details,
    completedLength: '0',
  };

  store.dispatch({
    type: types.downloads.ADD,
    download,
  });

  db.get('downloads').push(download).write();

  changePage(`/download/${download.id}`);
};
