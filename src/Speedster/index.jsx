import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';

import store from 'Root/store';
import Components from 'Root/components';
import theme from './theme';

const Speedster = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      <Components />
    </MuiThemeProvider>
  </Provider>
);

export default <Speedster />;
