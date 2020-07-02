import React from "react";
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss'
addDecorator(withInfo);
addDecorator(storyFn => <div style={{
  padding: "10px 30px"
}}>{storyFn()}</div>);

