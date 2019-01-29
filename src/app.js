import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import startAria2 from './helpers/startAria2';
import Speedster from './Speedster';

(async () => {
  render(
    <Speedster />,
    global.document.getElementById('root'),
  );

  try {
    await startAria2();
  } catch (e) {
    console.log('errormide,', e);
  }
})();
