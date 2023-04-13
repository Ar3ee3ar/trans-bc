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
    const [detailDB, setDetail ] = useState("");
    const{ token: { colorBgContainer },} = theme.useToken();

    const OnViewTransaction = async() =>{
        const response = await ViewData_Transaction(txhash);
        return response
        // console.log(response)
    }

    const onViewData = async() => {
        const response = await ViewData_bc(txhash);
        console.log(response)
    }

    const onGetProofDB = async(_id) =>{
        const response = await api.getProofByID(_id);
        return response.data.data
    }

    const onGetHistoryDB = async(_id) =>{
        const response = await api.getHistoryByID(_id);
        return response.data.data[0]
    }

    const checkData = async() =>{
        try{
            var data_bc =  await OnViewTransaction();
            data_bc = JSON.parse(JSON.stringify(data_bc))
            console.log(JSON.parse(JSON.stringify(data_bc)))
            const proof_db =  await onGetProofDB(data_bc.StdID);
            console.log(proof_db)
            const data_db = await onGetHistoryDB(data_bc.StdID);
            console.log(data_db)

            const pdf_db = JSON.stringify(proof_db.file_pdf);
            const hash_pdf_db = window.web3.utils.sha3(pdf_db);

            const all_data = JSON.stringify(data_db)
            const hash_all_data = window.web3.utils.sha3(all_data);

            if(data_bc.HashPaper === hash_pdf_db & data_bc.HashData === hash_all_data){
                setDetail(<span>
                    ✅{" "}
                    found data
                    <br/>
                    <a download={`${data_bc.StdID}_transcript`} href={proof_db.file_pdf}>
                        Download PDF
                    </a>
                    <br />
                    {all_data}
                    </span>
                );
            }
            else if(data_bc.HashPaper !== hash_pdf_db || data_bc.HashData !== hash_all_data){
                setDetail("data not match");
            }
        }catch(error){
            setDetail("not found transaction");
        }
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
                    <Button type="primary" htmlType="submit" onClick={checkData}>
                        view transaction
                    </Button>
                </Form.Item>
            {/* <Form.Item> */}
                <p>{detailDB}</p>
            {/* </Form.Item> */}
          </Form>
        </div>
    )
}