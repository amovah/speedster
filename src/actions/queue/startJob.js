import store from 'Root/store';
import moment from 'moment';
import change from './change';

let startTimeout;

const startJob = () => {
  const time = moment(store.getState().queue.startTime, 'hh:mm:ss');
  console.log(time);

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
};
