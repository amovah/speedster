import store from 'Root/store';
import moment from 'moment';
import change from './change';

let startTimeout;

const startJob = () => {
  const time = moment(store.getState().queue.startTime, 'hh:mm:ss');
  const now = moment();

  let diff = (time.hour() * 60 * 60 * 1000 + time.minute() * 60 * 1000 + time.second() * 1000)
  - (now.hour() * 60 * 60 * 1000 + now.minute() * 60 * 1000 + now.second() * 1000);

  if (diff < 0) {
    diff = diff + 24 * 60 * 60 * 1000;
  }

  console.log(diff);

  startTimeout = setTimeout(() => {
    console.log('started');
  }, diff);
};

export const start = () => {
  const queue = store.getState().queue;
  if (!queue.status) {
    change({
      status: true,
    });
    startJob();
  }
};

export const stop = () => {
  clearTimeout(startTimeout);
  change({
    status: false,
  });
};
