import React, { Component } from 'react';
import {
  Card,
  Switch,
  Row,
  Col,
  TimePicker,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import changeQueue from 'Root/actions/queue/change';
import startQueue from 'Root/actions/queue/start';
import stopQueue from 'Root/actions/queue/stop';
import styles from './index.less';

class Setting extends Component {
  state = {
    startTime: null,
    endTime: null,
  }

  onChangeStartTime = (time) => {
    this.setState({
      startTime: `${time.hour()}:${time.minute()}:${time.second()}`,
    });
  }

  onChangeEndTime = (time) => {
    this.setState({
      endTime: `${time.hour()}:${time.minute()}:${time.second()}`,
    });
  }

  save = () => {
    changeQueue({
      startTime: this.state.startTime || this.props.queue.startTime,
      endTime: this.state.endTime || this.props.queue.endTime,
    });
  }

  togglePower = (status) => {
    if (status) {
      startQueue();
    } else {
      stopQueue();
    }
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
                onChange={this.togglePower}
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
        <br />
        <div className={styles.center}>
          <Button
            type="primary"
            onClick={this.save}
          >
            Save
          </Button>
        </div>
      </Card>
    );
  }
}

export default connect(state => ({
  queue: state.queue,
}))(Setting);
