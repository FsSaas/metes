import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.scss';
import {
  DownOutlined
} from '@ant-design/icons';

const getHashQuery = (e, it) => {
  let hashQuery = '';
  let hash = location.hash.split('?');
  if (hash.length > 1) {
    hashQuery = hash[1];
  }
  return hashQuery;
}

const MetaLayout = props => {
  let {
    'nav': navItems = [],
    links = {},     // 相关跳转链接
    logoSrc,
    contentBox = {},
    activeNav,
    activeMenu,
    attachQueries   // 追加URL参数
  } = props;

  let {
    padding
  } = contentBox;

  const getItemByKey = (items = navItems, key) => {
    if (!items.length) return null;
    if (key == undefined) return items[0];
    let [nav] = items.filter(it => it.key == key);
    return nav;
  }

  let [username, setUsername] = useState();

  let nav = getItemByKey(navItems, activeNav);
  let leftMenuItems = (nav && nav.menus) || [];

  useEffect(() => {
    let username = localStorage.getItem('username');
    if (username) {
      setUsername(username);
    }
  }, []);

  const onNavClickHandler = (e, it) => {
    if (attachQueries) {
      let hashQuery = getHashQuery();
      links.go(`${it.path}?${hashQuery}`);
    } else {
      links.go(it.path);
    }
  }

  const renderContent = () => {
    let children = props.children || [];
    if (Object.prototype.toString.call(children) != '[object Array]') children = [children];
    let cmps = children.filter(it => {
      if (it.props.slot == 'content') return it;
    });
    return cmps;
  }

  const onLogoutClickHandler = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('username');
    setUsername(undefined);
    links.login.goto();
  }

  // 根据是否有左侧菜单控制布局
  let menuSpan = 3;
  let contentSpan = 21;
  if (!leftMenuItems.length) {
    menuSpan = 0;
    contentSpan = 24;
  }

  // 自定义内容区域样式
  const contentStyle = {};
  if (padding) {
    contentStyle['padding'] = padding;
  }

  // 禁用状态下，不显示左侧导航
  let content;
  if (leftMenuItems.length) {
    content = <>
      <Col span={menuSpan}>
        <Menu
          mode="inline"
          selectedKeys={[activeMenu]}
          inlineCollapsed={false}
        >
          {leftMenuItems.map(it =>
            <Menu.Item key={it.key} onClick={e => onNavClickHandler(e, it)}>{it.label}</Menu.Item>
          )}
        </Menu>
      </Col>
      <Col span={contentSpan}>
        <div className={styles.layout__content} style={contentStyle}>
          {renderContent()}
        </div>
      </Col>
    </>;
  } else {
    content = <>
      <Col span={24}>
        <div className={styles.layout__content} style={contentStyle}>
          {renderContent()}
        </div>
      </Col>
    </>;
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={onLogoutClickHandler}>退出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row>
        <Col span={3} className={styles['layout__logo-col']}>
          <div className={styles.layout__logo}>
            <img src={logoSrc} />
          </div>
        </Col>
        <Col span={18}>
          <div className={styles['layout__nav-col']}>
            <Menu selectedKeys={[activeNav]} mode="horizontal" theme="dark">
              {navItems.map(it =>
                <Menu.Item key={it.key} value={it.path} onClick={e => onNavClickHandler(e, it)}>{it.label}</Menu.Item>
              )}
            </Menu>
          </div>
        </Col>
        <Col span={3} className={styles['layout__user-col']}>
          <div className={styles.layout__user}>
            <div className={styles['user-wrapper']}>
              <div className={styles.user}>
                {username ?
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {username} <DownOutlined />
                    </a>
                  </Dropdown>
                  : null}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {content}
      </Row>
    </div>
  )
}

MetaLayout.propTypes = {
  /**
   * 导航数据
   */
  'nav': PropTypes.object,
  /**
   * 相关页面
   */
  'links': PropTypes.shape({
    /**
     * 登录页面
     */
    'login': PropTypes.string
  }),
  /**
   * LOGO链接
   */
  'logoSrc': PropTypes.string,
  /**
   * 激活导航
   */
  'activeNav': PropTypes.string,
  /**
   * 激活菜单
   */
  'activeMenu': PropTypes.string,
  /**
   * 追加参数
   */
  'attachQueries': PropTypes.bool,
  /**
   * 内容区域
   */
  'contentBox': PropTypes.shape({
    'padding': PropTypes.number
  }),
  /**
   * 布局区域
   */
  'slots': PropTypes.oneOf(['content'])
};

export default MetaLayout;
