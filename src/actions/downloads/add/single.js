import uid from 'uuid/v4';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import addDownload from './add';

export default async (values) => {
  const download = {
    id: uid(),
    downloadStatus: 'downloading',
    ...values,
  };

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
    return null;
  }

  download.gid = downloadId.result;

  addDownload(download);

  await sync();

  return download.id;
};
