import store from 'Root/store';
import { sync } from 'Root/db';
import fetch from 'Root/helpers/fetch';
import bulkUpdate from '../update/bulk';

export default async () => {
  await fetch({
    method: 'aria2.pauseAll',
  });

  bulkUpdate(
    store.getState().downloads.filter(i => i.downloadStatus === 'downloading').map(i => i.id),
    {
      downloadStatus: 'pause',
    },
  );

  await sync();
};
