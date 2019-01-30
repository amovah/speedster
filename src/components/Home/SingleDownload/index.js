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
import pause from 'Root/actions/downloads/pause';
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
          percent={parseInt(((100 * downloaded) / total).toFixed(0), 10)}
        />
      );
    }

    return (
      <Progress
        type="circle"
        percent={parseInt(((100 * downloaded) / total).toFixed(0), 10)}
      />
    );
  }

  toggleDownload = () => {
    if (this.props.download.downloadStatus === 'pause') {
      return <Button icon="play-circle" type="primary" />;
    }

    if (this.props.download.downloadStatus === 'downloading') {
      return <Button icon="pause" type="primary" onClick={() => pause(this.props.download.id)} />;
    }

    return null;
  }

  render() {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);

    return (
      <Card>
        <Row>
          <Col span={18}>
            <p>
              Status: {this.props.download.downloadStatus}
            </p>
            <p>
              File Size: {pretty(total)}
            </p>
            <p>
              Downloaded: {pretty(downloaded)}
            </p>
            <p>
              Download Speed: {pretty(parseInt(this.props.download.downloadSpeed, 10))}
            </p>
          </Col>
          <Col span={6}>
            <div className={styles.rightBar}>
              {this.progressBar()}
              {this.toggleDownload()}
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
