import React from 'react';

import styles from './index.less';

const Failed = () => (
  <div className={styles.root}>
    <h1>
      Failed Speedster. probably you dont have aria2c on your system.
      please install it before running Speedster.
    </h1>
  </div>
);

export default Failed;
