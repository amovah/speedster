import React, { Component } from 'react';
import {
  Card,
  Switch,
  Row,
  Col,
  TimePicker,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './index.less';

class Setting extends Component {
  state = {
    startTime: null,
    endTime: null,
  }

  onChangeStartTime = (time) => {
    this.setState({
      startTime: time.format('hh:mm:ss'),
    });
  }

  onChangeEndTime = (time) => {
    this.setState({
      endTime: time.format('hh:mm:ss'),
    });
  }

  render() {
    return (
      <Card
        title={(
          <div className={styles.betweenSpace}>
            <span>
              Queue Setting
            </span>
            <span>
              Power &nbsp;
              <Switch
                defaultChecked={this.props.queue.status}
              />
            </span>
          </div>
        )}
      >
        <Row>
          <Col span={11}>
            <span>
              Start Time: &nbsp;
            </span>
            <TimePicker
              allowClear={false}
              onChange={this.onChangeStartTime}
              placeholder="Start Time"
              defaultValue={moment(this.props.queue.startTime, 'hh:mm:ss')}
            />
          </Col>
          <Col span={1} />
          <Col span={11}>
            <span>
              End Time: &nbsp;
            </span>
            <TimePicker
              allowClear={false}
              onChange={this.onChangeEndTime}
              placeholder="End Time"
              defaultValue={moment(this.props.queue.endTime, 'hh:mm:ss')}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(state => ({
  queue: state.queue,
}))(Setting);
