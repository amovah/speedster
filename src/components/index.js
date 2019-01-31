import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Failed from './Failed';
import Home from './Home';

export default () => (
  <Switch>
    <Route path="/failed" exact component={Failed} />
    <Route path="/" component={Home} />
  </Switch>
);
