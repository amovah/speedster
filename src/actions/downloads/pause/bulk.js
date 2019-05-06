import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import store from 'Root/store';
import bulkPause from './bulkPause';

export default async (ids) => {
  const downloads = store.getState().downloads.filter(i => ids.includes(i.id));
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

  bulkPause(ids);

  await sync();
};
