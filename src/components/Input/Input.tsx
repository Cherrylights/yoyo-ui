import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';

type InputSize = 'large' | 'small';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string;
  /** Disable input*/
  disabled?: boolean;
  /** Set different sizes */
  size?: InputSize;
  /** Set icon for input */
  icon?: IconProp;
  /** Prepend a string or a React element for input */
  prepend?: string | React.ReactElement;
  /** Append a string or a React element for input */
  append?: string | React.ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ###### Input let users enter and edit text.
 * ~~~js
 * import { Input } from 'yoyo-ui'
 * ~~~
 * Support all HTML Input attributes
 */

const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    style,
    children,
    ...restProps
  } = props;

  const classes = classnames('input-wrapper', className, {
    disabled: disabled,
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  // Issue 1: value default state is null or undefined
  // Issue 2: component has both value and default value

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      value = '';
    }
    return value;
  };

  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps}>
        {children}
      </input>
      {append && <div className="input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
