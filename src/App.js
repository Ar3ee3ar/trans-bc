import './App.css';
import React from 'react';
import { Layout, Button, theme,Space,Col,Row,Menu} from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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

  console.log([{key: 1, label: 'nav 1'},{key: 2, label: 'nav 1'},{key: 3, label: 'nav 1'}])

  console.log((new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })));
  
  return (
      <BrowserRouter>
          <Layout className="layout">

          <Header>
            <div style={{
            float: 'left',
            color: 'white',
            font: '50px'
          }}>
            {/* <Row> */}
             <h2 style={{margin: '0'}}>Certificate</h2>

            </div>
            <div style={{
              width: '20vh',
              float: 'right'
            }}>
                   <Routes>
                     <Route exact path='/' element={<NavView/>}/>
                     <Route exact path='/request' element = {<NavLogout/>}/>
                     <Route exact path='/view' element={<NavLogin/>}/>
                   </Routes>
            </div>
          </Header>

          <Content className="center block">
            <Routes>
              <Route exact path='/' element={<Login/>}/>
              <Route exact path='/request' element = {<RequestTran/>}/>
              <Route exact path='/view' element={<ViewTran/>}/>
            </Routes>
          </Content>
          
          <Footer style={{ 
                  textAlign: 'center',
                  display:'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center' }}>MCS KMUTNB</Footer>
          
        </Layout>
      </BrowserRouter>
  );
};

export default App;
