import React from 'react';
import classnames from 'classnames';

export type ButtonSize = 'large' | 'small';

export type ButtonVariant = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps;
// Create a intersection Type and constructs it with all properties set to optional.
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, size, variant, href, className, ...restProps } = props;
  const classes = classnames('button', className, {
    [`button-${variant}`]: variant,
    [`button-${size}`]: size,
    disabled: variant === 'link' && disabled,
  });

  if (variant === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {props.children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  variant: 'default',
};

export default Button;
