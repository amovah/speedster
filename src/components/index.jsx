import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Initializing from './Initializing';
import Failed from './Failed';

export default () => (
  <Switch>
    <Route path="/initializing" exact component={Initializing} />
    <Route path="/failed" exact component={Failed} />
  </Switch>
);
