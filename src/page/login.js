import React, { Component,useState,useEffect }  from 'react';
import { Layout, Button, theme, Form, Input, Space,Menu } from 'antd';
import {useNavigate,Link,useLocation} from 'react-router-dom';

import '../App.css'
import api from '../api';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

async function loginUser (username){
    // console.log(await api.getAccountByID(username));
    return api.getAccountByID(username);
}

export const NavView = () =>{
    return(
      <Menu
        theme="dark"
        mode="horizontal"
        style={{color: 'white'}}>
        <Menu.Item>
          <Link to="/view">Verification</Link></Menu.Item>
      </Menu>
    )
}

export const Login = () =>{
    const id_state = useLocation();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const{ token: { colorBgContainer },} = theme.useToken();

    const navigate = useNavigate();

    // useEffect = (()=>{
    //   console.log(id_state)
    // })
    
    const handleSubmit = async e =>{
        const response = await loginUser(username);
        if(response.data.data.pass === password){
            console.log('pass');
            console.log(username);
            navigate('/request',{state: {id:username}})
        }
        else{
            console.log('wrong password');
        }
    }

     return(
            <div  className='center'
              style={{ 
                width: '100vh',
                height:'30vh',
                textAlign: 'center' ,
                padding: '50px',
                background:colorBgContainer,
                borderRadius:'25px'}} >
          <Form
            name="basic"
            style={{ width: '50vh', }}
            initialValues={{ remember: true, }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Form.Item
            id="username"
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!', }, ]}
              onChange={e => setUserName(e.target.value)}
              >
              <Input />
            </Form.Item>

            <Form.Item
            id="password"
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!', }, ]}
              onChange={e => setPassword(e.target.value)}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Space wrap>
                <Button type="primary" htmlType="submit">
                  login
                </Button>
              </Space>
            </Form.Item>

          </Form>
        </div>
        )
}
