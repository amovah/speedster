import React from 'react';
import {
  Layout,
} from 'antd';
import PropType from 'prop-types';

import openPage from 'Root/helpers/openPage';
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
