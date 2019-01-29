import React, { Component } from 'react';
import { Spin } from 'antd';

import history from 'Root/history';
import styles from './index.less';

class Initializing extends Component {
  async componentDidMount() {
    try {
      // await init();
    } catch (e) {
      console.log('error', e);
      history.push('/failed');
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>
          Starting Ariac2 RPC Mode...
        </h1>
        <Spin
          size="large"
        />
      </div>
    );
  }
}

export default Initializing;
