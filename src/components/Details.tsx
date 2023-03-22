/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Typography } from 'antd';
import type { FormInstance } from 'antd/es/form';
import './Details.css';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// eslint-disable-next-line react/function-component-definition
const Details: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const { Title } = Typography;

  const onTypeChange = (value: string) => {
    switch (value) {
      case 'bovine_haemoglobin':
        // formRef.current?.setFieldsValue({ note: 'bovine_haemoglobin' });
        break;
      case 'bluecheck':
        // formRef.current?.setFieldsValue({ note: 'bluecheck' });
        break;
      default:
        break;
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        Basic Details
      </Title>
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: 'auto' }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="batch_no"
          label="Batch Number"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Date Spreadsheet Completed "
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="checkpoint"
          label="Checkpoint"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item name="analyst" label="Analyst" rules={[{ required: false }]}>
          <Input />
        </Form.Item>{' '}
        <Form.Item name="checker" label="Checker" rules={[{ required: false }]}>
          <Input />
        </Form.Item>{' '}
        <Form.Item name="notes" label="Notes" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: false }]}>
          <Select
            placeholder="Bovine Haemoglobin or BlueCheck"
            onChange={onTypeChange}
            allowClear
          >
            <Option value="bovine_haemoglobin">Bovine Haemoglobin</Option>
            <Option value="bluecheck">BlueCheck</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Details;
