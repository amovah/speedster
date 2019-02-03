import React from 'react';
import {
  Card,
  Switch,
  Row,
  Col,
} from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';

const Setting = props => (
  <Card
    title={(
      <div className={styles.betweenSpace}>
        <span>
          Queue Setting
        </span>
        <span>
          Power &nbsp;
          <Switch
            defaultChecked={props.queue.status}
          />
        </span>
      </div>
    )}
  >
    <p>
      Setting
    </p>
  </Card>
);

export default connect(state => ({
  queue: state.queue,
}))(Setting);
