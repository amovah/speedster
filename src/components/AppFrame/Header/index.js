import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { useSelector } from 'react-redux';
import history from 'Root/history';
import pauseAll from 'Root/actions/downloads/pause/all';
import resumeAll from 'Root/actions/downloads/resume/all';
import resumeQueue from 'Root/actions/queue/resumeList';
import pauseQueue from 'Root/actions/queue/pauseList';
import { routes } from 'Root/routes';

const {
  Header,
} = Layout;
const {
  Item,
  SubMenu,
} = Menu;

const click = (e) => {
  switch (e.key) {
    case 'shutdown': {
      break;
    }

    case 'pause-all': {
      pauseAll();
      break;
    }

    case 'resume-all': {
      resumeAll();
      break;
    }

    case 'pause-queue': {
      pauseQueue();
      break;
    }

    case 'resume-queue': {
      resumeQueue();
      break;
    }

    default: {
      history.push(e.key);
    }
  }
};

const Head = () => {
  const activeMenu = useSelector(state => state.activeMenu);

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        onClick={click}
        selectedKeys={[activeMenu]}
      >
        <SubMenu key="downloads" title="Downloads">
          <Item key={routes.DOWNLOAD_PAGE}>
            Add URL
          </Item>
          <Item key="pause-all">
            Pause All
          </Item>
          <Item key="resume-all">
            Resume All
          </Item>
        </SubMenu>
        <SubMenu title="Queue" key="queue">
          <Item key={routes.SCHEDULE_SETTINGS}>
            Schedule
          </Item>
          <Item key="resume-queue">
            Download Queue
          </Item>
          <Item key="pause-queue">
            Pause Queue
          </Item>
        </SubMenu>
        <Item key={routes.SETTINGS}>
          Settings
        </Item>
      </Menu>
    </Header>
  );
};

export default Head;
