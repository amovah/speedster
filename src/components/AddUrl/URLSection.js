import React, {
  useState, useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  message,
  Input,
  Typography,
} from 'antd';
import { RedoOutlined, DownloadOutlined } from '@ant-design/icons';
import gatherInfo from 'Root/helpers/gatherInfo';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './index.less';

export default function URLSection({ setDetails, setShow }) {
  const {
    watch, control, getValues,
  } = useFormContext();
  const [stage, setStage] = useState('empty');
  const [toDownload, setToDownload] = useState(false);

  async function checkUrl(url) {
    const res = await gatherInfo(url);
    if (!res) {
      message.error('Error! Speedster cannot download this file.');
      setStage('checked');
    } else {
      setDetails(res);
      setStage('ready');
      setShow(true);
    }
  }

  function recheckUrl() {
    setShow(false);
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
        <Typography.Title level={3}>
          Enter Your URL:
        </Typography.Title>
      </Row>
      <Row>
        <Col span={18}>
          <Controller
            as={(
              <Input
                placeholder="Enter your URL here!"
                type="text"
                disabled={stage === 'checking'}
                allowClear
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
