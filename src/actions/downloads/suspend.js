import types from 'Root/actions';
import store from 'Root/store';
import { sync } from 'Root/db';
// import pause from './pause';

export default async (id, allowToSync = true) => {
  // await pause(id);

  store.dispatch({
    type: types.downloads.SUSPEND,
    id,
  });

  if (allowToSync) {
    await sync();
  }
};
