import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Switch404 from 'Root/components/Switch404';
import AddUrl from './AddUrl';
import AppFrame from './AppFrame';

export default () => (
  <Switch>
    <Route>
      <AppFrame>
        <Switch404>
          <Route path="/add-url" component={AddUrl} />
        </Switch404>
      </AppFrame>
    </Route>
  </Switch>
);
