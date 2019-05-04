import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  message,
} from 'antd';
import {
  Field,
  change as changeForm,
  reset as resetForm,
} from 'redux-form';
import { clipboard } from 'electron';
import history from 'Root/history';
import {
  Input,
} from 'Root/shared';
import gatherInfo from 'Root/helpers/gatherInfo';
import store from 'Root/store';
import download from 'Root/actions/downloads/download/single';
import downloadLater from 'Root/actions/downloads/download/later';
import styles from './index.less';

export default class extends Component {
  state = {
    stage: 'empty',
    toDownload: false,
  }

  componentDidMount() {
    const url = store.getState().form.addUrl.values?.url;
    if (url) {
      this.checkUrl(url);
      return;
    }

    const text = clipboard.readText();
    if (text) {
      store.dispatch(changeForm('addUrl', 'url', text));
      this.checkUrl(text);
    }
  }

  componentWillUnmount() {
    store.dispatch(resetForm('addUrl'));
  }

  onUrlChange = (event, newValue) => {
    this.props.changeState({
      show: false,
    });

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
    const res = await gatherInfo(url);
    if (!res) {
      message.error('Error! Speedster cannot download this file.');
      this.setState({
        stage: 'checked',
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

  recheck = () => {
    this.props.changeState({
      show: false,
    });

    this.setState({
      stage: 'checking',
    });

    this.checkUrl(store.getState().form.addUrl.values.url);
  }

  checkButton = () => {
    if (this.state.stage === 'checking') {
      return (
        <Button
          type="primary"
          icon="download"
          loading
        />
      );
    }

    if (this.state.stage === 'empty') {
      return (
        <Button
          type="primary"
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

  download = async (method) => {
    this.setState({
      toDownload: true,
    });

    if (method === 'download') {
      const id = await download();
      history.push(`/download/${id}`);
    }

    if (method === 'downloadLater') {
      const id = await downloadLater();
      history.push(`/download/${id}`);
    }
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
                onClick={() => this.download('download')}
              >
                Download
              </Button>
              <Button
                disabled={this.state.toDownload}
                onClick={() => this.download('downloadLater')}
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
