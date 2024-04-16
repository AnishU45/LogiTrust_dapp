import React, { useState } from "react";
import Metamask from "./Metamask";
import SuccessPage from "../SuccessPage";

const SignUp = () => {
  const {account,getWeb3,rolesContractConnection} = Metamask();
  //const [rolesVar, setRoleVar] = useState("");
  const [name, setName] = useState("");
  const [showPopup , setShowPopUp] = useState(false);
  const [roles, setRoles] = useState([
    "Agent",
    "Receiver Agent",
    "Bidder",
  ]);

  const handleSignUp = async () => {
    try {
      const web3 = await getWeb3();
      const rolesVar = await rolesContractConnection(web3);
      const data = await rolesVar.methods.signUp(name, roles).send({ from: account });
      const result = data.events.UserSignedUp.returnValues;
      console.log(result);

      if(result[1] === name){
        setShowPopUp(true)
      }

    } catch (error) {
      console.error(error);
    }
  };
  const connectToMetaMask = async () => {
    getWeb3();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>
        {!account ? (
          <button
            onClick={connectToMetaMask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
          >
            Connect to MetaMask
          </button>
        ) : (
          <>
            <p className="mb-4 text-black">Connected account: {account}</p>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2 text-black">Name</label>
              <input type="text"
               id="name"
               value={name} 
               onChange={(e) => {setName(e.target.value)}}
               className="border border-gray-300 rounded-md py-2 px-3 w-full text-black-600"
               />

              <label htmlFor="role" className="block font-bold mb-2 text-black">
                Select Role
              </label>
              <select
                id="role"
                value={roles}
                onChange={(e) => {setRoles(e.target.value);}}
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
              >
                <option value="">Select a role</option>
                <option value="agent">Agent</option>
                <option value="receiver Agent">Receiver Agent</option>
                <option value="bidder">Bidder</option>
              </select>
            </div>
            <button
              onClick={handleSignUp}
              disabled={!roles}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                !roles ? "opacity-50 cursor-not-allowed" : ""
              } w-full`}
            >
              Sign Up
            </button>
            {showPopup && <SuccessPage message={"You have been Registered"} onCloseMsg = {()=>{setShowPopUp(false)}}/>}
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
