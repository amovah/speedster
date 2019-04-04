import React from 'react';
import {
  Layout,
} from 'antd';
import PropType from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';
import styles from './index.less';

const {
  Content,
} = Layout;

const AppFrame = ({
  children,
}) => (
  <Layout>
    <Header />
    <Layout style={{ marginTop: 64 }}>
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
