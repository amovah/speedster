import store from 'Root/store';
import resume from './resume';

export default () => {
  const downloads = store.getState().downloads.filter(i => ['pause', 'suspend'].includes(i.downloadStatus));
  for (const download of downloads) {
    resume(download.id);
  }
};
