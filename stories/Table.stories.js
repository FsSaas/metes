import React from 'react';
import 'antd/dist/antd.css';
import Table from '../src/table/index';

export default {
  'title': 'Example/Table',
  'component': Table,
};

const links = {
  'detail': (...args) => {
    console.log(args)
  }
}

const metadata = {
  'findOne': (data) => {
    console.log(data, 'findOne Args')
    return fetch(`http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys/${data.id}`)
      .then(res => res.json())
      .then(res => {
        console.log('findOne', res);
        return res;
      })
  },
  'list': (args) => {
    console.log(args, 'list')
    return fetch('http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys')
      .then(res => res.json())
  },
  'new': (...args) => {
    console.log(args)
  },
  'update': (...args) => {
    console.log(args)
  },
  'delete': (...args) => {
    console.log(args)
  },
  'columns': () => {
    return fetch('http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys/columns')
      .then(res => res.json())
  },
  'fields': () => {
    return fetch('http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys/fields')
      .then(res => res.json())
  }
}

const metadata_noitems = Object.assign({}, metadata);
metadata_noitems.list = (args) => {
  console.log(args, 'list')
  return fetch('http://easymock.onelaas.com/mock/5f6dd029fca2eb0020116ac0/keys')
    .then(res => res.json())
    .then(res => {
      return {
        items: [],
        total: 0,
      }
    })
}

const Template = (args) => <Table {...args} links={links} />;

export const Primary = Template.bind({});
Primary.args = {
  'metadata': metadata,
  'pageStart': -1,
  'header': {
    'showBtn': true,
    'btnText': '新增',
    'title': 'Entity'
  },
  'size': 'small',
}

export const NoArgs = Template.bind({});
NoArgs.args = {
}

export const JustMeta = Template.bind({});
JustMeta.args = {
  'metadata': metadata,
}

export const NoData = Template.bind({});
NoData.args = {
  'metadata': metadata_noitems,
}

export const AttachUrlParams = Template.bind({});
AttachUrlParams.args = {
  'attachQueries': true,
  'metadata': metadata,
}

export const GoWithFields = Template.bind({});
GoWithFields.args = {
  'goWithFields': ['deletionAllow', 'status'],
  'metadata': metadata,
}