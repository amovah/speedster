import React, { Component } from 'react';
import {
  Steps,
} from 'antd';

import EnterUrl from './EnterUrl';
import styles from './index.less';

const steps = [{
  title: 'Enter URL',
  content: EnterUrl,
}, {
  title: 'Desitnation',
  content: EnterUrl,
}, {
  title: 'Downloading',
}];

class AddUrl extends Component {
  state = {
    current: 0,
  }

  navigate = (direction) => {
    this.setState(state => ({
      current: state.current + direction,
    }));
  }

  currentScene() {
    const Current = steps[this.state.current].content;

    return <Current navigate={this.navigate} />;
  }

  render() {
    return (
      <div className={styles.container}>
        <Steps current={this.state.current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
        </Steps>

        <div className={styles.content}>
          {this.currentScene()}
        </div>
      </div>
    );
  }
}

export default AddUrl;
