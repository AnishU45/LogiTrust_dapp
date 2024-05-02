import React, { useState } from 'react';
import MetaMask from "../Landing Page/Metamask";
import { X } from 'lucide-react';
import SuccessPage from "../SuccessPage";
import axios from 'axios';

const UploadDocument = ({onClose})=> {
  const {account,getWeb3,containerContractConnection} = MetaMask();
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState('');
  const [containerId, setContainerId] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const JWT ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NTA1M2E1Yy04ZjlmLTQyNjItOTJiMi1lYzA4ZTZhYjBhZTgiLCJlbWFpbCI6ImFuaXNodXBnYW5sYXdhcjEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzE1ZGJjN2FhZjk2ZGRmYTQyZDUiLCJzY29wZWRLZXlTZWNyZXQiOiJiMDUxNWRlNmU1YzdkNGJhNmMyOWRkZGM4ZDMzNTUyNDhlNzZjMmU1NTU4OWU0MGEwYWQyZDc3OTExYzEwOTgyIiwiaWF0IjoxNzE0NjQ4MTQzfQ.Kuesgh8eLVNWx3kG6DDGVzYPafQbIiRQc_OZ2ok573g';

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const pinataMetadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      setCid(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async() =>{
    await uploadFile(file);
    await uploadDocument();
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadDocument = async() =>{
    const web3 = await getWeb3();
    const containerVar = await containerContractConnection(web3);
    const data = await containerVar.methods.uploadDocumentToIPFS(containerId,cid).send({from:account});
    const result = data;
    console.log(result);
  }

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
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Upload to IPFS
      </button>
      {/* {ipfsHash && <p className="mt-4">IPFS Hash: {ipfsHash}</p>} */}
      <button onClick={verifyDocument} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600">
        Verify Document
      </button>
    </div>
    {showSuccess && <SuccessPage message={"Document Uploaded"} onCloseMsg={()=>setShowSuccess(false)}/>}
    </div>
  );
}

export default UploadDocument;
