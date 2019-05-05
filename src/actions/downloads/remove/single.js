import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import remove from './remove';

export default async (id) => {
  await fetch({
    method: 'aria2.remove',
    params: [
      store.getState().downloads.find(i => i.id === id).gid,
    ],
  });

  remove(id);

  await sync();
};
