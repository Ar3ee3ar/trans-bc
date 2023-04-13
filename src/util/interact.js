// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
import Web3 from "web3";
// const web3 = createAlchemyWeb3("wss://eth-goerli.g.alchemy.com/v2/lw6smreDcTkJcZmWMkyyONIvEn58LFYe"); 
// require('dotenv').config();

import api from '../api';

const contractABI = require("../abi/contract-abi.json");
const contractAddress = process.env.REACT_APP_CONTRACT;

window.web3 =  new Web3(window.ethereum);
// window.contract = await new window.web3.eth.Contract(contractABI, contractAddress);

async function UpdateBcOffChain (username,txhash,pdf){
    const body = {"_id":username, "txhash":txhash, "file_pdf":pdf};
    return api.updateProof(username,body)
}

async function CreateBcOffChain (username,txhash,pdf){
    const body = {"_id":username, "txhash":txhash, "file_pdf":pdf};
    return api.createProof(body)
}

export const CertTranContract = new window.web3.eth.Contract(
    contractABI,
    contractAddress
);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCountCert = async(address) =>{
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  const data = await CertTranContract.methods.count_students().call();
  // console.log(data);
  return data;

}

export const addTrans = async (address,std_id,hashData,hashPaper,file_base64) =>{
    //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: CertTranContract.methods.storeData(parseInt(std_id),std_id,window.web3.utils.sha3(hashData),window.web3.utils.sha3(hashPaper),true).encodeABI(),
  };

    //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    // const txHash = "0x42df1b3a119dd103b9062cdf6e02b9657cf2efab4a56ce6b263d6bc69aa1bf97"
    try{
      var response = await CreateBcOffChain(std_id,txHash,file_base64)
    }catch(error){
      // console.log(error.response.data.message);
      if(error.response.status === 400 & error.response.data.message==="Proof not created!"){
        response = await UpdateBcOffChain(std_id,txHash,file_base64);
      }
    }

    // console.log(response);
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const ViewData_Transaction = async (txHash) => {
  try{
    const receipt = await window.web3.eth.getTransactionReceipt(txHash);
    const form_data = window.web3.eth.abi.decodeParameters([
          {
            name: "id",
            type: "uint256"
          },
          {
            name: "StdID",
            type: "string"
          },
          {
            name: "HashData",
            type: "bytes32"
          },
          {
            name: "HashPaper",
            type: "bytes32"
          },
          {
            name: "status",
            type: "bool"
          },
          {
            name: "time",
            type: "uint256"
          }
        ],
        receipt.logs[0].data)
    return form_data
  }
  catch (error){
    console.log(error)
  }
}

export const ViewData_bc = async (id) => {
  try{
    const data = await CertTranContract.methods.getData(id).call();
    return data
  }
  catch(error){
    console.log(error)
  }
}

// export const updateMessage = async (address, message) => {

//   //input error handling
//   if (!window.ethereum || address === null) {
//     return {
//       status:
//         "💡 Connect your Metamask wallet to update the message on the blockchain.",
//     };
//   }

//   if (message.trim() === "") {
//     return {
//       status: "❌ Your message cannot be an empty string.",
//     };
//   }

//   //set up transaction parameters
//   const transactionParameters = {
//     to: contractAddress, // Required except during contract publications.
//     from: address, // must match user's active address.
//     data: CertTranContract.methods.update(message).encodeABI(),
//   };

//   //sign the transaction
//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     return {
//       status: (
//         <span>
//           ✅{" "}
//           <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
//             View the status of your transaction on Etherscan!
//           </a>
//           <br />
//           ℹ️ Once the transaction is verified by the network, the message will
//           be updated automatically.
//         </span>
//       ),
//     };
//   } catch (error) {
//     return {
//       status: "😥 " + error.message,
//     };
//   }
// };




