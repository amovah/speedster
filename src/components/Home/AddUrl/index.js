import React, { Component, Fragment } from 'react';
import {
  Input,
  Row,
  Divider,
  Button,
  Card,
  Col,
  message,
} from 'antd';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { resolve, extname } from 'path';
import addDownload from 'Root/actions/downloads/add';
import gatherInfo from 'Root/helpers/gatherInfo';
import db from 'Root/db';

class AddUrl extends Component {
  state = {
    url: null,
    maxSpeed: null,
    outputDir: this.props.setting.downloaddir,
    loading: true,
    category: null,
    name: null,
    isDisable: true,
  }

  download = async () => {
    addDownload({
      url: this.state.url,
      name: this.state.name,
      category: this.state.category,
      maxSpeed: this.state.maxSpeed,
      outputDir: this.state.outputDir,
    });
  }

  downloadButton = () => {
    if (this.state.isDisable) {
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

    if (this.state.loading) {
      return (
        <Button
          type="primary"
          onClick={this.download}
          icon="download"
          loading
        />
      );
    }

    return (
      <Button
        type="primary"
        onClick={this.download}
        icon="download"
      >
        Download
      </Button>
    );
  }

  changeLocation = () => {
    const setState = this.setState.bind(this);
    remote.dialog.showOpenDialog({
      defaultPath: this.state.outputDir,
      properties: ['openDirectory'],
    }, (files) => {
      if (files) {
        setState({
          outputDir: files[0],
        });
      }
    });
  }

  onChangeURL = async (e) => {
    e.persist();
    if (!e.target.value) {
      this.setState({
        isDisable: true,
        loading: false,
      });
      return;
    }
    this.setState({
      isDisable: false,
      loading: true,
    });

    const res = await gatherInfo(e.target.value);
    if (res === 'error') {
      message.error('Bad URL');
      return;
    }
    if (res === 'cant') {
      message.error('Speedster cannot download the URL');
      return;
    }

    const name = res.files[0].path.split('/').slice(-1)[0];

    const categories = db.get('categories').values();
    let category;
    for (const cate of categories) {
      if (cate.extensions.includes(extname(name))) {
        category = category.name;
      }
    }
    if (!category) {
      category = 'Others';
    }

    this.setState({
      url: e.target.value,
      loading: false,
      category,
      outputDir: resolve(this.props.setting.downloaddir, category),
      name,
    });
  }

  onChangeSpeed = (e) => {
    this.setState({
      maxSpeed: e.target.value,
    });
  }

  showOptions = () => {
    if (!this.state.loading) {
      return (
        <Fragment>
          <Divider />
          <Row>
            <Col span={10}>
              <p>
                Max Speed:
              </p>
              <Input
                placeholder="like 1KB, 512KB, 1MB, ..."
                onChange={this.onChangeSpeed}
              />
            </Col>
            <Col span={2} />
            <Col span={10}>
              <p>
                Save Location:
              </p>
              <Row>
                <Col span={17}>
                  <Input
                    value={this.state.outputDir}
                    disabled
                  />
                </Col>
                <Col span={1} />
                <Col span={5}>
                  <Button
                    type="primary"
                    onClick={this.changeLocation}
                  >
                    Change Location
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Fragment>
      );
    }

    return null;
  }

  render() {
    return (
      <Card>
        <Row>
          <Col span={18}>
            <Input
              placeholder="Enter your URL here!"
              onChange={this.onChangeURL}
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            {this.downloadButton()}
          </Col>
        </Row>
        {this.showOptions()}
      </Card>
    );
  }
}

export default connect(
  state => ({
    setting: state.setting,
  }),
)(AddUrl);
