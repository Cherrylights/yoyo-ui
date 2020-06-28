import React, { useState } from 'react';
import classnames from 'classnames';
import { IMenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectIndex: string) => void;

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: SelectCallback;
}

export const MenuContext = React.createContext<IMenuContext>({
  index: '0',
});

const Menu: React.FC<IMenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classnames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  const handleSelect = (index: string) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    mode,
    onSelect: handleSelect,
  };

  const renderChildren = () => {
    // Only render MenuItem components as children
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem or a SubMenu component.'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
};

export default Menu;
