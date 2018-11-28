import React, { Fragment, Component } from 'react';
import { Spin } from 'antd';

import init from 'Root/init';
import history from 'Root/history';
import styles from './index.less';

class Initializing extends Component {
  async componentDidMount() {
    try {
      await init();
    } catch (e) {
      console.log('error', e);
      history.push('/failed');
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Fragment>
          <h1>
            Gathering Will!
          </h1>
          <Spin
            size="large"
          />
        </Fragment>
      </div>
    );
  }
}

export default Initializing;
