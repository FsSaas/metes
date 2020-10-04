import React from 'react';
import LayoutLogin from '../src/layout-login/index';
import FormLogin from '../src/form-login';

export default {
  'title': 'Example/LayoutLogin',
  'component': LayoutLogin,
};

const Template = (args) => <LayoutLogin {...args}>
  <FormLogin />
</LayoutLogin>;

export const Primary = Template.bind({});
Primary.args = {
}
