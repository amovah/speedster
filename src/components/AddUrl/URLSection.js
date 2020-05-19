import React, { useState, useEffect, Component } from 'react';
import {
  Row,
  Col,
  Button,
  message,
  Input,
} from 'antd';
import { RedoOutlined, DownloadOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';
import history from 'Root/history';
import gatherInfo from 'Root/helpers/gatherInfo';
import store from 'Root/store';
import download from 'Root/actions/downloads/add/single';
import downloadLater from 'Root/actions/downloads/add/later';
import downloadQueue from 'Root/actions/downloads/add/queue';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './index.less';

export default function URLSection() {
  const { watch, control, getValues } = useFormContext();
  const [stage, setStage] = useState('empty');
  const [toDownload, setToDownload] = useState(false);

  async function checkUrl(url) {
    const res = await gatherInfo(url);
    if (!res) {
      message.error('Error! Speedster cannot download this file.');
      setStage('checked');
    } else {
      setStage('ready');

      // this.props.changeState({
      //   show: true,
      // });
    }
  }

  function recheckUrl() {
    // this.props.changeState({
    //   show: false,
    // });

    setStage('checking');
    checkUrl(getValues('url'));
  }

  function CheckButton() {
    if (stage === 'checking') {
      return (
        <Button
          type="primary"
          loading
        >
          Loading
        </Button>
      );
    }

    if (stage === 'empty') {
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
        icon={<RedoOutlined />}
        onClick={recheckUrl}
      >
        Recheck URL
      </Button>
    );
  }

  function DownloadButtons() {
    return (
      <div className={styles.center}>
        <Button.Group>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            disabled={toDownload}
          >
            Download
          </Button>
          <Button
            disabled={toDownload}
          >
            Download Later
          </Button>
          <Button
            disabled={toDownload}
          >
            Add To Queue
          </Button>
        </Button.Group>
      </div>
    );
  }

  useEffect(() => {
    const url = getValues('url');
    if (url === '' || url === undefined) {
      setStage('empty');
    } else {
      setStage('checking');
      checkUrl(url);
    }
  }, [watch('url')]);

  return (
    <>
      <Row>
        <Col span={18}>
          <Controller
            as={(
              <Input
                placeholder="Enter your URL here!"
                type="text"
                disabled={stage === 'checking'}
              />
            )}
            name="url"
            control={control}
          />
        </Col>
        <Col span={1} />
        <Col span={5}>
          <CheckButton />
        </Col>
      </Row>
      {stage === 'ready' && (
        <>
          <br />
          <DownloadButtons />
        </>
      )}
    </>
  );
}

class AAA extends Component {
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
      this.setState({
        stage: 'checking',
      });
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

    let id;
    const { data, ...rest } = store.getState().form.addUrl.values;

    if (method === 'download') {
      id = await download({
        ...data,
        ...rest,
      });
    }

    if (method === 'downloadLater') {
      id = await downloadLater({
        ...data,
        ...rest,
      });
    }

    if (method === 'downloadQueue') {
      id = await downloadQueue({
        ...data,
        ...rest,
      });
    }

    history.push(`/download/${id}`);
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
                onClick={() => this.download('downloadQueue')}
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
