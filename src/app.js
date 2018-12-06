import 'babel-polyfill';
import { render } from 'react-dom';
import initRedux from 'Root/init-redux';

import Speedster from './Speedster';

initRedux();

render(
  Speedster,
  global.document.getElementById('root'),
);
