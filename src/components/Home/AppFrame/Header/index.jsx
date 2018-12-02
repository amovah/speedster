import React from 'react';
import {
  Layout,
  Button,
} from 'antd';

import openPage from 'Root/helpers/openPage';

const {
  Header,
} = Layout;


export default () => (
  <Header>
    <Button
      type="primary"
      onClick={() => openPage('/addUrl')}
    >
      Add Url
    </Button>
  </Header>
);
