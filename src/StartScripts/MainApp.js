import 'babel-polyfill';
import { render } from 'react-dom';

import MainApp from 'Root/MainApp';
import startAria2 from 'Root/helpers/startAria2';
import history from 'Root/history';

history.push('/initializing');

render(
  MainApp,
  global.document.getElementById('root'),
);

(async () => {
  try {
    await startAria2();
    history.push('/');
  } catch (e) {
    console.log(e);
    history.push('/failed');
  }
})();
