import React, { Component,useState }  from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';
import {useNavigate} from 'react-router-dom';

import api from '../api';
import {
    ViewData_Transaction,
    ViewData_bc

}from '../util/interact.js';

export default function ViewTran(){
    const [txhash, setTxhash] = useState("");
    const{ token: { colorBgContainer },} = theme.useToken();

    const OnViewTransaction = async() =>{
        const response = await ViewData_Transaction(txhash);
        console.log(response)
    }

    const onViewData = async() => {
        const response = await ViewData_bc(txhash);
        console.log(response)
    }

    return(
        <div className="site-layout-content" 
            style={{ textAlign: 'center' ,background:colorBgContainer}} >
          view transcript
          <Form
                    name="basic"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true, }}
                    autoComplete="off"
                >
                <Form.Item
            id="txhash"
              label="TXhash"
              name="txhash"
              rules={[{ required: true, message: 'Please input transaction ID!', }, ]}
              onChange={e=>setTxhash(e.target.value)}
              >
              <Input />
            </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}
                >
                    <Button type="primary" htmlType="submit" onClick={OnViewTransaction}>
                        view transaction
                    </Button>
                    <br></br>
                    <br></br>
                    <Button type="primary" htmlType="submit" onClick={onViewData}>
                        view data
                    </Button>
                </Form.Item>

          </Form>
        </div>
    )
}