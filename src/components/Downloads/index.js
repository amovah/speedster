import React, { Component } from 'react';
import {
  Table,
  Button,
} from 'antd';
import changePage from 'Root/helpers/changePage';
import moveToQueue from 'Root/actions/downloads/moveToQueue';
import removeFromQueue from 'Root/actions/downloads/removeFromQueue';
import removeDownload from 'Root/actions/downloads/remove';
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
      removeDownload(id);
    }
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
          if (record.queue) {
            return (
              <a
                onClick={() => removeFromQueue(record.key)}
                disabled={record.downloadStatus === 'completed'}
              >
                Remove From Queue
              </a>
            );
          }

          return (
            <a
              onClick={() => moveToQueue(record.key)}
              disabled={record.status === 'completed'}
            >
              Move To Queue
            </a>
          );
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

    const hasSelected = this.state.selectedRowKeys.length > 0;

    return (
      <div>
        <div className={styles.removeButton}>
          <span style={{ marginRight: 6 }}>
            {hasSelected ? `Selected ${this.state.selectedRowKeys.length} items` : ''}
          </span>
          <Button
            type="danger"
            disabled={!hasSelected}
            onClick={this.removeSelected}
          >
            Remove
          </Button>
        </div>
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
      </div>
    );
  }
}
