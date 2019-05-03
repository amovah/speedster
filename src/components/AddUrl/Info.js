import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import pretty from 'pretty-bytes';
import {
  Row,
  Col,
} from 'antd';
import styles from './index.less';

const Details = ({ details }) => (
  <Fragment>
    <h3>
      File Details:
    </h3>
    <Row>
      <Col span={7}>
        <p className={styles.break}>
          Name: {details.name}
        </p>
      </Col>
      <Col span={1} />
      <Col span={7}>
        <p>
          File Size: {pretty(parseInt(details.totalLength, 10))}
        </p>
      </Col>
      <Col span={1} />
      <Col span={7}>
        <p>
          Category: {details.category}
        </p>
      </Col>
    </Row>
  </Fragment>
);

export default connect(
  state => ({
    details: state.form.addUrl.values.data,
  }),
)(Details);
