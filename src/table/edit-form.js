import React, { useState, useEffect } from 'react';
import { Form, Input, Spin, Switch, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './index.scss';

const { Option } = Select;

export default props => {

  let [fields, setFields] = useState([]);
  let [data, setData] = useState();

  let { form, metadata, editorData, status, ...restProps } = props;

  useEffect(() => {
    const makeRequest = async () => {
      const fields = await metadata.fields();
      setFields(fields);
    }
    makeRequest();
  }, []);

  useEffect(() => {
    const makeRequest = async () => {
      if (status != 'create') {
        let data = await metadata.findOne(editorData);
        setData(data);
      }
    }
    makeRequest();
  }, [editorData]);

  let render = false;
  if (status == 'create') {
    render = true;
  } else {
    if (data) render = true;
  }

  const renderElement = field => {
    let { type, placeholder } = field;
    if (type == 'string') return <Input placeholder={placeholder} />;
    if (type == 'bool') return <Switch />;
    if (type == 'textarea') return <TextArea placeholder={placeholder} />;
    if (type == 'select') return <Select allowClear>{field.options.map(it => <Option value={it}>{it}</Option>)}</Select>;
    return <Input placeholder={placeholder} />;
  }

  return <div className={styles['edit-form']}>
    <div id={editorData && editorData.id}>
      {render ? <Form
        form={form}
        name="basic"
        initialValues={data}
        {...restProps}
      >
        {fields.map(field => {
          let itemProps = {};
          if (field.type == 'bool') {
            itemProps.valuePropName = 'checked';
            if (status == 'create') {
              itemProps.initialValue = false;
            }
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
      </Form> :
        <Spin className={styles.spin} tip="Loading" />}
    </div>
  </div>
}