import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Buffer} from 'buffer';

import api from './api';
import Login from './page/login';
import RequestTran from './page/request_tran';
import ViewTran from './page/view_tran';

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
              Certificate 
            </div>
          </Header>

          <Content style={{ padding: '50px 50px' }}>
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path='/request' element = {<RequestTran/>}/>
              <Route exact path='/view' element={<ViewTran/>}/>
            </Routes>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>MCS KMUTNB</Footer>
          
        </Layout>
      </BrowserRouter>
  );
};

export default App;
