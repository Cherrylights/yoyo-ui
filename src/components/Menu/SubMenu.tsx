import React, { useContext, useState } from 'react';
import { MenuContext } from './Menu';
import classnames from 'classnames';
import { IMenuItemProps } from './MenuItem';

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
      <ul
        className={classnames('submenu', {
          'menu-opened': menuOpen,
        })}
      >
        {childrenComponent}
      </ul>
    );
  };

  return (
    <li className={classes} key={index} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
