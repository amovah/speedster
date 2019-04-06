import React, { Component } from 'react';
import {
  Collapse,
  Row,
  Col,
  Input,
  Button,
  InputNumber,
} from 'antd';
import changeDownload from 'Root/actions/downloads/change';

const Panel = Collapse.Panel;

export default class extends Component {
  state = {
    maxSpeed: null,
    maxConnection: this.props.download.maxConnection.toString(),
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

  onChangeConnection = (number) => {
    this.setState({
      maxConnection: number.toString(),
    });
  }

  changeConnection = () => {
    changeDownload(
      this.props.download,
      {
        maxConnection: this.state.maxConnection,
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
            <Col span={14}>
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
                    Change
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={2} />
            <Col span={6}>
              <p>
                Connections:
              </p>
              <Row>
                <Col span={18}>
                  <InputNumber
                    min={1}
                    max={16}
                    defaultValue={parseInt(this.props.download.maxConnection, 10)}
                    onChange={this.onChangeConnection}
                  />
                </Col>
                <Col span={1} />
                <Col span={5}>
                  <Button
                    onClick={this.changeConnection}
                  >
                    Change
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
