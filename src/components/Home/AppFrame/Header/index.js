import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import history from 'Root/history';

const {
  Header,
} = Layout;
const {
  Item,
  SubMenu,
} = Menu;

const click = (e) => {
  history.push(e.key);
};

export default () => (
  <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
      onClick={click}
    >
      <SubMenu key="downloads" title="Downloads">
        <Item key="/add-url">
          Add URL
        </Item>
      </SubMenu>
    </Menu>
  </Header>
);
