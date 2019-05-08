import store from 'Root/store';
import bulkPause from 'Root/actions/downloads/pause/bulk';

export default async () => {
  const downloads = store.getState().downloads.filter(
    i => i.downloadStatus === 'downloading'
    && i.queue,
  );

  await bulkPause(downloads.map(i => i.id));
};
