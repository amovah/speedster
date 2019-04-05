import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { connect } from 'react-redux';
import history from 'Root/history';

const {
  Sider,
} = Layout;
const {
  SubMenu,
} = Menu;

const click = (e) => {
  history.push(e.key);
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
            Downloads
          </span>
        )}
      >
        <Menu.Item key="/downloads/all">All Downloads</Menu.Item>
        <Menu.Item key="/downloads/completeds">Completed Downloads</Menu.Item>
        <Menu.Item key="/downloads/incompletes">Incomplete Downloads</Menu.Item>
        <Menu.Item key="/downloads/compresseds">Compresseds</Menu.Item>
        <Menu.Item key="/downloads/pictures">Pictures</Menu.Item>
        <Menu.Item key="/downloads/musics">Musics</Menu.Item>
        <Menu.Item key="/downloads/videos">Videos</Menu.Item>
        <Menu.Item key="/downloads/others">Others</Menu.Item>
      </SubMenu>

      <SubMenu
        key="queue"
        title={(
          <span>
            Queue
          </span>
        )}
      >
        <Menu.Item key="/queue/all">All Downloads</Menu.Item>
        <Menu.Item key="/queue/completeds">Completed Downloads</Menu.Item>
        <Menu.Item key="/queue/incompletes">Incomplete Downloads</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Sidebar);
