import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import reAdd from '../add/reAdd';
import update from '../update/single';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  if (download.downloadStatus === 'suspend' || download.downloadStatus === 'failed') {
    reAdd(id);
  } else {
    await fetch({
      method: 'aria2.unpause',
      params: [
        download.gid,
      ],
    });

    update(
      id,
      {
        downloadStatus: 'downloading',
      },
    );
  }

  await sync();
};
