import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { load as loadDB } from 'Root/db';
import history from 'Root/history';
import categories from 'Root/categories';
import startQueue from 'Root/actions/queue/start';
import stopQueue from 'Root/actions/queue/stop';
import changeQueue from 'Root/actions/queue/change';
import startAria2 from './helpers/startAria2';
import statusUpdater from './helpers/statusUpdater';
import Speedster from './Speedster';
import Init from './components/Init';

render(
  <Init />,
  global.document.getElementById('root'),
);

(async () => {
  try {
    // await startAria2();
    await loadDB();

  //   const setting = db.get('setting').value();
  //   const ensures = [];
  //   for (const category of categories) {
  //     ensures.push(ensureDir(resolve(setting.downloaddir, category.name)));
  //   }
  //   await Promise.all(ensures);
  //
  //   loadSetting(setting);
  //   loadDownloads(db.get('downloads').value());
  //   const queue = db.get('queue').value();
  //   loadQueue(queue);
  //
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
