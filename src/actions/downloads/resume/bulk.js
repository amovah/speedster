import store from 'Root/store';
import { sync } from 'Root/db';
import fetch from 'Root/helpers/fetch';
import reAdd from '../add/reAdd';
import bulkUpdate from '../update/bulk';

export default async (ids) => {
  const allDownloads = store.getState()
    .downloads
    .filter(i => ids.includes(i.id) && ['suspend', 'pause'].includes(i.downloadStatus));

  const suspends = allDownloads.filter(i => i.downloadStatus === 'suspend');
  const actions = [];
  for (const suspend of suspends) {
    actions.push(reAdd(suspend.id));
  }

  const pauses = allDownloads.filter(i => i.downloadStatus === 'pause');
  for (const pause of pauses) {
    actions.push(fetch({
      method: 'aria2.unpause',
      params: [
        pause.gid,
      ],
    }));
  }

  await Promise.all(actions);

  bulkUpdate(
    allDownloads.map(i => i.id),
    {
      downloadStatus: 'downloading',
    },
  );

  await sync();
};
