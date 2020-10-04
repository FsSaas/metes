import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Select, message } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.scss';

const { TabPane } = Tabs;

const layout = {
  'labelCol': { 'offset': 1, 'span': 8 },
  'wrapperCol': { 'offset': 1, 'span': 22 },
};
const tailLayout = {
  'wrapperCol': { 'offset': 1, 'span': 23 },
};

const Login = props => {
  let { metadata, access, links = {} } = props;
  let { home } = links;

  let [otherFields, setOtherFields] = useState([]);

  const onFinish = data => {
    localStorage.setItem('Authorization', `Bearer ${data.token}`);
    home.goto();
    // let res = await metadata.signin(data);
    // 有 token 标识登录成功
    // if (res && res[access]) {
    //   localStorage.setItem(access, res[access]);
    //   localStorage.setItem('username', res[access].slice(0, 5));
    //   home.goto();
    // } else {
    //   message.error('登录异常');
    // }
  }

  /**
   * 切换登录模式
   * @param {*} key 
   */
  const onMethodClickHandler = key => {
    let otherFields;
    if (key == 'username') {
      otherFields = [{
        'name': 'username',
        'label': 'Username',
      }, {
        'name': 'password',
        'label': 'Password',
        'render': 'password'
      }];
    } else if (key == 'token') {
      otherFields = [{
        'name': 'token',
        'label': 'Token',
      }];
    }
    setOtherFields(otherFields);
  }

  return (
    <div key="content" className={styles.form}>
      <Tabs defaultActiveKey="token">
        <TabPane tab="Token" key="token">
          <Form
            {...layout}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              label="Token"
              name="token"
              rules={[{ 'required': true, 'message': '必填!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Other" key="other" disabled>
          <Form
            {...layout}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              label="Metod"
              name="method"
              rules={[{ 'required': true, 'message': 'Metod必填!' }]}
            >
              <Select onChange={onMethodClickHandler}>
                <Select.Option value="token">Token</Select.Option>
                <Select.Option value="username">Username</Select.Option>
              </Select>
            </Form.Item>
            {otherFields.map(it => {
              return <Form.Item
                label={it.label}
                name={it.name}
                rules={[{ 'required': true, 'message': `${it.label}必填!` }]}
              >
                {it.render == 'password' ?
                  <Input.Password />
                  : <Input />}
              </Form.Item>
            })}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

Login.propTypes = {
  /**
   * 数据源
   */
  'metadata': PropTypes.shape({
    'signin': PropTypes.object,
  }),
  /**
   * Token
   */
  'accessToken': PropTypes.string,
  /**
   * 相关页面
   */
  'links': PropTypes.shape({
    /**
     * 首页
     */
    'home': PropTypes.string
  }),
};

export default Login;
