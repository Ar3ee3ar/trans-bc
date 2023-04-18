import React, { Component,useState }  from 'react';
import { Layout, Button, theme, Form, Input,Menu,Table,Tag } from 'antd';
import {useNavigate,Link,useLocation} from 'react-router-dom';

import api from '../api';
import {
    ViewData_Transaction,
    ViewData_bc

}from '../util/interact.js';

export const NavLogin = () =>{
    return(
      <Menu
        theme="dark"
        mode="horizontal"
        style={{color: 'white'}}>
        <Menu.Item>
          <Link to="/">Login</Link></Menu.Item>
      </Menu>
    )
}

export function ViewTran(){
    const [txhash, setTxhash] = useState("");
    const [detailDB, setDetail ] = useState("");
    const [detailDBTable, setDetailDBTable] = useState("");
    const [detailProofTable, setDetailProofTable] = useState("");
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

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'std_id',
            key: 'std_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Admission date',
            dataIndex: 'date_ad',
            key: 'date_ad',
        },
        {
            title: 'Graduation date',
            dataIndex: 'date_grad',
            key: 'date_grad',
        },
        {
            title: 'PDF',
            dataIndex: 'file_pdf',
            key: 'file_pdf',
            render: (text) => <a download='transcript' href={text}>
                         Download PDF
                     </a>
        },
        {
            title: 'Issue date',
            dataIndex: 'date_issue',
            key: 'date_issue',
        },
        {
            title: 'Valid',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'false') {
                        color = 'volcano';
                    }
                    else if (tag === 'true') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
            ),
                },
    ];

    const checkData = async() =>{
        try{
            var data_bc =  await OnViewTransaction();
            data_bc = JSON.parse(JSON.stringify(data_bc))
            console.log(JSON.parse(JSON.stringify(data_bc)))
            const proof_db =  await onGetProofDB(data_bc.StdID);
            console.log(proof_db)
            const data_db = await onGetHistoryDB(data_bc.StdID);
            console.log(data_db)

            setDetailDBTable(data_db);
            setDetailProofTable(proof_db)

            const pdf_db = JSON.stringify(proof_db.file_pdf);
            const hash_pdf_db = window.web3.utils.sha3(pdf_db);

            const all_data = JSON.stringify(data_db)
            const hash_all_data = window.web3.utils.sha3(all_data);

            if(data_bc.HashPaper === hash_pdf_db & data_bc.HashData === hash_all_data){
                // setDetail(<span>
                //     ✅{" "}
                //     found data
                //     <br/>
                //     <a download={`${data_bc.StdID}_transcript`} href={proof_db.file_pdf}>
                //         Download PDF
                //     </a>
                //     <br />
                //     {all_data}
                //     </span>
                var format_date_ad = new Date(data_db.date_of_ad);
                var format_date_grad = new Date(data_db.date_of_grad);
                var format_date_issue = new Date(data_bc.time * 1000)

                const data = [
                    {
                        key: '1',
                        std_id: data_db._id,
                        name: String(data_db.std_name)+" "+String(data_db.std_last),
                        date_ad: String(format_date_ad.getDate())+"/"+String(format_date_ad.getMonth()+1)+"/"+String(format_date_ad.getFullYear()),
                        date_grad: String(format_date_grad.getDate())+"/"+String(format_date_grad.getMonth()+1)+"/"+String(format_date_grad.getFullYear()),
                        file_pdf: proof_db.file_pdf,
                        date_issue:String(format_date_issue.getDate())+"/"+String(format_date_issue.getMonth()+1)+"/"+String(format_date_issue.getFullYear()),
                        status: [String(data_bc.status)],
                    },
                ]
                setDetail(<Table columns={columns} dataSource={data}/>);
                // );
            }
            else if(data_bc.HashPaper !== hash_pdf_db || data_bc.HashData !== hash_all_data){
                setDetail("data not match");
            }
        }catch(error){
            setDetail("not found transaction");
        }
    }

    
    return(
        <div  className="site-layout-content" style={{ textAlign: 'center',width: '90vh',
                height:'50vh',
                padding: '20px 30px 20px 20px',
                background:'white',
                borderRadius:'25px' }} >
          <Form
                    name="basic"
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
                >
                    <Button type="primary" htmlType="submit" onClick={checkData}>
                        view transaction
                    </Button>
                </Form.Item>
            {/* <Form.Item> */}
                <div className='center' >{detailDB}</div>
            {/* </Form.Item> */}
          </Form>
        </div>
    )
}