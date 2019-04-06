import React from 'react';
import { Route } from 'react-router-dom';
import Switch404 from 'Root/components/Switch404';
import AddUrl from './AddUrl';
import AppFrame from './AppFrame';
import Downloads from './Downloads';
import Schedule from './Schedule';
import Queue from './Queue';
import SingleDownload from './SingleDownload';

export default () => (
  <AppFrame>
    <Switch404>
      <Route path="/add-url" component={AddUrl} />
      <Route path="/downloads/:category" component={Downloads} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/queue/:type" component={Queue} />
      <Route path="/download/:id" component={SingleDownload} />
    </Switch404>
  </AppFrame>
);
