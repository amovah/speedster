import uid from 'uuid/v4';
import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';

export default async () => {
  const { data, ...rest } = store.getState().form.addUrl.values;
  const download = {
    id: uid(),
    downloadStatus: 'downloading',
    ...data,
    ...rest,
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

  store.dispatch({
    type: types.downloads.ADD,
    download,
  });

  await sync();

  return download.id;
};
