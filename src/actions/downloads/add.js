import types from 'Root/actions';
import db from 'Root/db';
import uid from 'uuid/v4';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';

export default async (downloadInfo) => {
  const setting = store.getState().setting;
  const download = {
    ...downloadInfo,
    id: uid(),
    downloadStatus: 'downloading',
  };

  const downloadId = await fetch({
    method: 'aria2.addUri',
    params: [
      [
        downloadInfo.url,
      ],
      {
        dir: setting.downloaddir,
        'max-connection-per-server': '16',
      },
    ],
  });

  download.gid = downloadId.data.result;

  const res = await fetch({
    method: 'aria2.tellStatus',
    params: [
      download.gid,
    ],
  });

  console.log({ ...download, ...res.data.result });

  // db.get('downloads').push(download).write();

  store.dispatch({
    type: types.downloads.ADD,
    download,
  });
};
