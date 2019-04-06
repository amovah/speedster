import store from 'Root/store';
import { sync } from 'Root/db';
import pause from './pause';

export default async () => {
  const downloads = store.getState().downloads.filter(i => i.downloadStatus === 'downloading');

  const actions = [];
  for (const download of downloads) {
    actions.push(pause(download.id));
  }
  await Promise.all(actions);

  await sync();
};
