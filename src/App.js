import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, Space } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <div style={{ textAlign: 'center', color: 'white', font: '50px'}}> 
          ijohtjeio 
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ textAlign: 'center', background: colorBgContainer }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;
