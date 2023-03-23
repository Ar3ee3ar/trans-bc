import React, { Component, useState,useEffect }  from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';

import {
    helloworldContract,
    loadCurrentMessage,
    connectWallet,
    getCurrentWalletConnected,
    updateMessage

}from '../util/interact.js';

window.Buffer = window.Buffer || require("buffer").Buffer;

// const{ token: { colorBgContainer },} = theme.useToken();

const connect_wall = () =>{
    console.log('connect')
}
const sent_text = ()=>{
    console.log('send text')
}

const Test = () =>{
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [old_text, set_oldText] = useState("No connection to the network.");
    const [new_text, set_newText] = useState ();

    // called only once
    useEffect(() => {
    async function fetchMessage() {
        const old_text = await loadCurrentMessage();
        set_oldText(old_text);
    }
    fetchMessage();
    addSmartContractListener();

    async function fetchWallet() {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status); 
  }
  fetchWallet();
  addWalletListener(); 
    }, []);

    function addSmartContractListener() {
    helloworldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        set_oldText(data.returnValues[1]);
        set_newText("");
        setStatus("🎉 Your message has been updated!");
      }
    });
  }

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

const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, new_text);
    setStatus(status);
};




    return(
            <div className="site-layout-content" style={{ textAlign: 'center' }}>
                home after login
                <Button type="primary" htmlType="submit" onClick={connectWalletPressed}>
                        connect to wallet
                </Button>
                <Form
                    name="basic"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true, }}
                    onFinish={onUpdatePressed}
                    autoComplete="off"
                >

                    <h3>Old message</h3>
                    <p>{old_text}</p>

                <Form.Item
                    id="new_text"
                    label="new_text"
                    name="newText"
                    rules={[{ required: true, message: 'Please input your password!', }, ]}
                    onChange={e => set_newText(e.target.value)}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

          </Form>

        </div>
        )
}

export default Test;