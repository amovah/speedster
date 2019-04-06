import uid from 'uuid/v4';
import {
  message,
} from 'antd';
import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import getDetails from 'Root/helpers/getDetails';
import { sync } from 'Root/db';

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
        out: downloadInfo.name,
        'max-connection-per-server': downloadInfo.maxConnection || '16',
        split: downloadInfo.maxConnection || '16',
        continue: 'true',
        'max-download-limit': downloadInfo.maxSpeed,
      },
    ],
  });

  if (!downloadId) {
    message.error('Cannot download the file.');
    return;
  }

  download.gid = downloadId.result;

  const details = await getDetails(download.gid);
  if (!details) {
    message.error('Cannot download the file.');
    return;
  }

  const toSave = {
    ...download,
    ...details,
  };

  store.dispatch({
    type: types.downloads.ADD,
    download: toSave,
  });
};
