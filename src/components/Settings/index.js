import React, { PureComponent } from 'react';
import {
  Card,
  Row,
  Col,
  Switch,
} from 'antd';
import { connect } from 'react-redux';
import * as autoLaunch from 'Root/autoLaunch';
import changeSetting from 'Root/actions/setting/change';
import { sync } from 'Root/db';

class Setting extends PureComponent {
  changeAutoStart = async () => {
    if (this.props.setting.autoLaunch) {
      autoLaunch.disable();
      changeSetting({
        autoLaunch: false,
      });
    } else {
      autoLaunch.enable();
      changeSetting({
        autoLaunch: true,
      });
    }

    await sync();
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
              onChange={this.changeAutoStart}
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
