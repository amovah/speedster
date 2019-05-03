import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Button,
} from 'antd';
import { Field, change } from 'redux-form';
import { remote } from 'electron';
import store from 'Root/store';
import {
  Input,
  InputNumber,
} from 'Root/shared';

const changeLocation = () => {
  remote.dialog.showOpenDialog({
    defaultPath: store.getState().form.addUrl.values.outputDir,
    properties: ['openDirectory'],
  }, (files) => {
    if (files) {
      store.dispatch(change('addUrl', 'outputDir', files[0]));
    }
  });
};

export default () => (
  <Fragment>
    <Row>
      <h3>
        Advanced Options:
      </h3>
      <Col span={10}>
        <p>
          Max Speed:
        </p>
        <Field
          component={Input}
          placeholder="like 1KB, 512KB, 1MB, ..."
          name="maxSpeed"
        />
      </Col>
      <Col span={2} />
      <Col span={10}>
        <p>
          Save Location:
        </p>
        <Row>
          <Col span={17}>
            <Field
              name="outputDir"
              component={Input}
              disabled
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Button
              type="primary"
              onClick={changeLocation}
            >
              Change Location
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span={10}>
        <p>
          Connections:
        </p>
        <Field
          component={InputNumber}
          name="maxConnection"
          min={1}
          max={16}
        />
      </Col>
      <Col span={2} />
    </Row>
  </Fragment>
);
