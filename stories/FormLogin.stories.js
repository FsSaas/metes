import React from 'react';
import 'antd/dist/antd.css';
import Login from '../src/form-login/index';

export default {
  'title': 'Example/Login',
  'component': Login,
};

const Template = (args) => <div style={{ 'height': '300px' }}>
  <Login {...args} />
</div>;

export const Primary = Template.bind({});
Primary.args = {
  'meta': {
    'signin': 'http://../submit',
  },
  'accessToken': 'ACCESSTOKEN',
  'links': {
    'home': {}
  }
}

export const NoArgs = Template.bind({});
Primary.args = {
}
