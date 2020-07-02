import React, { useContext, useState } from 'react';
import { MenuContext } from './Menu';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { IMenuItemProps } from './MenuItem';
import Icon from '../Icon/Icon';

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const classes = classnames('menu-item submenu-item', className, {
    'menu-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (event: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    event.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvent =
    context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvent =
    context.mode === 'vertical'
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        };
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component.'
        );
      }
    });
    return (
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul
          className={classnames('submenu', {
            'menu-opened': menuOpen,
          })}
        >
          {childrenComponent}
        </ul>
      </CSSTransition>
    );
  };

  return (
    <li className={classes} key={index} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
