import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { useSelector } from 'react-redux';
import history from 'Root/history';
import { routes } from 'Root/routes';

const {
  Sider,
} = Layout;
const {
  SubMenu,
} = Menu;

const click = (e) => {
  history.push(e.key);
};

const Sidebar = () => {
  const activeMenu = useSelector(state => state.activeMenu);
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
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
          <Menu.Item key={routes.allDownloads.ALL}>All Downloads</Menu.Item>
          <Menu.Item key={routes.allDownloads.FINISHED}>Completed Downloads</Menu.Item>
          <Menu.Item key={routes.allDownloads.UNFINISHED}>Incomplete Downloads</Menu.Item>
          <Menu.Item key={routes.allDownloads.COMPRESSED}>Compresseds</Menu.Item>
          <Menu.Item key={routes.allDownloads.PICTURE}>Pictures</Menu.Item>
          <Menu.Item key={routes.allDownloads.MUSIC}>Musics</Menu.Item>
          <Menu.Item key={routes.allDownloads.VIDEO}>Videos</Menu.Item>
          <Menu.Item key={routes.allDownloads.OTHER}>Others</Menu.Item>
        </SubMenu>

        <SubMenu
          key="queue"
          title={(
            <span>
              Queue
            </span>
        )}
        >
          <Menu.Item key={routes.ALL}>All Downloads</Menu.Item>
          <Menu.Item key={routes.queue.FINISHED}>Completed Downloads</Menu.Item>
          <Menu.Item key={routes.queue.UNFINISHED}>Incomplete Downloads</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
