import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import db from 'Root/db';
import update from './update';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  if (download.downloadStatus === 'suspend') {
    const downloadId = await fetch({
      method: 'aria2.addUri',
      params: [
        [
          download.url,
        ],
        {
          dir: download.outputDir,
          'max-connection-per-server': '16',
          continue: 'true',
          'max-download-limit': download.maxSpeed,
        },
      ],
    });

    update(id, {
      gid: downloadId.data.result,
      downloadStatus: 'downloading',
    });
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
