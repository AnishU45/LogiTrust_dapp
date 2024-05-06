import React, { useState } from "react";
import Metamask from "../Landing Page/Metamask";
import { X } from 'lucide-react';

const RetrieveDocument = (onClose) => {
  const {account, getWeb3,containerContractConnection} = Metamask();
  const [cid, setCid] = useState("");
  const [file, setFile] = useState(null);
  const [containerId, setContainerId] = useState();

  const handleIdChange = (event) => {
    setContainerId(event.target.value);
  };

  const handleRetrieval = async() =>{
    const web3 = await getWeb3();
    const containerVar = await containerContractConnection(web3);
    const data = await containerVar.methods.getAllContainers().call({from:account});
    console.log(data);
    setCid(data[0])
  }

  const handleDownload = async () => {
    await handleRetrieval();
    if (!cid) {
      alert("Please enter a CID");
      return;
    }

    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      const blob = await response.blob();
      setFile(URL.createObjectURL(blob));
    } catch (error) {
      console.log(error);
      alert("Failed to download file");
    }
  };

  return (
      <div className="p-10" >      
            <div className="container mx-auto my-8 px-10 w-3/4 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-25">
                <div className="flex justify-end">
                    <div><button className="mt-4 px-4 py-2 text-red-600 rounded-md" onClick={onClose}><X/></button></div>
                </div>
                    <h1 className="text-2xl font-bold mb-4">Document Retreive</h1>
                    <form>
                        <label htmlFor="containerId" className="block">
                        Container ID:
                        <input
                        type="text"
                        id="containerId"
                        value={containerId}
                        onChange={handleIdChange}
                        className="border border-gray-400 rounded px-2 py-1 mt-1"
                        />
                        </label>
                        <button href={file} download className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={handleDownload}>
                        Download
                        </button>
                    </form>
                </div>
            {file && <a href={file} download className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >Download file</a>}
        </div>
    
  );
};

export default RetrieveDocument;