import React, { Component, useState,useEffect }  from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';
import {useLocation,useNavigate} from 'react-router-dom';
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

const RequestTran = () =>{
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
      const response = await api.getHistoryByID(id_state.state.id);
      setID(response.data.data[0]._id);
      SetStd_name(response.data.data[0].std_name);
      SetStd_last(response.data.data[0].std_last);
      SetDate_ad(response.data.data[0].date_of_ad);
      SetDate_grad(response.data.data[0].date_of_grad);
      SetAll(JSON.stringify(response.data.data[0]));
      const blob_pdf = gen_pdf(response);
      SetFile(JSON.stringify(blob_pdf));
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
  const status = await addTrans(walletAddress,_id,all_data,file_pdf);
  setStatus(status);
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
  console.log(id_state.state.id);
  navigate('/view',{state: id_state.state});
}




    return(
            <div className="site-layout-content" style={{ textAlign: 'center' }}>
                home after login
                <Button type="primary" htmlType="submit" onClick={connectWalletPressed}>
                        connect to wallet
                </Button>
                {/* <Button type="primary" htmlType="submit" onClick={CountData}>
                        check data
                </Button> */}
                <Form
                    name="basic"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true, }}
                    onFinish={onStoreData}
                    autoComplete="off"
                >

                    <h3>Old message</h3>
                    <p>{_id}</p>
                    <p>{std_name}</p>
                    <p>{std_last}</p>
                    <p>{date_ad}</p>
                    <p>{date_grad}</p>
                    <p>{all_data}</p>
                    {/* <p>{file_pdf}</p> */}

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

          </Form>
        <Button type="primary" htmlType='submit' onClick={change_page_gen}>to view transaction</Button>
        </div>
        )
}

export default RequestTran;