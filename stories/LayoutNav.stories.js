import React from 'react';
import 'antd/dist/antd.css';
import LayoutNav from '../src/layout-nav/index';

export default {
  'title': 'Example/LayoutNav',
  'component': LayoutNav,
};

const Template = (args) => <LayoutNav {...args}>
  <div slot="content">我是内容</div>
</LayoutNav>;

export const Primary = Template.bind({});
Primary.args = {
  'activeNav': "a11",
  'activeMenu': "slot5",
  'logoSrc': "https://circleci.com/docs/assets/img/logos/logo-wordmark.svg",
  'nav': [{
    'key': 'a1',
    'label': '基础',
    'path': '/base',
    'menus': [{
      'key': 'slot1',
      'label': '基础',
      'path': '/base'
    }, {
      'key': 'slot2',
      'label': '基础1',
      'path': '/base1'
    }, {
      'key': 'slot3',
      'label': '基础11',
      'path': '/base111'
    }]
  }, {
    'key': 'a11',
    'label': '数据传',
    'path': '/base1',
  }, {
    'key': 'a111',
    'label': '美元',
    'path': '/base111',
    'menus': [{
      'key': 'slot5',
      'label': '欧元',
      'path': '/base'
    }, {
      'key': 'slot6',
      'label': '比特币',
      'path': '/base1'
    }]
  }]
}

export const Onemenu = Template.bind({});
Onemenu.args = {
  'activeNav': "a1",
  'activeMenu': "slot2",
  'attachQueries': true,
  'logoSrc': "https://circleci.com/docs/assets/img/logos/logo-wordmark.svg",
  'nav': [{
    'key': 'a1',
    'label': '基础',
    'path': '/base',
    'menus': [{
      'key': 'slot1',
      'label': '基础',
      'path': '/base'
    }, {
      'key': 'slot2',
      'label': '基础1',
      'path': '/base1'
    }, {
      'key': 'slot3',
      'label': '基础11',
      'path': '/base111'
    }]
  }]
}

export const Secondary = Template.bind({});
Secondary.args = {
  'disable': true,
  'logoSrc': "https://circleci.com/docs/assets/img/logos/logo-wordmark.svg",
  'contentBox': {
    'padding': 40
  },
  'nav': [{
    'key': 'a1',
    'label': '基础',
    'path': '/base',
  }, {
    'key': 'a11',
    'label': '数据传',
    'path': '/base1',
  }, {
    'key': 'a111',
    'label': '美元',
    'path': '/base111',
  }]
}

export const NoArgs = Template.bind({});
NoArgs.args = {}
