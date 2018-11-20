import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AddUrl from './AddUrl';

export default () => (
  <Switch>
    <Route path="/" component={AddUrl} />
  </Switch>
);
