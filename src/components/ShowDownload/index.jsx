import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  List,
} from 'antd';
import propType from 'prop-types';

import styles from './index.less';

class ShowDownload extends Component {
  static propTypes = {
    download: propType.object.isRequired,
  }

  gatherData = () => [
    `Downloading URL : ${this.props.download.url}`,
    `Status : ${this.props.download.status}`,
    `Size : ${this.props.download.status}`,
  ];

  render() {
    return (
      <div className={styles.container}>
        <List
          size="small"
          bordered={false}
          dataSource={this.gatherData()}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    );
  }
}

export default connect((state, props) => ({
  download: state.downloads.find(
    download => download.id === props.match.params.downloadId,
  ),
}))(ShowDownload);
