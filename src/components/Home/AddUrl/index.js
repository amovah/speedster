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
    loading: false,
  }

  download = async () => {
    this.setState({
      loading: true,
    });

    const res = await addDownload({
      url: this.state.url,
    });

    if (!res) {
      this.setState({
        loading: false,
      });
    }
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
          loading={this.state.loading}
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
