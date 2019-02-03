import store from 'Root/store';
import moment from 'moment';
import change from './change';

let startTimeout;

const startJob = () => {
  const time = moment(store.getState().queue.startTime, 'hh:mm:ss');
  const now = moment();

  console.log(now.diff(time));

  startTimeout = setTimeout(() => {
    console.log('started');
  }, 3000);
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
