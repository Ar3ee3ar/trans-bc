import React, { Component,useState }  from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';

import api from '../api';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

async function loginUser (username){
    return api.getHistoryByID(username);
}

export default function Login (){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const{ token: { colorBgContainer },} = theme.useToken();
    
    const handleSubmit = async e =>{
        const response = await loginUser(username);
        if(response.data.data[0].pass == password){
            console.log('pass');
            window.location.href = "/test";
        }
        else{
            console.log('wrong password');
        }
    }

     return(
            <div className="site-layout-content" 
            style={{ textAlign: 'center' ,background:colorBgContainer}} >
          Content
          <Form
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            style={{ maxWidth: 600, }}
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

            <Form.Item
              wrapperCol={{ offset: 8, span: 16, }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </div>
        )
}