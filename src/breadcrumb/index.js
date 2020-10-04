import React from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import './index.scss';

const getHashQuery = (e, it) => {
  let hashQuery = '';
  let hash = location.hash.split('?');
  if (hash.length > 1) {
    hashQuery = hash[1];
  }
  return hashQuery;
}

const go = (history, path) => {
  history.push(path);
}

const MetaBreadcrumb = props => {
  let {
    items = [],
    separator = '/',
    links = {},
    attachQueries,   // 追加URL参数
    type = 'goBack'  //  跳转类型 1.goBack 2.link 
  } = props;
  let { history } = links;

  /**
   * 根据 index 和 items.length 获取回退页面下标
   */
  const getBackPageIndex = index => {
    let j = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      if (index == i) break;
      j++;
    }
    return j;
  }

  /**
   * 调用 history API 实现页面跳转/回退
   * @param {*} path 
   * @param {点击事件触发的 BreadItem 下标} index 
   */
  const go = (path, index) => {
    if ((index + 1) == items.length) return;
    if (type == 'goBack') {
      let pageIndex = -1 * getBackPageIndex(index);
      history.go(pageIndex);
    } else {
      history.push(path);
    }
  }

  const onItemClickHandler = (e, it, index) => {
    if (attachQueries) {
      let hashQuery = getHashQuery();
      go(`${it.path}?${hashQuery}`, index);
    } else {
      go(it.path, index);
    }
  }

  return (<>
    <Breadcrumb separator={separator}>
      {items.map((it, index) => {
        return <Breadcrumb.Item key={it.name}>
          <a onClick={e => onItemClickHandler(e, it, index)}>{it.label}</a>
        </Breadcrumb.Item>
      })}
    </Breadcrumb>
  </>);
};

MetaBreadcrumb.propTypes = {
  /**
   * 内容
   */
  'items': PropTypes.object,
  /**
   * 分隔符
   */
  'separator': PropTypes.string,
  /**
   * 追加参数
   */
  'attachQueries': PropTypes.bool,
  /**
   * 相关页面
   */
  'links': PropTypes.shape({
    'history': PropTypes.object
  }),
  /**
   * 跳转类型
   */
  'type': PropTypes.oneOf(['goBack', 'link'])
}

export default MetaBreadcrumb;
