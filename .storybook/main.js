const path = require('path')
const VirtualModulesPlugin = require('webpack-virtual-modules');

module.exports = {
  "stories": [
    "../*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      'test': /\.scss$/,
      'use': [
        'style-loader',
        {
          'loader': 'css-loader',
          'options': {
            'modules': {
              'localIdentName': '[local]--[hash:base64:5]'
            }
          }
        },
        'sass-loader'
      ],
      'include': path.resolve(__dirname, '../'),
    });

    // add externals for react
    config.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'antd': 'antd'
    };
    config.plugins.push(
      new VirtualModulesPlugin({
        'node_modules/docgen.js': `module.exports = { };`
      })
    );

    // Return the altered config
    return config;
  },

  managerWebpack: async (config, { configType }) => {

    config.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'antd': 'antd'
    };
    config.plugins.push(
      new VirtualModulesPlugin({
        'node_modules/docgen.js': `module.exports = { };`
      })
    );

    return config;
  }
}