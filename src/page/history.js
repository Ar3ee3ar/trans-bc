import React, { Component, useState,useEffect }  from 'react';
import { Layout, Button, theme, Form, Input, Menu ,Row,Col,Tag,Table} from 'antd';
import {useLocation,useNavigate,Link} from 'react-router-dom';
import sjcl from 'sjcl';
import {toBytes } from 'hex-my-bytes'

import api from '../api';
import {gen_pdf} from '../util/gen_pdf.js';

import {
    CertTranContract,
    connectWallet,
    getCountCert,
    getCurrentWalletConnected,
    addTrans,
    ViewData,
    ViewData_bc

}from '../util/interact.js';

window.Buffer = window.Buffer || require("buffer").Buffer;

// const{ token: { colorBgContainer },} = theme.useToken();

// async function getData (username){
//     return api.getHistoryByID(username);
// }

// async function UpdateBcOffChain (username,txhash,pdf){
//     const body = {"_id":username, "txhash":txhash, "file_pdf":pdf};
//     return api.updateHistory(username,body)
// }

export const NavHistory = () =>{
    const id_state = useLocation();
    // console.log(id_state)
    const navigate = useNavigate();
    return(
      <Menu
        theme="dark"
        mode="horizontal"
        style={{color: 'white'}}>
        <Menu.Item  onClick={() => navigate('/request',{state: {id:id_state.state.id}})}>Request</Menu.Item>
        <Menu.Item><Link to="/">Logout</Link></Menu.Item>
      </Menu>
    )
}

export const HistoryTran = () =>{
    const id_state = useLocation();
    const [dataBC, setDataBC] = useState("");
    const [dataDB, setDataDB] = useState("");
    const [_id, setID] = useState("");
    const [detailTran,setDetail] = useState("");
    // const [course]

    // setID(id_state.state.id)
    // console.log(_id)

    // console.log(id_state.state);

    // called only once
    useEffect(() => {
    // async function fetchMessage() {
    //     const old_text = await loadCurrentMessage();
    //     set_oldText(old_text);
    // }
    // fetchMessage();
    // addSmartContractListener();
    async function fetchData(){
        console.log(id_state.state.id)
        var data_bc =  await onViewData(id_state.state.id);
        data_bc = JSON.parse(JSON.stringify(data_bc))
        console.log(JSON.parse(JSON.stringify(data_bc)))
        const proof_db =  await onGetProofDB(id_state.state.id);
        // console.log(proof_db)
        // console.log(proof_db.txhash)
        setDataBC(data_bc)
        setDataDB(proof_db)
        setID(id_state.state.id)
        showHistory(data_bc,proof_db);
    }
    fetchData();
    }, []);


  const onViewData = async(_id) => {
          console.log(_id);
          const response = await ViewData_bc(_id);
          return response
      }

  const onGetProofDB = async(_id) =>{
          const response = await api.getProofByID(_id);
          return response.data.data
      }

  // const onUpdatePressed = async () => {
  //     const { status } = await updateMessage(walletAddress, new_text);
  //     setStatus(status);
  // };

  const CountData = async(walletAddress) =>{
    const {data_count} = await getCountCert(walletAddress);
  }

  const navigate = useNavigate();
  const change_page_gen = async e =>{
    // console.log(id_state.state.id);
    navigate('/view',{state: id_state.state});
  }

  // const change_page_login = async e =>{
  //   // console.log(id_state.state.id);
  //   navigate('/');
  // }

  const columns = [
          {
              title: 'Transaction hash',
              dataIndex: 'txhash',
              key: 'txhash',
              render: (text) => <button 
    onClick={() =>  navigator.clipboard.writeText(text)}>TxID</button>
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

      // const delay = ms => new Promise(res => setTimeout(res, ms));

      const showHistory = async(data_bc,proof_db) =>{
        try{
              // await delay(5000);


              // const pdf_db = JSON.stringify(proof_db.file_pdf);
              // const hash_pdf_db = window.web3.utils.sha3(pdf_db);

              // const all_data = JSON.stringify(data_db)
              // const hash_all_data = window.web3.utils.sha3(all_data);

              // if(data_bc.HashPaper === hash_pdf_db & data_bc.HashData === hash_all_data){
              //     // setDetail(<span>
              //     //     ✅{" "}
              //     //     found data
              //     //     <br/>
              //     //     <a download={`${data_bc.StdID}_transcript`} href={proof_db.file_pdf}>
              //     //         Download PDF
              //     //     </a>
              //     //     <br />
              //     //     {all_data}
              //     //     </span>

              var format_date_issue = new Date(data_bc[4] * 1000)

              const data = [
                  {
                      key: '1',
                      txhash: proof_db.txhash,
                      file_pdf: proof_db.file_pdf,
                      date_issue:String(format_date_issue.getDate())+"/"+String(format_date_issue.getMonth()+1)+"/"+String(format_date_issue.getFullYear()),
                      status: [String(data_bc[3])],
                  },
              ]
              setDetail(<Table columns={columns} dataSource={data}/>);
              //     // );
              // }
              // else if(data_bc.HashPaper !== hash_pdf_db || data_bc.HashData !== hash_all_data){
              //     setDetail("data not match");
              // }
          }catch(error){
            console.log(error)
              // setDetail("not found transaction");
          }
      }





    return(
            <div className="site-layout-content" style={{ textAlign: 'center',width: '100vh',
                height:'63vh',
                padding: '20px 30px 20px 20px',
                background:'white',
                borderRadius:'25px' }}>
                  {detailTran}
        </div>
        )
}