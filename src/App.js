import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import api from './api';
import Login from './page/login';
import Login2 from './page/test'

const { Header, Content, Footer } = Layout;

const App = () => { 
  const{ token: { colorBgContainer },} = theme.useToken();
  return (
      <BrowserRouter>
          <Layout className="layout">

          <Header>
            <div className="logo" />
            <div style={{ textAlign: 'center', color: 'white', font: '50px'}}> 
              ijohtjeio 
            </div>
          </Header>

          <Content style={{ padding: '50px 50px' }}>
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path='/test' element = {<Login2/>}/>
            </Routes>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          
        </Layout>
      </BrowserRouter>
  );
};

export default App;
