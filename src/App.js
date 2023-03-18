import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';

const onFinish = (values) => { console.log('Success:', values); };
const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo); };
const { Header, Content, Footer } = Layout;

const App = () => { const{ token: { colorBgContainer },} = theme.useToken();
  return (
    <Layout className="layout">

      <Header>
        <div className="logo" />
        <div style={{ textAlign: 'center', color: 'white', font: '50px'}}> 
          ijohtjeio 
        </div>
      </Header>

      <Content style={{ padding: '50px 50px' }}>
        <div className="site-layout-content" style={{ textAlign: 'center', background: colorBgContainer }}>
          Content
          <Form
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            style={{ maxWidth: 600, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!', }, ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!', }, ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 8, span: 16, }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      
    </Layout>
  );
};

export default App;
