import React from 'react';
import Icon from './Icon';

export default {
  title: 'Icon',
  component: Icon,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = { padding: '20px 40px' };

export const DefaultAlert = () => (
  <div style={style}>
    <Icon theme="primary" icon="calendar" />
    <Icon theme="success" icon="smile" />
    <Icon theme="warning" icon="exclamation-circle" />
  </div>
);
