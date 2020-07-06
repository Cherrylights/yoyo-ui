import React from 'react';
import Alert from './Alert';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Alert',
  component: Alert,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = { padding: '20px 40px' };

export const DefaultAlert = () => (
  <div style={style}>
    <Alert message="This is a default alert." />
  </div>
);

export const AlertWithIcon = () => (
  <div style={style}>
    <Alert message="This is an alert." icon="info-circle" />
  </div>
);

export const AlertVariant = () => (
  <div style={style}>
    <Alert message="Success Alert" variant="success" />
    <Alert message="Danger Alert" variant="danger" />
    <Alert message="Warning Alert" variant="warning" />
    <Alert message="Default Alert" variant="default" />
  </div>
);

export const ClosableAlert = () => (
  <div style={style}>
    <Alert
      message="This is an alert"
      onClose={action('Close alert.')}
      closable={false}
    />
    <Alert message="This is an alert" onClose={action('Close alert.')} />
  </div>
);

export const AlertWithTitle = () => (
  <div style={style}>
    <Alert title="Title" message="This is the alert content." />
  </div>
);
