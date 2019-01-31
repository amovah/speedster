import types from 'Root/actions';
import uid from 'uuid/v4';
import db from 'Root/db';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import changePage from 'Root/helpers/changePage';
import getDetails from 'Root/helpers/getDetails';

export default async (downloadInfo) => {
  const download = {
    id: uid(),
    downloadStatus: 'downloading',
    name: downloadInfo.name,
    outputDir: downloadInfo.outputDir,
  };

  const downloadId = await fetch({
    method: 'aria2.addUri',
    params: [
      [
        downloadInfo.url,
      ],
      {
        dir: downloadInfo.outputDir,
        'max-connection-per-server': '16',
        continue: 'true',
        'max-download-limit': downloadInfo.maxSpeed,
      },
    ],
  });

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

  return true;
};
