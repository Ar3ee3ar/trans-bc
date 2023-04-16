import React, { Component, useState,useEffect }  from 'react';
import { Layout, Button, theme, Form, Input, Menu ,Row,Col} from 'antd';
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
    ViewData

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

const connect_wall = () =>{
    console.log('connect')
}
const sent_text = ()=>{
    console.log('send text')
}

const hexToByte = (hex) => {
  var hash_bytes = toBytes(hex);
  return hash_bytes;
}

export const NavLogout = () =>{
    return(
      <Menu
        theme="dark"
        mode="horizontal"
        style={{color: 'white'}}>
        <Menu.Item><Link to="/view">view Transaction</Link></Menu.Item>
        <Menu.Item><Link to="/">Logout</Link></Menu.Item>
      </Menu>
    )
}

export const RequestTran = () =>{
    const id_state = useLocation();
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    // const [old_text, set_oldText] = useState("No connection to the network.");
    // const [new_text, set_newText] = useState ();

    const [_id, setID] = useState("");
    const [std_name, SetStd_name] = useState("");
    const [std_last, SetStd_last] = useState("");
    const [date_ad, SetDate_ad] = useState("");
    const [date_grad, SetDate_grad] = useState("");

    const [all_data,SetAll] = useState("");
    const [file_pdf,SetFile] = useState("");

    const [file_base64,SetFile64] = useState("");

    const [componentDisabled, setComponentDisabled] = useState(true);
    // const [course]


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
      try{
        const response = await api.getHistoryByID(id_state.state.id);
      // console.log(response.data.data[0]);
      setID(response.data.data[0]._id);
      SetStd_name(response.data.data[0].std_name);
      SetStd_last(response.data.data[0].std_last);
      SetDate_ad(response.data.data[0].date_of_ad);
      SetDate_grad(response.data.data[0].date_of_grad);
      SetAll(JSON.stringify(response.data.data[0]));
      const blob_pdf = await gen_pdf(response);
      SetFile64(blob_pdf) //stored in database
      SetFile(JSON.stringify(blob_pdf)); //stored in blockchain
      }catch(error){
        console.log(error)
        navigate('/',{state: "Please Login"});
      }
    }
    fetchData();

    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
    }
  fetchWallet();
  addWalletListener(); 
    }, []);

//     function addSmartContractListener() {
//     helloworldContract.events.UpdatedMessages({}, (error, data) => {
//       if (error) {
//         setStatus("😥 " + error.message);
//       } else {
//         set_oldText(data.returnValues[1]);
//         set_newText("");
//         setStatus("🎉 Your message has been updated!");
//       }
//     });
//   }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

const onStoreData = async () => {
  const status = await addTrans(walletAddress,_id,all_data,file_pdf,file_base64);
  // console.log(status.status)
  setStatus(status.status);
}

async function UpdateData (){
    const body = {"_id":_id, "std_name":std_name, "std_last":std_last};
    const response = api.updateHistory(_id,body)
    setComponentDisabled(true)
    console.log(response)
    // return api.updateHistory(_id,body)
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

const onChangeDisabled = () =>{
  setComponentDisabled(!componentDisabled);
}





    return(
            <div className="site-layout-content" style={{ textAlign: 'center',width: '150vh',
                height:'70vh',
                padding: '20px 30px 20px 20px',
                background:'white',
                borderRadius:'25px' }}>
                  <div >
                    <Row>
                      <Col flex={4}>
                        <h3 style={{marginLeft:'170px'}}>ตรวจสอบข้อมูล</h3>
                      </Col>
                      <Col flex={1}>
                        <Button type="primary" htmlType="submit" onClick={connectWalletPressed}>
                          connect to wallet
                        </Button>
                      </Col>
                    </Row>
                  </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true, }}
                    autoComplete="off"
                    fields={[
                      {
                        name: ["std_id"],
                        value: _id,
                      },
                      {
                        name: ["std_name"],
                        value: std_name,
                      },
                      {
                        name: ["std_last"],
                        value: std_last,
                      },
                      {
                        name: ["date_ad"],
                        value: date_ad,
                      },
                      {
                        name: ["date_grad"],
                        value: date_grad,
                      },
                    ]}
                >
                   <Form.Item
                      id="std_id"
                      label="Student ID"
                      name="std_id"
                      rules={[{ required: true, message: 'Please input your ID!', }, ]}
                      onChange={e => setID(e.target.value)}
                      >
                      <Input disabled='true'/>
                    </Form.Item>
                    <Form.Item
                      id="std_name"
                      label="Name"
                      name="std_name"
                      rules={[{ required: true, message: 'Please input your name!', }, ]}
                      onChange={e => SetStd_name(e.target.value)}
                      >
                      <Input disabled={componentDisabled}/>
                    </Form.Item>
                    <Form.Item
                      id="std_last"
                      label="Last name"
                      name="std_last"
                      rules={[{ required: true, message: 'Please input your last name!', }, ]}
                      onChange={e => SetStd_last(e.target.value)}
                      >
                      <Input disabled={componentDisabled}/>
                    </Form.Item>
                    <Form.Item
                      id="date_ad"
                      label="Admission date"
                      name="date_ad"
                      rules={[{ required: true, message: 'Please input your last name!', }, ]}
                      onChange={e => SetDate_ad(e.target.value)}
                      >
                      <Input disabled='true'/>
                    </Form.Item>
                    <Form.Item
                      id="date_grad"
                      label="Graduation date"
                      name="date_grad"
                      rules={[{ required: true, message: 'Please input your last name!', }, ]}
                      onChange={e => SetDate_grad(e.target.value)}
                      >
                      <Input disabled='true'/>
                    </Form.Item>
                    {/* <p>{all_data}</p> */}
                    {/* <a download="PDF Title" href={file_base64}>Download PDF document</a> */}
                    <p id="status">{status}</p>
          </Form>
        {/* <Button type="primary" htmlType='submit' onClick={change_page_gen}>to view transaction</Button> */}
        <div hidden = {!componentDisabled}>
          <Button type="primary" htmlType='submit' onClick={onChangeDisabled} >Edit</Button>
          <Button type="primary" htmlType="submit" onClick={onStoreData}>Submit</Button>
        </div>
        <div hidden = {componentDisabled}>
          <Button type="primary" htmlType='submit'  onClick={UpdateData}>save</Button>
          <Button type="primary" htmlType='submit'  onClick={onChangeDisabled}>cancel</Button>
          </div>
        </div>
        )
}