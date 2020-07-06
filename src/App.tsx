import React from 'react';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon/Icon';
import Input from './components/Input/Input';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Icon theme="success" icon="arrow-down" />
      <Menu
        // mode="vertical"
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <MenuItem>Active</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
        <SubMenu title="Sub Menu">
          <MenuItem>Child 1</MenuItem>
          <MenuItem>Child 2</MenuItem>
          <MenuItem>Child 3</MenuItem>
        </SubMenu>
        <MenuItem>Sonos</MenuItem>
      </Menu>
      <Input
        onChange={(e) => {
          console.log(e.target.value);
        }}
      ></Input>
    </div>
  );
}

export default App;
