import React from 'react';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Menu
        onSelect={(index) => {
          console.log(index);
        }}
        mode="vertical"
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
    </div>
  );
}

export default App;
