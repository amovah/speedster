import React, { Component } from 'react';
import {
  Input,
  Button,
} from 'antd';
import propType from 'prop-types';

import styles from './index.less';

export default class extends Component {
  static propTypes = {
    setDownloadInfo: propType.func.isRequired,
    navigate: propType.func.isRequired,
  }

  inputRef = React.createRef();

  click() {
    this.props.setDownloadInfo({
      url: this.inputRef.current.input.value,
    });

    this.props.navigate(1);
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Enter your URL here!"
          ref={this.inputRef}
        />

        <div className={styles.footer}>
          <Button
            onClick={() => this.click()}
            type="primary"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}
