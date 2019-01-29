import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Init from './Init';
import Failed from './Failed';
import Home from './Home';
import AddUrl from './AddUrl';
// import ShowDownload from './ShowDownload';

export default () => (
  <Switch>
    <Route path="/init" exact component={Init} />
    <Route path="/failed" exact component={Failed} />
    <Route path="/add-url" exact component={AddUrl} />
    {/* <Route path="/showDownload/:downloadId" exact component={ShowDownload} /> */}
    <Route exact path="/" component={Home} />
  </Switch>
);
