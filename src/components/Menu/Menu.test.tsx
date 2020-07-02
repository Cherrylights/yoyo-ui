import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';
import Menu, { IMenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  mode: 'vertical',
};

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>Active</MenuItem>
      <MenuItem disabled>Disabled</MenuItem>
      <MenuItem>Sonos</MenuItem>
      <SubMenu title="Dropdown">
        <MenuItem>Drop 1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('Active');
    disabledElement = wrapper.getByText('Disabled');
  });
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item menu-active');
    expect(disabledElement).toHaveClass('menu-item menu-disabled');
  });

  test('click items should change active and call the right callback', () => {
    const thirdElement = wrapper.getByText('Sonos');
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('menu-item menu-active');
    expect(activeElement).not.toHaveClass('menu-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('menu-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  test('render vertical mode when mode is set to vertical', () => {
    cleanup();
    const verticalWrapper = render(generateMenu(testVerticalProps));
    const menuElement = verticalWrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  test('should show dropdown items when hover on submenu', async () => {
    expect(wrapper.queryByText('Drop 1')).not.toBeInTheDocument();
    const dropdownElement = wrapper.getByText('Dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('Drop 1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('Drop 1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('Drop 1')).not.toBeVisible();
    });
  });
});
