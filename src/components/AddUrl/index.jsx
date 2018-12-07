import React, { Component } from 'react';
import {
  Input,
  Row,
  Radio,
  Divider,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { remote } from 'electron';

import addDownload from 'Root/actions/downloads/add';
import styles from './index.less';

class AddUrl extends Component {
  static propTypes = {
    config: propType.object.isRequired,
  }

  state = {
    radioValue: 1,
    customDirectory: '',
  }

  urlRef = React.createRef();

  changeRadio = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  }

  changeLocation = () => {
    const dir = remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    this.setState({
      customDirectory: dir,
    });
  }

  download = () => {
    if (this.state.radioValue === 1) {
      addDownload({
        url: this.urlRef.current.input.value,
        outputDir: this.props.config.downloaddir,
      });
    }
    // addDownload(this.)
  }


  defaultLocation() {
    return (
      <Input
        disabled
        value={this.props.config.downloaddir}
      />
    );
  }

  customLocation() {
    return (
      <div>
        <Input
          disabled
          value={this.state.customDirectory}
        />
        <Button
          onClick={this.changeLocation}
          type="primary"
        >
          Change location
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Row>
          <Input
            placeholder="Enter your URL here!"
            ref={this.urlRef}
          />
        </Row>

        <Divider />

        <Radio.Group value={this.state.radioValue} onChange={this.changeRadio}>
          <Row>
            <Radio value={1}>
              Default Location
              <br />
              {this.state.radioValue === 1 && this.defaultLocation()}
            </Radio>
          </Row>
          <Row>
            <Radio value={2}>
              Custom Location
              <br />
              {this.state.radioValue === 2 && this.customLocation()}
            </Radio>
          </Row>
        </Radio.Group>

        <br />
        <Button
          type="primary"
          onClick={this.download}
        >
          Download
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    config: state.config,
  }),
)(AddUrl);
