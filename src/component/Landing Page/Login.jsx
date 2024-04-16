import React, { useState } from "react";
import Metamask from "./Metamask";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const {account,getWeb3,rolesContractConnection} = Metamask();
  let navigate = useNavigate();
  //const [rolesVar, setRoleVar] = useState("");
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([
    "Agent",
    "Receiver Agent",
    "Bidder",
  ]);

  const handleLogin = async () => {
    try {
      const web3 = await getWeb3();
      const rolesVar = await rolesContractConnection(web3);
      const data = await rolesVar.methods.login().call({from:account});
      console.log(data);
      if(data[0] === name && data[1] === "agent"){
        navigate("../../Agent");
      }
      else if(data[0] === name && data[1] === "receiver Agent"){
        navigate("../../ReceiverAgent")
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
        <h2 className="text-2xl font-bold mb-6 text-black">Sign In</h2>
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
              <label htmlFor="name" className="block font-bold mb-2 text-black ">Name</label>
              <input type="text"
               id="name"
               value={name} 
               onChange={(e) => {setName(e.target.value)}}
               className="border border-gray-300 rounded-md py-2 px-3 w-full"
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
              onClick={handleLogin}
              disabled={!roles}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                !roles ? "opacity-50 cursor-not-allowed" : ""
              } w-full`}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
