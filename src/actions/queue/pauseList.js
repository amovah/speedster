import change from './change';
import pause from './pause';

export default () => {
  change({
    isDownloading: false,
  });

  pause();
};
