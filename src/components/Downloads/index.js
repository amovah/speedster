import React, { Component, Fragment } from 'react';
import {
  Table,
  Button,
  Divider,
  Popconfirm,
  Card,
} from 'antd';
import changePage from 'Root/helpers/changePage';
import moveToQueue from 'Root/actions/downloads/moveToQueue';
import removeFromQueue from 'Root/actions/downloads/removeFromQueue';
import removeDownload from 'Root/actions/downloads/remove';
import resumeDownload from 'Root/actions/downloads/resume';
import pauseDownload from 'Root/actions/downloads/pause';
import styles from './index.less';

export default class extends Component {
  state = {
    selectedRowKeys: [],
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  removeSelected = () => {
    for (const id of this.state.selectedRowKeys) {
      this.removeOne(id);
    }
  }

  resumeSelected = () => {
    for (const id of this.state.selectedRowKeys) {
      resumeDownload(id);
    }
  }

  pauseSelected = () => {
    for (const id of this.state.selectedRowKeys) {
      pauseDownload(id);
    }
  }

  moveToQueueSelected = () => {
    for (const id of this.state.selectedRowKeys) {
      moveToQueue(id);
    }
  }

  removeFromQueueSelected = () => {
    for (const id of this.state.selectedRowKeys) {
      removeFromQueue(id);
    }
  }

  additionalAction = () => {
    const hasSelected = this.state.selectedRowKeys.length > 0;

    return (
      <Card>
        <div className={styles.center}>
          <p>
            Selected {this.state.selectedRowKeys.length} items
          </p>
        </div>
        <div className={styles.center}>
          <Button.Group>
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              onConfirm={this.removeSelected}
            >
              <Button
                type="danger"
                disabled={!hasSelected}
              >
                Remove
              </Button>
            </Popconfirm>
            <Button
              disabled={!hasSelected}
              onClick={this.pauseSelected}
            >
              Pause
            </Button>
            <Button
              disabled={!hasSelected}
              onClick={this.resumeSelected}
            >
              Resume
            </Button>
            <Button
              disabled={!hasSelected}
              onClick={this.moveToQueueSelected}
            >
              Move To Queue
            </Button>
            <Button
              disabled={!hasSelected}
              onClick={this.removeFromQueueSelected}
            >
              Remove From Queue
            </Button>
          </Button.Group>
        </div>
      </Card>
    );
  }

  removeOne = (id) => {
    this.setState(prev => ({
      selectedRowKeys: prev.selectedRowKeys.filter(i => i !== id),
    }));

    removeDownload(id, false);
  }

  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (text, record) => {
          let name = text;
          if (text.length > 40) {
            name = `${name.slice(0, 40)}...`;
          }

          return (
            <a onClick={() => changePage(`/download/${record.key}`)}>
              {name}
            </a>
          );
        },
      },
      {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
          if (text === 'downloading') {
            return 'Downloading..';
          }

          if (text === 'pause' || text === 'suspend') {
            return 'Pause';
          }

          if (text === 'failed') {
            return 'Failed';
          }

          return 'Completed';
        },
      },
      {
        title: 'Percent',
        key: 'percent',
        dataIndex: 'percent',
        render: text => `${text}%`,
      },
      {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'actions',
        render: (text, record) => {
          const buttons = [];

          if (['pause', 'suspend'].includes(record.status)) {
            buttons.push(
              <a
                onClick={() => resumeDownload(record.key)}
                disabled={record.downloadStatus === 'completed'}
                key="resume"
              >
                Resume
              </a>,
            );
          } else if (record.status === 'failed') {
            buttons.push(
              <a
                onClick={() => resumeDownload(record.key)}
                disabled={record.downloadStatus === 'completed'}
                key="retry"
              >
                Retry
              </a>,
            );
          } else if (record.status === 'downloading') {
            buttons.push(
              <a
                onClick={() => pauseDownload(record.key)}
                disabled={record.downloadStatus === 'completed'}
                key="pause"
              >
                Pause
              </a>,
            );
          }

          if (record.status !== 'completed') {
            buttons.push(
              <Divider type="vertical" key="2" />,
            );
          }

          buttons.push(
            <Popconfirm
              key="remove"
              title="Are you sure?"
              onConfirm={() => this.removeOne(record.key)}
              okText="Yes"
            >
              <a
                style={{ color: 'red' }}
              >
                Remove
              </a>
            </Popconfirm>,
          );

          if (record.queue && record.status !== 'completed') {
            buttons.push(
              <br key="1" />,
              <a
                onClick={() => removeFromQueue(record.key)}
                key="removeFromQueue"
              >
                Remove From Queue
              </a>,
            );
          } else if (!record.queue && record.status !== 'completed') {
            buttons.push(
              <br key="1" />,
              <a
                onClick={() => moveToQueue(record.key)}
                key="moveToQueue"
              >
                Move To Queue
              </a>,
            );
          }

          return buttons;
        },
      },
    ];

    const data = this.props.downloads.map(i => ({
      key: i.id,
      name: i.name,
      status: i.downloadStatus,
      category: i.category,
      percent: Math.floor(
        (100 * parseInt(i.completedLength, 10))
        / parseInt(i.totalLength, 10),
      ),
      queue: i.queue,
    }));

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Fragment>
        {this.additionalAction()}
        <br />
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          style={{
            backgroundColor: 'white',
          }}
          size="small"
        />
      </Fragment>
    );
  }
}
