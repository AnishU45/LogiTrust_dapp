import React, { useState } from "react";
import MetaMask from "../Landing Page/Metamask";
import SuccessPage from "../SuccessPage";
import { X } from 'lucide-react';

const SenderPage = ({onClose}) => {
  const {account,getWeb3,containerContractConnection} = MetaMask();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    size: "",
    content: "",
    senderAddress:"",
    receiverAddress:"",
    receiverAgentAddress:"",
    isMultimodal: false,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // For sender and receiver addresses, extract only the Ethereum address
    if (name === 'senderAddress' || name === 'receiverAddress'|| name ==="receiverAgentAddress") {
    value = value.split(' ')[0];
    }

  // Parse the input value as a boolean if it's the isMultimodal field
    if (name === 'isMultimodal') {
    value = value === 'true';
    }

  // Update the form data
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can perform any necessary action here, such as sending the form data to a backend server
    try {
      const web3 = await getWeb3();
      const containerVar = await containerContractConnection(web3);
      const data = await containerVar.methods.requestShipment(formData.origin,
                                                              formData.destination,
                                                              formData.size,
                                                              formData.content,
                                                              formData.senderAddress,
                                                              formData.receiverAddress,
                                                              formData.receiverAgentAddress,
                                                              formData.isMultimodal).send({ from: account });
      const result = data.events.ShipmentRequested.returnValues;
      console.log(result);

      if(result !==""){
        setShowSuccess(true);
      }

    } catch (error) {
      console.error(error);
    }
    console.log(formData);
  };

  return (
    <div className="p-10" >      
      <div className="container mx-auto my-8 px-10 w-3/4 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-25">
      <div className="flex justify-end">
        <div><button className="mt-4 px-4 py-2 text-red-600 rounded-md" onClick={onClose}><X/></button></div>
      </div>
        <h1 className="text-2xl font-bold mb-4">Sender Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="origin" className="block mb-1">
                Origin:
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="destination" className="block mb-1">
                Destination:
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="size" className="block mb-1">
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="content" className="block mb-1">
                Content:
              </label>
              <input
                type="text"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="senderAddress" className="block mb-1">
                Sender Address:
              </label>
              <input
                type="text"
                id="senderAddress"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="receiverAddress" className="block mb-1">
                Receiver Address:
              </label>
              <input
                type="text"
                id="receiverAddress"
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="receiverAgentAddress" className="block mb-1">
                Receiver Agent Address:
              </label>
              <input
                type="text"
                id="receiverAgentAddress"
                name="receiverAgentAddress"
                value={formData.receiverAgentAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-2 gap-3">
              <input
                type="radio"
                id="isMultimodal"
                name="isMultimodal"
                value={true}
                checked={!formData.isMultimodal=== true}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isMultimodal">Multimodal</label>
              <br />
              <input
                type="radio"
                id="isUnimodal"
                name="isMultimodal"
                value={false}
                checked={formData.isMultimodal === false}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isUnimodal">Unimodal</label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
      {showSuccess && <SuccessPage message={"Consignment is Created"} onCloseMsg={()=>setShowSuccess(false)}/>}
    </div>
  );
};

export default SenderPage;
