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
    maxSpeed: this.props.download.maxSpeed,
  }

  onChangeSpeed = (e) => {
    this.setState({
      maxSpeed: e.target.value,
    });
  }

  applyChanges = () => {
    changeDownload(
      this.props.download.id,
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
            <Col span={10}>
              <p>
                Speed Limit:
              </p>
              <Input
                placeholder="like 1KB, 512KB, 1MB, ..."
                onChange={this.onChangeSpeed}
                value={this.state.maxSpeed}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Button onClick={this.applyChanges}>
              Apply
            </Button>
          </Row>
        </Panel>
      </Collapse>
    );
  }
}
