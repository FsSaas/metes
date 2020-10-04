import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Form, message, Space, Popconfirm, Spin, Empty } from 'antd';
import qs from 'qs';
import EditForm from './edit-form';
import SearchForm from './search-form';
import PageHeader from './header-page';
import styles from './index.scss';

const MetaTable = props => {
  let {
    links = {},
    metadata,
    size,
    header,
    search,
    detailParamKey,
    pageStart = 0,
    attachQueries,
    goWithFields = []
  } = props;

  if (!metadata) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  let {
    hasBack,
    showBtn,
    title,
    btnText,
  } = header || {};

  let [form] = Form.useForm();
  let [dataSource, setDataSource] = useState();
  let [columns, setColumns] = useState();
  let [modalVisible, setModalVisible] = useState(false);
  let [editorData, setEditorData] = useState();
  let [totalSize, setTotalSize] = useState(0);
  let [current, setCurrent] = useState(1);
  let [pageSize, setPageSize] = useState(10);

  const getData = async () => {
    let ds = await metadata.list({
      'current': current + parseInt(pageStart), // 外部可以控制表格翻页起始位置（第一页是0还是1）
      pageSize
    });
    setDataSource(ds.items);
    setTotalSize(ds.total);
  }

  useEffect(() => {
    const makeRequest = async () => {
      let cs = await metadata.columns();
      setColumns(cs);
    }
    makeRequest();
  }, []);

  useEffect(() => {
    getData()
  }, [current, pageSize]);

  const onOkHandler = e => {
    form.validateFields().then(async data => {
      await metadata.update(data);
      message.success('保存成功');
      setModalVisible(false);
      getData();
    })
  }

  /**
   * 进入详情页
   * @param {*} e 
   * @param {*} text 
   * @param {*} record 
   */
  const onDetailClickHandler = (e, text, record) => {
    let key = detailParamKey || 'id';
    
    // 跳转页面时，带有页面当前已有参数
    let query = {};
    if (attachQueries) {
      let hashs = (location.hash || '').split('?');
      let queryString = '';
      if (hashs.length > 1) {
        queryString = hashs[1];
      }
      query = qs.parse(queryString);
    }
    // 跳转页面时，带有字段
    if (goWithFields.length) {
      goWithFields.forEach(it => query[it] = record[it]);
    }

    links.detail.goto(
      Object.assign({}, { [key]: text, }, query)
    );
  }

  const onEditClickHandler = (e, record) => {
    setEditorData(record);
    setModalVisible(true);
  }

  const onCancel = () => {
    setModalVisible(false);
  }

  const onDeleteClickHandler = async (e, record) => {
    await metadata.delete(record);
    message.success('删除成功');
    getData();
  }

  const onCreatedHandler = () => {
    getData()
  }

  let cols;
  if (columns) {
    cols = columns.map(it => {
      let { title, key, dataIndex, render } = it;
      let col = { title, key, dataIndex };

      if (!render) return col;

      let actions = [];
      let detailCol = (text, record) => <a key="detail" onClick={e => onDetailClickHandler(e, text, record)}>{text}</a>;
      let editCol = (text, record) => <a key="edit" onClick={e => onEditClickHandler(e, record)}>编辑</a>;
      let deleteCol = (text, record) => {
        return <Popconfirm key="delete" title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={e => onDeleteClickHandler(e, record)}>
          <a key="delete">删除</a>
        </Popconfirm>
      }
      let actionTypes = {
        'edit': editCol,
        'detail': detailCol,
        'delete': deleteCol
      }

      if (typeof render == 'string') {
        actions.push(actionTypes[render]);
      } else if (Array.isArray(render)) {
        render.forEach(r => {
          actions.push(actionTypes[r]);
        })
      }

      col.render = (text, record) => {
        return <Space size="middle" key={record.title}>
          {actions.map(it => it(text, record))}
        </Space>
      }
      return col;
    });
  }

  const onTableChangeHandler = pagination => {
    let { current, pageSize } = pagination;
    setCurrent(current);
    setPageSize(pageSize);
  }

  let Warpper;
  if (header) {
    Warpper = PageHeader;
  } else {
    Warpper = 'div';
  }

  let pagination = {
    'size': 'small',
    'total': totalSize,
  }

  return <>
    <Warpper
      title={title}
      hasBack={hasBack}
      showBtn={showBtn}
      btnText={btnText}
      metadata={metadata}
      onCreated={onCreatedHandler}
    >
      {search ? <SearchForm search={search} /> : null}
      <div className={styles.table}>
        {cols && dataSource ?
          <Table dataSource={dataSource} columns={cols} size={size} pagination={pagination} onChange={onTableChangeHandler} />
          : <Spin className={styles.spin} tip="Loading"></Spin>}
      </div>
    </Warpper>
    <Modal
      title="编辑"
      visible={modalVisible}
      okText={'保存'}
      cancelText={'取消'}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <EditForm
        labelCol={{ 'span': 5 }}
        wrapperCol={{ 'span': 16 }}
        status={'edit'}
        editorData={editorData}
        form={form}
        metadata={metadata}
      />
    </Modal>
  </>
};

MetaTable.propTypes = {
  /**
   * 相关链接
   */
  'links': PropTypes.shape({
    'detail': PropTypes.object
  }),
  /**
   * 数据源
   */
  'metadata': PropTypes.shape({
    'list': PropTypes.func,
    'update': PropTypes.func,
    'new': PropTypes.func,
    'delete': PropTypes.func,
    'findOne': PropTypes.func
  }),
  /**
   * 大小
   */
  'size': PropTypes.oneOf(['small', 'middle', 'large']),
  /**
   * 头部
   */
  'header': PropTypes.shape({
    'hasBack': PropTypes.bool,
    'showBtn': PropTypes.bool,
    'title': PropTypes.string,
    'btnText': PropTypes.string,
  }),
  /**
   * 搜索
   */
  'search': PropTypes.object,
  /**
   * 详情标识
   */
  'detailParamKey': PropTypes.string,
  /**
   * 翻页起始
   */
  'pageStart': PropTypes.number,
  /**
   * 跳转字段
   */
  'goWithFields': PropTypes.array
};

export default MetaTable;
