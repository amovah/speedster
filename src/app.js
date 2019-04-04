import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import history from 'Root/history';
import categories from 'Root/categories';
import startQueue from 'Root/actions/queue/start';
import stopQueue from 'Root/actions/queue/stop';
import changeQueue from 'Root/actions/queue/change';
import statusUpdater from './helpers/statusUpdater';
import Speedster from './Speedster';
import Init from './components/Init';

render(
  <Init />,
  global.document.getElementById('root'),
);

(async () => {
  try {
  //   changeQueue({
  //     isDownloading: false,
  //   });
  //   if (queue.status) {
  //     stopQueue();
  //     startQueue();
  //   }
  //
  //   statusUpdater();
  } catch (e) {
    history.push('/failed');
    return;
  }
  //
  // render(
  //   <Speedster />,
  //   global.document.getElementById('root'),
  // );

  if (process.env.NODE_ENV !== 'development') {
    history.push('/all');
  }
})();
