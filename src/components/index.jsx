import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Initializing from './Initializing';
import Failed from './Failed';
import Home from './Home';
// import AddUrl from './AddUrl';

export default () => (
  <Switch>
    <Route path="/initializing" exact component={Initializing} />
    <Route path="/failed" exact component={Failed} />
    {/* <Route path="/addUrl" exact component={AddUrl} /> */}
    <Route exact path="/" component={Home} />
  </Switch>
);
