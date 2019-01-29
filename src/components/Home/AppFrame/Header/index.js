import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';

const {
  Header,
} = Layout;
const {
  Item,
  SubMenu,
} = Menu;

const click = (e) => {
  console.log(e);
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
        <Item key="add-url">
          Add URL
        </Item>
      </SubMenu>
    </Menu>
  </Header>
);
