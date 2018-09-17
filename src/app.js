import 'babel-polyfill';
import { render } from 'react-dom';

import history from './history';
import Speedster from './Speedster';
import startAria2 from './helpers/startAria2';

history.push('/initializing');

render(
  Speedster,
  global.document.getElementById('root'),
);

(async () => {
  try {
    await startAria2();
    history.push('/');
  } catch (e) {
    history.push('/failed');
  }
})();
