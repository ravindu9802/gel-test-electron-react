/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  CheckOutlined,
  LineChartOutlined,
  DotChartOutlined,
  AreaChartOutlined,
  RadarChartOutlined,
  PercentageOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import LaneContents from 'components/LaneContents';
import Details from 'components/Details';
import TestSample from 'components/TestSample';
import ReferenceStandard from 'components/ReferenceStandard';
import Title from 'antd/es/typography/Title';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem('Option 1', '1', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [
  //   getItem('Team 1', '6'),
  //   getItem('Team 2', '8'),
  // ]),
  // getItem('Files', '9', <FileOutlined />),
  getItem('Details', 'details', <DatabaseOutlined />, [
    getItem('Basic Details', 'basic_details'),
    getItem('Test Sample', 'test_sample'),
    getItem('Reference Standard', 'ref_st'),
    getItem('Dilution Table', 'dil_tab'),
  ]),
  getItem('Lane Contents', 'lane_contents', <PieChartOutlined />),
  getItem('Lane Indicator', 'lane_indicator', <BarChartOutlined />),
  getItem('Raw Data', 'raw_data', <HolderOutlined />),
  getItem('Mass Correction', 'mass_corr', <PercentageOutlined />),
  getItem('Normalised to Dilution', 'norm_dil', <RadarChartOutlined />),
  getItem('Protein Concentration', 'protein_conc', <AreaChartOutlined />),
  getItem('Linearity', 'linearity', <LineChartOutlined />),
  getItem('Impurities Analysis', 'imp_ana', <DotChartOutlined />),
  getItem('Final Result', 'final_res', <CheckOutlined />),
];

const MenuItems: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [title, setTille] = useState(
    'Protein Quantification Impurities Analysis'
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (event: { key: any }) => {
    console.log(event.key);
    setSelectedMenu(event.key);
    // you can get here event.target.value
    // filter the content
    // setState the content your component will re render and content will be updated.
  };

  const renderContent = (contentId: string) => {
    switch (contentId) {
      case 'basic_details':
        return <Details />;
      case 'test_sample':
        return <TestSample />;
      case 'ref_st':
        return <ReferenceStandard />;
      case 'dil_tab':
        return 'dil_tab';
      case 'lane_contents':
        return <LaneContents />;
      case 'lane_indicator':
        return 'lane_indicator';
      case 'raw_data':
        return 'raw_data';
      case 'mass_corr':
        return 'mass_corr';
      case 'norm_dil':
        return 'norm_dil';
      case 'protein_conc':
        return 'protein_conc';
      case 'linearity':
        return 'linearity';
      case 'imp_ana':
        return 'imp_ana';
      case 'final_res':
        return 'final_res';
      default:
        return 'foo';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: 'center',
          }}
        >
          <h1>{title}</h1>
        </Header>
        <Content className="main-body-content" style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              color: 'black',
            }}
          >
            {renderContent(selectedMenu)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MenuItems;
