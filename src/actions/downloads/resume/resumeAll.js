import types from 'Root/actions';
import store from 'Root/store';
import { sync } from 'Root/db';
import fetch from 'Root/helpers/fetch';
import reAdd from '../reAdd';

export default async () => {
  const downloads = store.getState().downloads.filter(i => i.downloadStatus === 'suspend');
  const actions = [];
  for (const download of downloads) {
    actions.push(reAdd(download.id));
  }
  await Promise.all(actions);

  await fetch({
    method: 'aria2.unpauseAll',
  });

  store.dispatch({
    type: types.downloads.RESUME_ALL,
  });

  await sync();
};
