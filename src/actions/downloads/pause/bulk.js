import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import store from 'Root/store';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  const downloads = store.getState().downloads.filter(i => ids.includes(i.id) && i.downloadStatus === 'downloading');
  const actions = [];
  for (const download of downloads) {
    actions.push(fetch({
      method: 'aria2.pause',
      params: [
        download.gid,
      ],
    }));
  }
  await Promise.all(actions);

  bulkUpdate(
    ids,
    {
      downloadStatus: 'pause',
    },
  );

  await sync();
};
