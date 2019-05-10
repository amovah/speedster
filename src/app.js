import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import history from 'Root/history';
import Speedster from './Speedster';
import './sockets';

(async () => {
  render(
    <Speedster />,
    global.document.getElementById('root'),
  );

  if (process.env.NODE_ENV !== 'development') {
    history.push('/downloads/all');
  }
})();
