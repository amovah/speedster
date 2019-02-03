import store from 'Root/store';
import moment from 'moment';
import change from './change';

let stopTimeout;

const stopJob = () => {
  // const time = moment(store.getState().queue.startTime, 'hh:mm:ss');
  // const now = moment();
  //
  // console.log(now.diff(time));

  stopTimeout = setTimeout(() => {
    console.log('stoped');
  }, 5000);
};

export const start = () => {
  const queue = store.getState().queue;
  if (!queue.status) {
    change({
      status: true,
    });
    stopJob();
  }
};

export const stop = () => {
  clearTimeout(stopTimeout);
};
