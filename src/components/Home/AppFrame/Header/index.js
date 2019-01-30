import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import { connect } from 'react-redux';
import changePage from 'Root/actions/changePage';

const {
  Header,
} = Layout;
const {
  Item,
  SubMenu,
} = Menu;

const click = (e) => {
  changePage(e.key);
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
    </Menu>
  </Header>
);

export default connect(state => ({
  activeMenu: state.activeMenu,
}))(Head);
