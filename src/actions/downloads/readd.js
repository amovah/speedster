import {
  message,
} from 'antd';
import db from 'Root/db';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import getDetails from 'Root/helpers/getDetails';
import update from './update';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

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

  if (downloadId.data.error) {
    message.error('Cannot download the file.');
    return;
  }

  download.gid = downloadId.data.result;

  const details = await getDetails(download.gid);
  const toSave = {
    ...download,
    ...details,
    downloadStatus: 'downloading',
  };

  update(
    id,
    toSave,
  );

  db.get('downloads')
    .find({ id })
    .assign(toSave)
    .write();
};
