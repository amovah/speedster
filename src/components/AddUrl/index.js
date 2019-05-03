import React, { Component } from 'react';
import {
  Card,
} from 'antd';
import { reduxForm } from 'redux-form';
import URLSection from './URLSection';

class AddUrl extends Component {
  state = {
    loading: false,
  }

  render() {
    return (
      <Card>
        <URLSection />
      </Card>
    );
  }
}

const Wrapper = reduxForm({
  form: 'addUrl',
})(AddUrl);

export default Wrapper;
