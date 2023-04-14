import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Buffer} from 'buffer';

import api from './api';
import Login from './page/login';
import Test from './page/home';

window.Buffer = window.Buffer || require("buffer").Buffer;


const { Header, Content, Footer } = Layout;

const App = () => { 
  const{ token: { colorBgContainer },} = theme.useToken();
  return (
      <BrowserRouter>
          <Layout className="layout">

          <Header>
            <div className="logo" />
            <div style={{ textAlign: 'center', color: 'white', font: '50px'}}> 
              Send a certificate to you
            </div>
          </Header>

          <Content style={{ padding: '50px 50px' }}>
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path='/test' element = {<Test/>}/>
            </Routes>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          
        </Layout>
      </BrowserRouter>
  );
};

export default App;
