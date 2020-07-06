import React from 'react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = {
  padding: '20px 40px',
  display: 'flex',
  flexDirection: 'column',
};

export const defaultInput = () => (
  <div style={style}>
    <Input placeholder="Enter something here" />
  </div>
);

export const DisabledInput = () => (
  <div style={style}>
    <Input disabled placeholder="Disabled input" />
  </div>
);

export const InputSize = () => (
  <div style={style}>
    <Input size="large" placeholder="Large size" />
    <Input size="small" placeholder="Small size" />
  </div>
);

export const InputWithIcon = () => (
  <div style={style}>
    <Input
      style={{ width: '300px' }}
      icon="search"
      placeholder="Input with icon"
    />
  </div>
);

export const InputPrepend = () => (
  <div style={style}>
    <Input prepend="HTTPS://" />
  </div>
);

export const InputAppend = () => (
  <div style={style}>
    <Input append=".com" />
  </div>
);
