import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import store from 'Root/store';
import update from '../update/single';

export default async (id) => {
  await fetch({
    method: 'aria2.pause',
    params: [
      store.getState().downloads.find(i => i.id === id).gid,
    ],
  });

  update(id, {
    downloadStatus: 'pause',
  });

  await sync();
};
