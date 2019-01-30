import React from 'react';
import {
  Layout,
  Menu,
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import changePage from 'Root/helpers/changePage';

const {
  Sider,
} = Layout;
const {
  SubMenu,
} = Menu;

const click = (e) => {
  changePage(e.key);
};

const Sidebar = props => (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      selectedKeys={[props.activeMenu]}
      defaultOpenKeys={['downloads']}
      style={{ height: '100%', borderRight: 0 }}
      onClick={click}
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
        <Menu.Item key="/all">All Downloads</Menu.Item>
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

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Sidebar);
