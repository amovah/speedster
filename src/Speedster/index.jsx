import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'antd/dist/antd.less';

import store from 'Root/store';
import Components from 'Root/components';
import history from 'Root/history';

const Speedster = () => (
  <Provider store={store}>
    <Router history={history}>
      <Components />
    </Router>
  </Provider>
);

export default <Speedster />;
