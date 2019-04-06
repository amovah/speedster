import store from 'Root/store';
import types from 'Root/actions';
import { sync } from 'Root/db';

export default async (id) => {
  store.dispatch({
    type: types.downloads.COMPLETE,
    id,
  });

  await sync();
};
