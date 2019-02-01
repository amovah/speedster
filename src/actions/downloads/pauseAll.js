import store from 'Root/store';
import pause from './pause';

export default () => {
  const downloads = store.getState().downloads.filter(i => i.downloadStatus === 'downloading');

  for (const download of downloads) {
    pause(download.id);
  }
};
