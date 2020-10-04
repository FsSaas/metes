import React from 'react';
import { Form, Dropdown, Menu, Input, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.scss';

export default props => {

  let { search } = props;

  const onSearchKeyClickHandler = data => {
  }

  const menu = (
    <Menu className={styles['table__dropdown-layer']}>
      <Menu.Item onClick={onSearchKeyClickHandler}>
        <span> 男 </span>
      </Menu.Item>
      <Menu.Item>
        <span> 女 </span>
      </Menu.Item>
    </Menu>
  );

  return <div className={styles['table__search-form']}>
    <Form
      layout={'inline'}
      initialValues={{}}
    >
      <Form.Item name="a">
        <Dropdown overlay={menu}>
          <span className={styles['search-btn']} onClick={e => e.preventDefault()}>
            性别 <DownOutlined />
          </span>
        </Dropdown>
      </Form.Item>
    </Form>
  </div>
}
