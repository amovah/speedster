import React, { Component } from 'react';
import {
  Card,
  Divider,
} from 'antd';
import { reduxForm } from 'redux-form';
import URLSection from './URLSection';
import Info from './Info';
import Advanced from './Advanced';

class AddUrl extends Component {
  state = {
    show: false,
  }

  blankLine = () => {
    if (this.state.show) {
      return <Divider />;
    }

    return null;
  }

  render() {
    return (
      <Card>
        <URLSection changeState={this.setState.bind(this)} />
        {this.blankLine()}
        {this.state.show && <Info />}
        {this.blankLine()}
        {this.state.show && <Advanced />}
      </Card>
    );
  }
}

const Wrapper = reduxForm({
  form: 'addUrl',
})(AddUrl);

export default Wrapper;
