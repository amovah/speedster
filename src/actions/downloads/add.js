import types from 'Root/actions';
import uid from 'uuid/v4';
import {
  message,
} from 'antd';
import db from 'Root/db';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import changePage from 'Root/helpers/changePage';

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
        continue: 'true',
        'max-download-limit': process.env.NODE_ENV === 'development' ? '20KB' : null,
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

  if (res.data.error) {
    message.error('Bad URL');
    return;
  }

  const toSave = { ...download, ...res.data.result };

  db.get('downloads').push(toSave).write();

  store.dispatch({
    type: types.downloads.ADD,
    download: toSave,
  });

  changePage(`/download/${download.id}`);
};
