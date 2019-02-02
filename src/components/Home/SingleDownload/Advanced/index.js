import React, { Component } from 'react';
import {
  Collapse,
  Row,
  Col,
  Input,
  Button,
} from 'antd';
import changeDownload from 'Root/actions/downloads/change';

const Panel = Collapse.Panel;

export default class extends Component {
  state = {
    maxSpeed: null,
  }

  onChangeSpeed = (e) => {
    this.setState({
      maxSpeed: e.target.value,
    });
  }

  changeSpeed = () => {
    changeDownload(
      this.props.download,
      {
        maxSpeed: this.state.maxSpeed,
      },
    );
  }

  render() {
    return (
      <Collapse
        border={false}
        style={{
          border: 0,
          backgroundColor: 'white',
        }}
      >
        <Panel header="Advanced Options" key="1" style={{ border: 0 }}>
          <Row>
            <Col span={12}>
              <p>
                Speed Limit:
              </p>
              <Row>
                <Col span={18}>
                  <Input
                    placeholder="like 1KB, 512KB, 1MB, ..."
                    onChange={this.onChangeSpeed}
                  />
                </Col>
                <Col span={1} />
                <Col span={5}>
                  <Button
                    onClick={this.changeSpeed}
                  >
                    Change Limit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    );
  }
}
