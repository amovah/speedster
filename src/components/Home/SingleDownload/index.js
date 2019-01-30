import React, { PureComponent } from 'react';
import {
  Card,
  Progress,
  Row,
  Col,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import pretty from 'pretty-bytes';
import humanizeDuration from 'humanize-duration';
import pause from 'Root/actions/downloads/pause';
import resume from 'Root/actions/downloads/resume';
import styles from './index.less';

class AddUrl extends PureComponent {
  progressBar = () => {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);

    if (this.props.download.downloadStatus === 'pause') {
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
    if (this.props.download.downloadStatus === 'pause') {
      buttons.push(
        <Button
          key="resume"
          icon="caret-right"
          type="primary"
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
          onClick={() => pause(this.props.download.id)}
        />,
      );
    }

    if (this.props.downloadStatus !== 'completed') {
      buttons.push(
        <Button
          key="stop"
          icon="close"
          type="danger"
        />,
      );
    }

    return buttons;
  }

  status = () => {
    if (this.props.download.downloadStatus === 'downloading') {
      return 'Downloading..';
    }

    if (this.props.download.downloadStatus === 'pause') {
      return 'Pause';
    }

    return 'Completed';
  }

  render() {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);
    const speed = parseInt(this.props.download.downloadSpeed, 10);

    return (
      <Card>
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
              Download Speed: {pretty(speed)}
            </p>
            <p>
              Estimate Time: {humanizeDuration(Math.floor((total - downloaded) / speed) * 1000)}
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
      </Card>
    );
  }
}

export default connect(
  (state, props) => ({
    download: state.downloads.find(i => i.id === props.match.params.id),
  }),
)(AddUrl);
