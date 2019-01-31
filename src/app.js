import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import db from 'Root/db';
import loadSetting from 'Root/actions/setting/load';
import loadDownloads from 'Root/actions/downloads/load';
import history from 'Root/history';
import startAria2 from './helpers/startAria2';
import statusUpdater from './helpers/statusUpdater';
import Speedster from './Speedster';

(async () => {
  try {
    await startAria2();

    const categories = db.get('categories').value();
    const setting = db.get('setting').value();
    const ensures = [];
    for (const category of categories) {
      ensures.push(ensureDir(resolve(setting.downloaddir, category.name)));
    }
    await Promise.all(ensures);

    statusUpdater();

    loadSetting(setting);
    loadDownloads(db.get('downloads').value());
  } catch (e) {
    history.push('/failed');
    return;
  }

  render(
    <Speedster />,
    global.document.getElementById('root'),
  );

  if (process.env.NODE_ENV !== 'development') {
    history.push('/all');
  }
})();
