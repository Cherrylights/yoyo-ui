import React, { useState } from 'react';
import classnames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';

type AlertVariant = 'success' | 'default' | 'danger' | 'warning';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  className?: string;
  closable?: boolean;
  icon?: IconProp;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    variant,
    className,
    title,
    message,
    closable,
    onClose,
    icon,
    ...restProps
  } = props;
  const classes = classnames('alert', className, {
    [`alert-${variant}`]: variant,
  });
  const [close, setClose] = useState(false);
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setClose(true);
  };

  if (!close) {
    return (
      <div className={classes} {...restProps}>
        {icon && <Icon icon={icon} className="alert-icon" />}
        {title && <h4 className="alert-title">{title}</h4>}
        <div className="alert-message">{message}</div>
        {closable && (
          <span className="alert-close" onClick={handleClose}>
            Close
          </span>
        )}
      </div>
    );
  } else {
    return null;
  }
};

Alert.defaultProps = {
  variant: 'default',
  closable: true,
};

export default Alert;
