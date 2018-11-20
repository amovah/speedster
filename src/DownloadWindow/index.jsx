import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import store from 'Root/store';
import history from 'Root/history';
import Components from './components';
import theme from './theme';

const Speedster = () => (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseLine />
        <Components />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default <Speedster />;
