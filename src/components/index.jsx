import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Initializing from './Initializing';

export default () => (
  <Switch>
    <Route path="/initializing" exact component={Initializing} />
  </Switch>
);
