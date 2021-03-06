import store from 'Root/store';
import { sync } from 'Root/db';
import fetch from 'Root/helpers/fetch';
import reAdd from '../add/reAdd';
import bulkUpdate from '../update/bulk';

export default async () => {
  const allDownloads = store.getState().downloads;

  const downloads = allDownloads.filter(i => i.downloadStatus === 'suspend');
  const actions = [];
  for (const download of downloads) {
    actions.push(reAdd(download.id));
  }
  await Promise.all(actions);

  await fetch({
    method: 'aria2.unpauseAll',
  });

  bulkUpdate(
    allDownloads.filter(i => i.downloadStatus === 'pause').map(i => i.id),
    {
      downloadStatus: 'downloading',
    },
  );

  await sync();
};
