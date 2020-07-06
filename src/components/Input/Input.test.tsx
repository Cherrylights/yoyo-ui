import React from 'react';
import Input, { InputProps } from './Input';
import { render, fireEvent } from '@testing-library/react';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  test('should render the correct Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const inputElement = wrapper.getByPlaceholderText(
      'test-input'
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input-inner');
    fireEvent.change(inputElement, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual('23');
  });

  test('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input placeholder="disabled" disabled />);
    const testElement = wrapper.getByPlaceholderText(
      'disabled'
    ) as HTMLInputElement;
    expect(testElement.disabled).toBeTruthy();
  });

  test('should render differnt input sizes on size property', () => {
    const wrapper = render(<Input {...defaultProps} size="large" />);
    const testContainer = wrapper.container.querySelector('.input-wrapper');
    expect(testContainer).toHaveClass('input-size-large');
  });

  it('should render prepand and append element on prepand/append property', () => {
    const wrapper = render(
      <Input placeholder="pend" prepend="https://" append=".com" />
    );
    const testContainer = wrapper.container.querySelector('.input-wrapper');
    expect(testContainer).toHaveClass(
      'input-group input-group-append input-group-prepend'
    );
    expect(wrapper.queryByText('https://')).toBeInTheDocument();
    expect(wrapper.queryByText('.com')).toBeInTheDocument();
  });
});
