import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppFrame from './AppFrame';
import AddUrl from './AddUrl';
import SingleDownload from './SingleDownload';
import AllDownloads from './AllDownloads';
import Completeds from './Completeds';
import Incompletes from './Incompletes';
import Category from './Category';
import QueueSetting from './QueueSetting';

export default () => (
  <AppFrame>
    <Switch>
      <Route exact path="/add-url" component={AddUrl} />
      <Route exact path="/download/:id" component={SingleDownload} />
      <Route exact path="/all" component={AllDownloads} />
      <Route exact path="/completeds" component={Completeds} />
      <Route exact path="/incompletes" component={Incompletes} />
      <Route exact path="/category/:category" component={Category} />
      <Route exact path="/queue-setting" component={QueueSetting} />
    </Switch>
  </AppFrame>
);
