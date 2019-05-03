import React, { Component } from 'react';
import {
  Card,
} from 'antd';
import { reduxForm } from 'redux-form';
import URLSection from './URLSection';

class AddUrl extends Component {
  state = {
    show: false,
  }

  render() {
    return (
      <Card>
        <URLSection changeState={this.setState.bind(this)} />
        <br />
        {this.state.show && 'a'}
      </Card>
    );
  }
}

const Wrapper = reduxForm({
  form: 'addUrl',
})(AddUrl);

export default Wrapper;
