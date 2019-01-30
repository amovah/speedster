import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Init from './Init';
import Failed from './Failed';
import Home from './Home';

export default () => (
  <Switch>
    <Route path="/init" exact component={Init} />
    <Route path="/failed" exact component={Failed} />
    <Route path="/" component={Home} />
  </Switch>
);
