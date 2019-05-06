import React, { Component, Fragment } from 'react';
import {
  Table,
  Button,
  Divider,
  Popconfirm,
  Card,
} from 'antd';
import { Link } from 'react-router-dom';
import singleRemove from 'Root/actions/downloads/remove/single';
import bulkRemove from 'Root/actions/downloads/remove/bulk';
import singleResume from 'Root/actions/downloads/resume/single';
import bulkResume from 'Root/actions/downloads/resume/bulk';
import singlePause from 'Root/actions/downloads/pause/single';
import bulkPause from 'Root/actions/downloads/pause/bulk';
import removeFromQueue from 'Root/actions/downloads/removeFromQueue/single';
import bulkRemoveFromQueue from 'Root/actions/downloads/removeFromQueue/bulk';
import addToQueue from 'Root/actions/downloads/addToQueue/single';
import bulkAddToQueue from 'Root/actions/downloads/addToQueue/bulk';
import styles from './index.less';

export default class extends Component {
  state = {
    selectedRowKeys: [],
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  removeSelected = () => {
    bulkRemove(this.state.selectedRowKeys);

    this.setState({
      selectedRowKeys: [],
    });
  }

  resumeSelected = () => {
    bulkResume(this.state.selectedRowKeys);
  }

  pauseSelected = () => {
    bulkPause(this.state.selectedRowKeys);
  }

  moveToQueueSelected = () => {
    bulkAddToQueue(this.state.selectedRowKeys);
  }

  removeFromQueueSelected = () => {
    bulkRemoveFromQueue(this.state.selectedRowKeys);
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

    singleRemove(id);
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
            <Link to={`/download/${record.key}`}>
              {name}
            </Link>
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
                onClick={() => singleResume(record.key)}
                disabled={record.downloadStatus === 'completed'}
                key="resume"
              >
                Resume
              </a>,
            );
          } else if (record.status === 'failed') {
            buttons.push(
              <a
                onClick={() => singleResume(record.key)}
                disabled={record.downloadStatus === 'completed'}
                key="retry"
              >
                Retry
              </a>,
            );
          } else if (record.status === 'downloading') {
            buttons.push(
              <a
                onClick={() => singlePause(record.key)}
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
                onClick={() => addToQueue(record.key)}
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
