import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppFrame from './AppFrame';
import AddUrl from './AddUrl';

export default () => (
  <AppFrame>
    <Switch>
      <Route exact path="/add-url" component={AddUrl} />
    </Switch>
  </AppFrame>
);
