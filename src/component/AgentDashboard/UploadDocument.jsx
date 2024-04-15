import React, { useState } from 'react';
// import {create} from '@tatumio/tatum';
import MetaMask from "../Landing Page/Metamask";
import { X } from 'lucide-react';
import SuccessPage from "../SuccessPage";


const UploadDocument = ({onClose})=> {
  const {account,getWeb3,containerContractConnection} = MetaMask();
  // const [file, setFile] = useState(null);
  // const [ipfsHash, setIpfsHash] = useState('');
  const [containerId, setContainerId] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const uploadFileToIpfs = async () => {
  //   try {
  //     const tatum = create(process.env.TATUM_API_KEY);
  //     const ipfsResponse = await tatum.ipfsStore(file);
  //     console.log('IPFS CID:', ipfsResponse.hash);
  //     setIpfsHash(ipfsHash);
  //     handleUpload(ipfsResponse.hash);
  //   } catch (error) {
  //     console.error('Error uploading to IPFS:', error);
  //   }
  // };

  // const handleUpload = async(ipfsHash)=>{
  //     const web3 = getWeb3;
  //     const containerVar = await containerContractConnection(web3);
  //     const data = await containerVar.methods.uploadDocumentToIPFS(containerId, ipfsHash).send({from:account});
  //     const result = await data.events.DocumentUploaded.returnValues[0];

  //   if(result !==0){
  //     setShowSuccess(true);
  //   }
  // }

  const verifyDocument = async () => {
    const web3 = await getWeb3();
    const containerVar = await containerContractConnection(web3);
    const data = await containerVar.methods.verifyDocuments(containerId).send({from:account});
    const result = data;
    console.log(result);
  };

  return (
    <div className="container mx-auto my-8 px-10 w-3/4 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-25">
    <div className="flex justify-end">
        <div><button className="mt-4 px-4 py-2 text-red-600 rounded-md" onClick={onClose}><X/></button></div>
    </div>
    <div className="p-8 bg-gray-800 text-white">
      <h2 className="text-lg font-bold mb-4">Document Verification</h2>
      <label htmlFor="containerId" className="block">Container Id :</label>
      <input type="text" id="containerId" value={containerId} onChange={(e)=>{setContainerId(e.target.value)}}
                className="w-full border border-gray-400 rounded px-2 py-1 mt-1"/>
      {/*<input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={uploadFileToIpfs} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Upload to IPFS
      </button>
      {ipfsHash && <p className="mt-4">IPFS Hash: {ipfsHash}</p>} */}
      <button onClick={verifyDocument} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600">
        Verify Document
      </button>
    </div>
    {showSuccess && <SuccessPage message={"Document Uploaded"} onCloseMsg={()=>setShowSuccess(false)}/>}
    </div>
  );
}

export default UploadDocument;
