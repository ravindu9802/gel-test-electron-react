/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Typography } from 'antd';
import type { FormInstance } from 'antd/es/form';
import './ReferenceStandard.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// eslint-disable-next-line react/function-component-definition
const ReferenceStandard: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const { Title } = Typography;

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        Reference Standard Stock Formula
      </Title>
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          margin: 'auto',
        }}
      >
        <Form.Item
          name="test_conc"
          label="Concentration (mg/mL)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="total_volume"
          label="Total Valume (uL)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sample_volume"
          label="Volume of Sample (uL)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="r_sob_volume"
          label="Volume of 2X R-SOB (uL)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          name="final_conc"
          label="Final Concentration (mg/mL)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>{' '}
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

export default ReferenceStandard;
