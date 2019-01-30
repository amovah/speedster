import React, { Component } from 'react';
import {
  Input,
  Row,
  Divider,
  Button,
  Card,
} from 'antd';
import { connect } from 'react-redux';
import addDownload from 'Root/actions/downloads/add';

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
      <Card>
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
      </Card>
    );
  }
}

export default connect(
  state => ({
    setting: state.setting,
  }),
)(AddUrl);
