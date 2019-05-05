import { sync } from 'Root/db';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import update from '../update';

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
        out: download.name,
        'max-connection-per-server': download.maxConnection || '16',
        split: download.maxConnection || '16',
        continue: 'true',
        'max-download-limit': download.maxSpeed,
      },
    ],
  });

  if (!downloadId) {
    return;
  }

  download.gid = downloadId.result;

  update(
    id,
    {
      ...download,
      downloadStatus: 'downloading',
    },
  );

  await sync();
};
