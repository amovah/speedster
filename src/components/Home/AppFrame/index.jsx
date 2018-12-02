import React from 'react';
import {
  Layout,
  Button,
} from 'antd';
import PropType from 'prop-types';

import openPage from 'Root/helpers/openPage';
import Sidebar from './Sidebar';
import styles from './index.less';

const {
  Header,
  Content,
} = Layout;

const AppFrame = ({
  children,
}) => (
  <Layout>
    <Header>
      <Button>
        Add Url
      </Button>
    </Header>
    <Layout>
      <Sidebar />
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  </Layout>
);

AppFrame.defaultProps = {
  children: () => null,
};

AppFrame.propTypes = {
  children: PropType.node,
};

export default AppFrame;
