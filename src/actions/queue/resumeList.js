import change from './change';
import resume from './resume';

export default () => {
  change({
    isDownloading: true,
  });

  resume();
};
