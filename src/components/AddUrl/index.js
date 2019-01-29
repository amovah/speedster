import React, { Component } from 'react';
import {
  Input,
  Row,
  Divider,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import addDownload from 'Root/actions/downloads/add';
import styles from './index.less';

class AddUrl extends Component {
  state = {
    url: null,
  }

  download = () => {
    addDownload({
      url: this.state.url,
    });
  }

  inputOnChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Row>
          <Input
            placeholder="Enter your URL here!"
            onChange={this.inputOnChange('url')}
          />
        </Row>

        <Divider />

        <Button
          type="primary"
          onClick={this.download}
          icon="download"
        >
          Download
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    config: state.setting,
  }),
)(AddUrl);
