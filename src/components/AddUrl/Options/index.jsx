import React, { Component } from 'react';
import {
  Input,
  Radio,
  Button,
} from 'antd';
import propType from 'prop-types';

import styles from './index.less';

export default class extends Component {
  static propTypes = {
    downloadInfo: propType.object.isRequired,
    navigate: propType.func.isRequired,
  }

  state = {
    value: 1,
  }

  inputRef = React.createRef();

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  download() {
    console.log(this.props.downloadInfo);
  }

  back() {
    this.props.navigate(-1);
  }

  render() {
    return (
      <div>
        <Radio.Group value={this.state.value} onChange={this.onChange}>
          <Radio value={1}>
            <span>
              Default Location
            </span>
          </Radio>
          <br />
          <Radio value={2}>
            <span>
              Custom Location ...
            </span>
            <br />
            {
              this.state.value === 2
              && (
                <Input
                  placeholder="Enter your URL here!"
                  ref={this.inputRef}
                />
              )
            }
          </Radio>
        </Radio.Group>

        <div className={styles.footer}>
          <Button
            onClick={() => this.back()}
          >
            Back
          </Button>
          <Button
            onClick={() => this.downlaod()}
            type="primary"
          >
            Download
          </Button>
        </div>
      </div>
    );
  }
}
