import store from 'Root/store';
import pauseDownload from 'Root/actions/downloads/pause/single';

export default () => {
  const downloads = store.getState().downloads.filter(
    i => i.downloadStatus === 'downloading'
    && i.queue,
  );

  for (const download of downloads) {
    pauseDownload(download.id);
  }
};
