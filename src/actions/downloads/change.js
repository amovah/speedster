import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import update from './update/single';

export default async (id, details) => {
  const download = store.getState().downloads.find(i => i.id === id);
  if (download.downloadStatus === 'downloading' || download.downloadStatus === 'pause') {
    await fetch({
      method: 'aria2.changeOption',
      params: [
        download.gid,
        {
          'max-download-limit': details.maxSpeed,
        },
      ],
    });
  }

  update(id, details);

  await sync();
};
