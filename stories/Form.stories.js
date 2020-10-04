import React from 'react';
import 'antd/dist/antd.css';
import Form from '../src/form/index';

export default {
  'title': 'Example/Form',
  'component': Form,
};

const Template = (args) => <Form {...args} />;

const metadata = {
  'save': () => {},
  'fields': () => {
    return fetch('http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys/fields')
      .then(res => res.json())
  },
  'data': () => {}
}

export const Primary = Template.bind({});
Primary.args = {
  metadata
}

export const WithHeader = Template.bind({});
WithHeader.args = {
  'header': {
    'title': '详情',
    'btnText': '保存',
    'hasBack': true,
    'showBtn': true,
  },
  'status': 'edit',
  metadata
}

export const NoArgs = Template.bind({});
NoArgs.args = {
}
