import { remote } from 'electron';
import fetch from 'Root/helpers/fetch';
import store from 'Root/store';
import suspend from 'Root/actions/downloads/suspend';

export default async () => {
  const downloadings = store.getState().downloads
    .filter(i => ['downloading', 'pause'].includes(i.downloadStatus))
    .map(async (i) => { await suspend(i.id); });
  await Promise.all(downloadings);

  await fetch({
    method: 'aria2.shutdown',
  });

  remote.app.quit();
};
