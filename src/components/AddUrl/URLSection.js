import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'antd';
import { Field } from 'redux-form';
import {
  Input,
} from 'Root/shared';

export default class extends Component {
  componentDidMount() {

  }

  onUrlChange = (event, newValue) => {
    console.log(newValue);
  }

  render() {
    return (
      <Row>
        <Col span={18}>
          <Field
            component={Input}
            name="url"
            placeholder="Enter your URL here!"
            type="text"
            onChange={this.onUrlChange}
          />
        </Col>
        <Col span={1} />
        <Col span={5}>
          {/* {this.checkButton()} */}
        </Col>
      </Row>
    );
  }
}
