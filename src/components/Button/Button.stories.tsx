import React from 'react';
import Button from './Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = { padding: '20px 40px' };

export const defaultButton = () => (
  <div style={style}>
    <Button onClick={action('Hello')}>Default</Button>
  </div>
);

export const ButtonSize = () => (
  <div style={style}>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
  </div>
);

export const ButtonVariant = () => (
  <div style={style}>
    <Button variant="default">Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="link" href="https://www.google.com">
      Link
    </Button>
  </div>
);
