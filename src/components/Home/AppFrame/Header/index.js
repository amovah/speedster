import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { connect } from 'react-redux';
import changePage from 'Root/helpers/changePage';
import shutdown from 'Root/helpers/shutdown';

const {
  Header,
} = Layout;
const {
  Item,
  SubMenu,
} = Menu;

const click = (e) => {
  if (!['shutdown'].includes(e.key)) {
    changePage(e.key);
    return;
  }

  if (e.key === 'shutdown') {
    shutdown();
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
      </SubMenu>
      <Item key="shutdown">
        Shutdown Application
      </Item>
    </Menu>
  </Header>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Head);
