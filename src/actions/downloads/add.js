import types from 'Root/actions';
import db from 'Root/db';
import uid from 'uuid/v4';
import vars from 'Root/vars';
import store from 'Root/store';

export default (downloadInfo) => {
  const download = {
    ...downloadInfo,
    id: uid(),
    status: vars.PAUSE,
  };

  db.get('downloads').push(download).write();

  store.dispatch({
    type: types.downloads.ADD,
    download,
  });

  return download.id;
};
