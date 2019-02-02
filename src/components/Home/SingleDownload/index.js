import React, { Component } from 'react';
import {
  Card,
  Progress,
  Row,
  Col,
  Button,
  Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import pretty from 'pretty-bytes';
import humanizeDuration from 'humanize-duration';
import { resolve } from 'path';
import { exec } from 'child_process';
import pause from 'Root/actions/downloads/pause';
import resume from 'Root/actions/downloads/resume';
import remove from 'Root/actions/downloads/remove';
import Advanced from './Advanced';
import styles from './index.less';

class AddUrl extends Component {
  progressBar = () => {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);

    if (
      this.props.download.downloadStatus === 'pause'
      || this.props.download.downloadStatus === 'suspend'
    ) {
      return (
        <Progress
          strokeColor="gray"
          type="circle"
          percent={Math.floor((100 * downloaded) / total)}
        />
      );
    }

    return (
      <Progress
        type="circle"
        percent={Math.floor((100 * downloaded) / total)}
      />
    );
  }

  toggleDownload = () => {
    const buttons = [];
    if (
      this.props.download.downloadStatus === 'pause'
      || this.props.download.downloadStatus === 'suspend'
    ) {
      buttons.push(
        <Button
          key="resume"
          icon="caret-right"
          type="primary"
          shape="circle"
          onClick={() => resume(this.props.download.id)}
        />,
      );
    }

    if (this.props.download.downloadStatus === 'downloading') {
      buttons.push(
        <Button
          key="pause"
          icon="pause"
          type="primary"
          shape="circle"
          onClick={() => pause(this.props.download.id)}
        />,
      );
    }

    buttons.push(
      <Popconfirm
        key="stop"
        title="Are you sure?"
        onConfirm={() => remove(this.props.download.id)}
        placement="bottom"
      >
        <Button
          icon="close"
          type="danger"
          shape="circle"
        />
      </Popconfirm>,
    );

    return buttons;
  }

  status = () => {
    if (this.props.download.downloadStatus === 'downloading') {
      return 'Downloading..';
    }

    if (
      this.props.download.downloadStatus === 'pause'
      || this.props.download.downloadStatus === 'suspend'
    ) {
      return 'Pause';
    }

    return 'Complete';
  }

  speed = () => {
    const speed = parseInt(this.props.download.downloadSpeed, 10);

    if (this.props.download.maxSpeed) {
      return `${pretty(speed)} (limited by ${this.props.download.maxSpeed})`;
    }

    return pretty(speed);
  }

  showAdvanced = () => {
    if (this.props.download.downloadStatus !== 'completed') {
      return <Advanced download={this.props.download} />;
    }

    return null;
  }

  openDirectory = () => {
    exec(`xdg-open ${this.props.download.outputDir}`);
  }

  render() {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);
    const speed = parseInt(this.props.download.downloadSpeed, 10);

    return (
      <Card title={this.props.download.name}>
        <Row>
          <Col span={18}>
            <p>
              Status: {this.status()}
            </p>
            <p>
              File Size: {pretty(total)}
            </p>
            <p>
              Downloaded: {pretty(downloaded)}
            </p>
            <p>
              Download Speed: {this.speed()}
            </p>
            <p>
              Estimate Time: {humanizeDuration(Math.floor((total - downloaded) / speed) * 1000)}
            </p>
            <p>
              Connections: {this.props.download.maxConnection}
            </p>
            <p>
              Download URL: {this.props.download.url}
            </p>
            <p>
              Output Directory: &nbsp;
              <a
                onClick={this.openDirectory}
              >
                {resolve(this.props.download.outputDir, this.props.download.name)}
              </a>
            </p>
          </Col>
          <Col span={6}>
            <div className={styles.rightBar}>
              {this.progressBar()}
              <Button.Group>
                {this.toggleDownload()}
              </Button.Group>
            </div>
          </Col>
        </Row>
        {this.showAdvanced()}
      </Card>
    );
  }
}

export default connect(
  (state, props) => ({
    download: state.downloads.find(i => i.id === props.match.params.id),
  }),
)(AddUrl);
