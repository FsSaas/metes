import React, { useState, useEffect } from 'react';
import { Form, Input, PageHeader, Button, message, Switch, Select, Empty } from 'antd';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';
import styles from './index.scss';

const { Option } = Select;

const MetaForm = props => {
  let {
    header,
    links = {},
    metadata,
    status = 'create'
  } = props;

  if (!metadata) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  let {
    title = '',
    btnText = '新增',
    hasBack = false,
    showBtn = false
  } = header || {};

  let [form] = Form.useForm();
  let [formData, setFormData] = useState();
  let [formFields, setFormFields] = useState();

  /**
   * 获取表单字段和数据
   */
  useEffect(() => {
    const makeRequest = async () => {
      let fdata = {};
      let ffields = await metadata.fields();
      if (status != 'create') {
        fdata = await metadata.data();
      }
      setFormData(fdata);
      setFormFields(ffields);
    }
    makeRequest();
  }, []);

  const onBackClickHander = () => {
    links.goBack();
  }

  const formSave = async data => {
    let res = await metadata.save(data);
    if (res) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
      console.log(res);
    }
  }

  const onFinish = data => {
    return formSave(data);
  }

  const onBtnClickHander = () => {
    return form.validateFields()
      .then(data => formSave(data))
      .catch(err => console.log(err));
  }

  const extra = [];
  if (hasBack) extra.push(
    <Button key="1" size="middle" onClick={onBackClickHander}>返回</Button>
  );
  if (showBtn) extra.push(
    <Button key="2" type="primary" size="middle" onClick={onBtnClickHander}>{btnText}</Button>
  );

  let Warpper;
  if (header) {
    Warpper = PageHeader;
  } else {
    Warpper = 'div';
  }

  /**
   * 根据 Field 状态渲染 Input
   * @param {*} field 
   */
  const renderElement = field => {
    let { type, placeholder } = field;
    if (type == 'string') return <Input placeholder={placeholder} />;
    if (type == 'bool') return <Switch />;
    if (type == 'textarea') return <TextArea placeholder={placeholder} />;
    if (type == 'select') return <Select allowClear>{field.options.map(it => <Option value={it}>{it}</Option>)}</Select>;
    return <Input placeholder={placeholder} />;
  }

  return <>
    <Warpper title={title} extra={extra}>
      <div className={styles.form}>
        {formFields ? <Form
          form={form}
          labelCol={{ 'span': 6 }}
          wrapperCol={{ 'span': 18 }}
          name="basic"
          initialValues={formData}
          onFinish={onFinish}
        >
          {formFields.map(field => {
            let itemProps = {};
            if (field.type == 'bool') {
              itemProps.valuePropName = 'checked';
            }
            return <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              hidden={field.hidden}
              rules={[{
                'required': (field.require ? true : false),
                'message': `${field.label}必填!`
              }]}
              extra={field.help}
              {...itemProps}
            >
              {renderElement(field)}
            </Form.Item>
          })}

          {!header && formFields ? <Form.Item wrapperCol={{ 'span': 8, 'offset': 13 }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item> : null}
        </Form> : null}
      </div>
    </Warpper>
  </>;
};

MetaForm.propTypes = {
  /**
   * 头部
   */
  'header': PropTypes.object,
  /**
   * 源数据
   */
  'metadata': PropTypes.shape({
    'fields': PropTypes.func,
    'save': PropTypes.func,
    'data': PropTypes.func
  }),
  /**
   * 表单状态
   */
  'status': PropTypes.oneOf(['create', 'edit', 'view'])
};

export default MetaForm
