import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppFrame from './AppFrame';
import AddUrl from './AddUrl';
import SingleDownload from './SingleDownload';

export default () => (
  <AppFrame>
    <Switch>
      <Route exact path="/add-url" component={AddUrl} />
      <Route exact path="/download/:id" component={SingleDownload} />
    </Switch>
  </AppFrame>
);
