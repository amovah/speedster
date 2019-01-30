import React, { PureComponent } from 'react';
import {
  Table,
} from 'antd';
import changePage from 'Root/helpers/changePage';

export default class extends PureComponent {
  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (text, record) => (
          <a onClick={() => changePage(`/download/${record.key}`)}>
            {text}
          </a>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
          if (text === 'downloading') {
            return 'Downloading..';
          }

          if (text === 'pause') {
            return 'Pause';
          }

          return 'Completed';
        },
      },
    ];

    const data = this.props.downloads.map(i => ({
      key: i.id,
      name: i.name,
      status: i.downloadStatus,
    }));

    return (
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        style={{
          backgroundColor: 'white',
        }}
        size="small"
      />
    );
  }
}
