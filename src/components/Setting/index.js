import React, { PureComponent } from 'react';
import {
  Card,
  Row,
  Col,
  Switch,
} from 'antd';
import { connect } from 'react-redux';

class Setting extends PureComponent {
  changeAutoStart = () => {

  }

  render() {
    return (
      <Card>
        <h3>Auto-Launch</h3>
        <Row>
          <Col span={20}>
            <p>
              Auto launch Speedster when you login:
            </p>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Switch
              unCheckedChildren="Off"
              checkedChildren="On"
              defaultChecked={this.props.setting.autoLaunch}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(state => ({
  setting: state.setting,
}))(Setting);
