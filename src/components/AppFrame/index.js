import React from 'react';
import {
  Layout,
} from 'antd';
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

export default AppFrame;
