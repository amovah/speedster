import React, { Component } from 'react';
import {
  Steps,
} from 'antd';

import EnterUrl from './EnterUrl';
import Options from './Options';
import styles from './index.less';

const steps = [{
  title: 'Enter URL',
  content: EnterUrl,
}, {
  title: 'Desitnation',
  content: Options,
}];

class AddUrl extends Component {
  state = {
    current: 0,
    downloadInfo: {},
  }

  navigate = (direction) => {
    this.setState(state => ({
      current: state.current + direction,
    }));
  }

  setDownloadInfo = (info) => {
    this.setState(state => ({
      downloadInfo: Object.assign({}, state.downloadInfo, info),
    }));
  }

  currentScene() {
    const Current = steps[this.state.current].content;

    return (
      <Current
        navigate={this.navigate}
        downloadInfo={this.state.downloadInfo}
        setDownloadInfo={this.setDownloadInfo}
      />
    );
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
