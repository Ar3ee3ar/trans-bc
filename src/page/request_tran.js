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

export const NavLogout = () =>{
    const id_state = useLocation();
    // console.log(id_state)
    const navigate = useNavigate();
    return(
      <Menu
        theme="dark"
        mode="horizontal"
        style={{color: 'white'}}>
        <Menu.Item onClick={() => navigate('/history',{state: {id:id_state.state.id}})}>history</Menu.Item>
        <Menu.Item><Link to="/">Logout</Link></Menu.Item>
      </Menu>
    )
}

export const RequestTran = () =>{
    const id_state = useLocation();
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [detailTran, setDetail] = useState("");
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
  console.log(status);
  navigate('/history',{state: {id:id_state.state.id}});
  // showHistory();
  
}

const onViewData = async() => {
        const response = await ViewData_bc(_id);
        return response
    }

const onGetProofDB = async(_id) =>{
        const response = await api.getProofByID(_id);
        return response.data.data
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

const columns = [
        {
            title: 'Transaction hash',
            dataIndex: 'txhash',
            key: 'txhash',
            render: (text) => <button 
  onClick={() =>  navigator.clipboard.writeText(text)}
>
  TxID
</button>
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

    const showHistory = async() =>{
      try{
            // await delay(5000);
            var data_bc =  await onViewData();
            data_bc = JSON.parse(JSON.stringify(data_bc))
            console.log(JSON.parse(JSON.stringify(data_bc)))
            const proof_db =  await onGetProofDB(_id);
            console.log(proof_db)
            console.log(proof_db.txhash)


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
            <div className="site-layout-content" style={{ textAlign: 'center',width: '120vh',
                height:'63vh',
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
                          {walletAddress.length > 0 ? (
                          "Connected: " +
                          String(walletAddress).substring(0, 6) +
                          "..." +
                          String(walletAddress).substring(38)
                        ) : (
                          <span>Connect Wallet</span>
                        )}
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
        <div  style={{paddingLeft:'40vh'}} hidden = {!componentDisabled}>
          <Row>
            <Col span={6}>
              <Button  htmlType='submit' onClick={onChangeDisabled} >Edit</Button>
            </Col>
            <Col span={6}>
              <Button type="primary" htmlType="submit" onClick={onStoreData}>Submit</Button>
            </Col>
          </Row>
        </div>
        <div  style={{paddingLeft:'40vh'}} hidden = {componentDisabled}>
          <Row>
            <Col span={6}>
              <Button type="primary"  htmlType='submit'  onClick={UpdateData}>save</Button>
            </Col>
            <Col span={6}>
              <Button type="primary" danger htmlType='submit'  onClick={onChangeDisabled}>cancel</Button>
            </Col>
          </Row>
          </div>
          {/* <br/>
          <div style={{marginTop:'50px', textAlign: 'center',
                padding: '20px 30px 20px 20px',
                background:'white',
                borderRadius:'25px'}}>
                  {detailTran}
                </div> */}
        </div>
        )
}