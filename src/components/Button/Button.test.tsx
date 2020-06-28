import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  variant: 'primary',
  size: 'large',
  className: 'fancy',
};

const linkProps: ButtonProps = {
  variant: 'link',
  href: 'https://www.google.com',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('Test Button component', () => {
  test('Should render the default button', () => {
    const wrapper = render(<Button {...defaultProps}>Hello</Button>);
    const element = wrapper.getByText('Hello') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass('button button-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  test('Should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Hello</Button>);
    const element = wrapper.getByText('Hello');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('button button-primary button-large fancy');
  });
  test('Should render a link when variant equals to link and href is provided', () => {
    const wrapper = render(<Button {...linkProps}>Hello</Button>);
    const element = wrapper.getByText('Hello');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('button button-link');
  });
  test('Should render a disabled button when disabled is set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Hello</Button>);
    const element = wrapper.getByText('Hello') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBe(true);
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
