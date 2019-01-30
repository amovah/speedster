import React, { PureComponent } from 'react';
import {
  Card,
  Progress,
  Row,
  Col,
} from 'antd';
import { connect } from 'react-redux';
import pretty from 'pretty-bytes';

class AddUrl extends PureComponent {
  progressBar = () => {
    const total = parseInt(this.props.download.totalLength, 10);
    const downloaded = parseInt(this.props.download.completedLength, 10);

    if (this.props.download.downloadStatus === 'pause') {
      return <Progress strokeColor="gray" type="circle" percent={(100 * downloaded) / total} />;
    }

    return <Progress type="circle" percent={(100 * downloaded) / total} />;
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
            {this.progressBar()}
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
