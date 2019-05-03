import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import history from 'Root/history';
import Speedster from './Speedster';

(async () => {
  // try {
  //   changeQueue({
  //     isDownloading: false,
  //   });
  //   if (queue.status) {
  //     stopQueue();
  //     startQueue();
  //   }
  //
  //   statusUpdater();
  // } catch (e) {
  //   history.push('/failed');
  //   return;
  // }
  render(
    <Speedster />,
    global.document.getElementById('root'),
  );

  if (process.env.NODE_ENV !== 'development') {
    history.push('/all');
  }
})();
