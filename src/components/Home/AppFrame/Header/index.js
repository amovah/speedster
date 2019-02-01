import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { connect } from 'react-redux';
import changePage from 'Root/helpers/changePage';
import shutdown from 'Root/helpers/shutdown';
import pauseAll from 'Root/actions/downloads/pauseAll';
import resumeAll from 'Root/actions/downloads/resumeAll';

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
      shutdown();
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
      <Item key="shutdown">
        Shutdown Speedster
      </Item>
    </Menu>
  </Header>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Head);
