import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  message,
} from 'antd';
import { Field } from 'redux-form';
import {
  Input,
} from 'Root/shared';
import gatherInfo from 'Root/helpers/gatherInfo';
import styles from './index.less';

export default class extends Component {
  state = {
    stage: 'empty',
  }

  componentDidMount() {

  }

  onUrlChange = (event, newValue) => {
    if (newValue === '') {
      this.setState({
        stage: 'empty',
      });
    } else {
      this.setState({
        stage: 'checking',
      });
      this.checkUrl(newValue);
    }
  }

  checkUrl = async (url) => {
    this.props.changeState({
      show: false,
    });

    const res = await gatherInfo(url);
    if (!res) {
      message.error('Error! Speedster cannot download this file.');
      this.setState({
        stage: 'empty',
      });
    } else {
      this.setState({
        stage: 'ready',
      });

      this.props.changeState({
        show: true,
      });
    }
  }

  checkButton = () => {
    if (this.state.stage === 'checking') {
      return (
        <Button
          type="primary"
          onClick={this.download}
          icon="download"
          loading
        />
      );
    }

    if (this.state.stage === 'empty') {
      return (
        <Button
          type="primary"
          onClick={this.download}
          disabled
        >
          Waiting for URL
        </Button>
      );
    }

    return (
      <Button
        type="primary"
        onClick={this.recheck}
      >
        Recheck URL
      </Button>
    );
  }

  downloadOptions = () => {
    if (this.state.stage === 'ready') {
      return (
        <Row>
          <div className={styles.center}>
            <Button.Group>
              <Button
                type="primary"
                icon="download"
                loading={this.state.toDownload}
                onClick={this.download}
              >
                Download
              </Button>
              <Button
                disabled={this.state.toDownload}
                onClick={this.quietDownload}
              >
                Download Later
              </Button>
              <Button
                disabled={this.state.toDownload}
                onClick={this.addDownloadToQueue}
              >
                Add To Queue
              </Button>
            </Button.Group>
          </div>
        </Row>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={18}>
            <Field
              component={Input}
              name="url"
              placeholder="Enter your URL here!"
              type="text"
              disabled={this.state.stage === 'checking'}
              onChange={this.onUrlChange}
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            {this.checkButton()}
          </Col>
        </Row>
        <br />
        {this.downloadOptions()}
      </div>
    );
  }
}
