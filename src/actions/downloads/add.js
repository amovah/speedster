import uid from 'uuid/v4';
import {
  message,
} from 'antd';
import types from 'Root/actions';
import db from 'Root/db';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import changePage from 'Root/helpers/changePage';
import getDetails from 'Root/helpers/getDetails';

export default async (downloadInfo) => {
  const download = {
    id: uid(),
    downloadStatus: 'downloading',
    ...downloadInfo,
  };

  const downloadId = await fetch({
    method: 'aria2.addUri',
    params: [
      [
        downloadInfo.url,
      ],
      {
        dir: downloadInfo.outputDir,
        'max-connection-per-server': downloadInfo.maxConnection || '16',
        continue: 'true',
        'max-download-limit': downloadInfo.maxSpeed,
      },
    ],
  });

  if (downloadId.data.error) {
    message.error('Cannot download the file.');
    return;
  }

  download.gid = downloadId.data.result;

  const details = await getDetails(download.gid);
  const toSave = {
    ...download,
    ...details,
  };

  store.dispatch({
    type: types.downloads.ADD,
    download: toSave,
  });

  db.get('downloads').push(toSave).write();

  changePage(`/download/${download.id}`);
};
