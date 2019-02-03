import store from 'Root/store';
import resumeDownload from 'Root/actions/downloads/resume';

export default () => {
  if (store.getState().queue.isDownloading) {
    const downloads = store.getState().downloads;

    if (!downloads.find(
      i => i.downloadStatus === 'downloading'
      && i.queue,
    )) {
      const toResume = store.getState().downloads.find(
        i => ['suspend', 'pause'].includes(i.downloadStatus)
        && i.queue,
      );

      if (toResume) {
        resumeDownload(toResume.id);
      }
    }
  }
};
