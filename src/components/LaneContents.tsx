/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  InputRef,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import LaneContentsData from 'models/LaneContents';
import './LaneContents.css';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  lane: number;
  sample_conc: number;
  dil_lvl: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

// eslint-disable-next-line react/function-component-definition
const LaneContents: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(LaneContentsData);
  const [count, setCount] = useState(2);
  const { Title } = Typography;

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Lane',
      dataIndex: 'lane',
      width: '10%',
      editable: false,
    },
    {
      title: 'Sample & Concentration',
      dataIndex: 'sample_conc',
      width: '50%',
      editable: true,
    },
    {
      title: 'Dilution Level',
      dataIndex: 'dil_lvl',
      width: '40%',
      editable: true,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        Lane Contents
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: 'auto' }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          name="gel_num"
          label="Gel (letter or number):"
          rules={[{ required: false, message: '' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gel_run_date"
          label="Date gel run:"
          rules={[{ required: false, message: '' }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default LaneContents;
