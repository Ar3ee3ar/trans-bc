import './App.css';
import React from 'react';
import { Layout, Button, theme,Space} from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Buffer} from 'buffer';

import api from './api';
import {Login,NavView} from './page/login';
import {RequestTran,NavLogout} from './page/request_tran';
import {ViewTran,NavLogin} from './page/view_tran';
// import NavLogin from './page/navbar_login';

window.Buffer = window.Buffer || require("buffer").Buffer;


const { Header, Content, Footer } = Layout;


const App = () => { 
  const{ token: { colorBgContainer },} = theme.useToken();
  
  return (
      <BrowserRouter>
          <Layout className="layout">

          <Header>
            <div style={{ textAlign: 'end', color: 'white', font: '50px'}}> 
            <Space size ={555}>
              Certificate 
              <Routes>
                <Route exact path='/' element={<NavView/>}/>
                <Route exact path='/request' element = {<NavLogout/>}/>
                <Route exact path='/view' element={<NavLogin/>}/>
              </Routes>
            </Space>
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
