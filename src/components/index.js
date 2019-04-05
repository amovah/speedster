import React from 'react';
import { Route } from 'react-router-dom';
import Switch404 from 'Root/components/Switch404';
import AddUrl from './AddUrl';
import AppFrame from './AppFrame';
import Downloads from './Downloads';

export default () => (
  <AppFrame>
    <Switch404>
      <Route path="/add-url" component={AddUrl} />
      <Route path="/downloads/:category" component={Downloads} />
    </Switch404>
  </AppFrame>
);
