import types from 'Root/actions';
import store from 'Root/store';
import { sync } from 'Root/db';
import fetch from 'Root/helpers/fetch';

export default async () => {
  store.dispatch({
    type: types.downloads.PAUSE_ALL,
  });

  await fetch({
    method: 'aria2.pauseAll',
  });

  await sync();
};
