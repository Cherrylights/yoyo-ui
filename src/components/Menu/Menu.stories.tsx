import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Menu',
  component: Menu,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = { padding: '20px 40px' };

export const defaultMenu = () => (
  <div style={style}>
    <Menu>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </Menu>
  </div>
);

export const menuWithSubMenu = () => (
  <div style={style}>
    <Menu onSelect={action('Hello')}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <SubMenu title="SubMenu">
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
        <MenuItem>Item 6</MenuItem>
      </SubMenu>
    </Menu>
  </div>
);
