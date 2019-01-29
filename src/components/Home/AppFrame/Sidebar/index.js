import React from 'react';
import {
  Layout,
  Menu,
  Icon,
} from 'antd';

const {
  Sider,
} = Layout;
const {
  SubMenu,
} = Menu;

export default () => (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['downloads']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu
        key="downloads"
        title={(
          <span>
            <Icon type="download" />
            Downloads
          </span>
        )}
      >
        <Menu.Item key="1">All Downloads</Menu.Item>
        <Menu.Item key="2">Completed Downloads</Menu.Item>
        <Menu.Item key="3">Incomplete Downloads</Menu.Item>
        <Menu.Item key="4">Compressed</Menu.Item>
        <Menu.Item key="5">Pictures</Menu.Item>
        <Menu.Item key="6">Musics</Menu.Item>
        <Menu.Item key="7">Videos</Menu.Item>
      </SubMenu>

    </Menu>
  </Sider>
);
