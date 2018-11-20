import 'babel-polyfill';
import { render } from 'react-dom';

import DownloadWindow from 'Root/DownloadWindow';

render(
  DownloadWindow,
  global.document.getElementById('root'),
);
