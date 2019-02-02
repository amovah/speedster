import React, { Component, Fragment } from 'react';
import {
  Input,
  Row,
  Divider,
  Button,
  Card,
  Col,
  message,
  InputNumber,
} from 'antd';
import { connect } from 'react-redux';
import { remote, clipboard } from 'electron';
import { resolve, extname } from 'path';
import pretty from 'pretty-bytes';
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
    maxConnection: '16',
    details: null,
  }

  urlRef = React.createRef();

  componentDidMount() {
    const text = clipboard.readText();
    if (text) {
      this.urlRef.current.state.value = text;
      this.onChangeURL({
        persist() {},
        target: {
          value: text,
        },
      });
    }
  }

  download = async () => {
    this.setState({
      isDisable: false,
      loading: true,
    });

    addDownload({
      url: this.state.url,
      name: this.state.name,
      category: this.state.category,
      maxSpeed: this.state.maxSpeed,
      outputDir: this.state.outputDir,
      maxConnection: this.state.maxConnection,
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
        loading: true,
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
      this.setState({
        isDisable: true,
        loading: true,
      });
      return;
    }
    if (res === 'cant') {
      message.error('Speedster cannot download the URL');
      this.setState({
        isDisable: true,
        loading: true,
      });
      return;
    }

    const name = res.files[0].path.split('/').slice(-1)[0];

    const categories = db.get('categories').values();
    let category;
    for (const cate of categories) {
      if (cate.extensions.includes(extname(name))) {
        category = cate.name;
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
      details: res,
    });
  }

  onChangeSpeed = (e) => {
    this.setState({
      maxSpeed: e.target.value,
    });
  }

  onChangeConnection = (connections) => {
    this.setState({
      maxConnection: connections.toString(),
    });
  }

  showOptions = () => {
    if (!this.state.loading) {
      return (
        <Fragment>
          <Divider />
          <h3>
            File Details:
          </h3>
          <Row>
            <Col span={7}>
              <p>
                Name: {this.state.name}
              </p>
            </Col>
            <Col span={1} />
            <Col span={7}>
              <p>
                File Size: {pretty(parseInt(this.state.details.totalLength, 10))}
              </p>
            </Col>
            <Col span={1} />
            <Col span={7}>
              <p>
                Category: {this.state.category}
              </p>
            </Col>
          </Row>
          <Divider />
          <Row>
            <h3>
              Advanced Options:
            </h3>
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
          <br />
          <Row>
            <Col span={10}>
              <p>
                Connections:
              </p>
              <InputNumber
                min={1}
                max={16}
                defaultValue={16}
                onChange={this.onChangeConnection}
              />
            </Col>
            <Col span={2} />
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
              ref={this.urlRef}
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
