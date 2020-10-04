import React from 'react';

import Breadcrumb from '../src/breadcrumb/index';

export default {
  'title': 'Example/Breadcrumb',
  'component': Breadcrumb,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  'links': {
    'history': {
      'go': () => {},
      'push': () => {}
    }
  },
  'type': 'goBack',
  'items': [{
    'name': 'relams',
    'label': 'Relams',
    'path': '/relams'
  }, {
    'name': 'entities',
    'label': 'Entities',
    'path': '/entities'
  }, {
    'name': 'keys',
    'label': 'Keys',
    'path': '/keys'
  }, {
    'name': 'detal',
    'label': 'Detal',
    'path': '/detal'
  }]
}

export const NoArgs = Template.bind({});
NoArgs.args = {
}
