import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default props => (
  <Switch>
    {props.children}
    <Route>
      <Redirect to="/downloads/all" />
    </Route>
  </Switch>
);
