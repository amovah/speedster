import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import db from 'Root/db';
import loadSetting from 'Root/actions/setting/load';
import loadDownloads from 'Root/actions/downloads/load';
import startAria2 from './helpers/startAria2';
import Speedster from './Speedster';

(async () => {
  render(
    <Speedster />,
    global.document.getElementById('root'),
  );

  try {
    await startAria2();

    loadSetting(db.get('setting').value());
    loadDownloads(db.get('downloads').value());
  } catch (e) {
    console.log('errormide,', e);
  }
})();
