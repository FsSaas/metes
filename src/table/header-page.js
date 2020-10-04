import React, { useState } from 'react';
import { Modal, Form, message, Button, PageHeader } from 'antd';
import EditForm from './edit-form';
import styles from './index.scss';

export default props => {
  let {
    metadata,
    hasBack,
    showBtn,
    title,
    btnText,
    onCreated
  } = props;

  let [form] = Form.useForm();
  let [modalVisible, setModalVisible] = useState(false);

  const onOkHandler = e => {
    form.validateFields().then(async data => {
      await metadata.new(data);
      message.success('保存成功');
      setModalVisible(false);
      onCreated();
    })
  }

  const onCancel = () => {
    setModalVisible(false);
  }
  const onBtnClickHander = () => {
    setModalVisible(true);
  }

  const extra = [];
  if (hasBack) extra.push(
    <Button key="1" size="middle" onClick={onBackClickHander}>返回</Button>
  );
  if (showBtn) extra.push(
    <Button key="2" type="primary" size="middle" onClick={onBtnClickHander}>{btnText}</Button>
  );

  return <>
    <PageHeader title={title} extra={extra} className={styles['page-header']}>
      {props.children}
    </PageHeader>
    <Modal
      title={title}
      visible={modalVisible}
      okText={'保存'}
      cancelText={'取消'}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <EditForm
        status={'create'}
        labelCol={{ 'span': 5 }}
        wrapperCol={{ 'span': 16 }}
        form={form}
        metadata={metadata}
      />
    </Modal>
  </>
};
