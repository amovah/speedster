import React from 'react';
import {
  Layout,
  Menu,
  Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import changePage from 'Root/helpers/changePage';
import shutdown from 'Root/helpers/shutdown';
import pauseAll from 'Root/actions/downloads/pauseAll';
import resumeAll from 'Root/actions/downloads/resumeAll';
import resumeQueue from 'Root/actions/queue/resumeList';
import pauseQueue from 'Root/actions/queue/pauseList';

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
      changePage(e.key);
    }
  }
};

const Head = props => (
  <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
      onClick={click}
      selectedKeys={[props.activeMenu]}
    >
      <SubMenu key="downloads" title="Downloads">
        <Item key="/add-url">
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
        <Item key="/schedule">
          Schedule
        </Item>
        <Item key="resume-queue">
          Download Queue
        </Item>
        <Item key="pause-queue">
          Pause Queue
        </Item>
      </SubMenu>
      <Item key="shutdown">
        <Popconfirm title="Are you sure?" onConfirm={shutdown}>
          Shutdown Speedster
        </Popconfirm>
      </Item>
    </Menu>
  </Header>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Head);
