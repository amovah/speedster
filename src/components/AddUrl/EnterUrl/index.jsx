import React, { Component } from 'react';
import {
  Input,
  Button,
} from 'antd';

import styles from './index.less';

export default class extends Component {
  inputRef = React.createRef();

  click() {

    console.log(this.inputRef.current.input.value);
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
