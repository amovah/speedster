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
        <Menu.Item key="/completeds">Completed Downloads</Menu.Item>
        <Menu.Item key="/incompletes">Incomplete Downloads</Menu.Item>
        <Menu.Item key="/category/compresseds">Compresseds</Menu.Item>
        <Menu.Item key="/category/pictures">Pictures</Menu.Item>
        <Menu.Item key="/category/musics">Musics</Menu.Item>
        <Menu.Item key="/category/videos">Videos</Menu.Item>
        <Menu.Item key="/category/others">Others</Menu.Item>
      </SubMenu>

    </Menu>
  </Sider>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Sidebar);
