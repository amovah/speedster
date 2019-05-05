import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import store from 'Root/store';
import pause from './pause';

export default async (id) => {
  pause(id);

  await fetch({
    method: 'aria2.pause',
    params: [
      store.getState().downloads.find(i => i.id === id).gid,
    ],
  });

  await sync();
};
