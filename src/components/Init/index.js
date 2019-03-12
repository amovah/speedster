import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default () => (
  <div className={styles.root}>
    <h1>
      Initializing ...
    </h1>
    <Spin
      size="large"
    />
  </div>
);
