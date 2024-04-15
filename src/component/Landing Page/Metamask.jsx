import { useState, useEffect } from 'react';
import Web3 from 'web3';
import auctionContract from "../../contracts/Auction.json";
import containerContract from "../../contracts/ContainerSC.json";
import rolesContract  from "../../contracts/Roles.json";

export const Metamask = () => {
  const [account, setAccount] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
      if (initialized) return;

      const init = async () => {
          try {
              const web3 = await getWeb3();
              const accounts = await web3.eth.getAccounts();
              setAccount(accounts[0]);
              setInitialized(true);
          } catch (error) {
              console.error(error);
          }
      };

      init();

      window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
      });
  }, [initialized]);


  const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    resolve(web3);
                })
                .catch((error) => {
                    reject(error);
                });
        } else if (window.web3) {
            return new Web3(window.web3.currentProvider);
        } else {
            reject(new Error('Please install MetaMask'));
        }
    });
  };


    const rolesContractConnection = async (web3) => {
      const netId = await web3.eth.net.getId();
      const netData = rolesContract.networks[netId];
      console.log(netData.address);
      const rolesVar = new web3.eth.Contract(rolesContract.abi, netData.address);
      return rolesVar;
    };

    const containerContractConnection = async(web3) =>{
        const netId = await web3.eth.net.getId();
        const netData = containerContract.networks[netId];
        console.log(netData.address);
        const containerVar = new web3.eth.Contract(containerContract.abi,netData.address);
        return(containerVar);
    };

    const auctionContractConnection = async(web3) =>{
        const netId = await web3.eth.net.getId();
        const netData = auctionContract.networks[netId];
        console.log(netData.address);
        const auctionVar = new web3.eth.Contract(auctionContract.abi,netData.address);
        return(auctionVar);
    };
  
    return {
      account,
      getWeb3,
      rolesContractConnection,
      containerContractConnection,
      auctionContractConnection      
    };
  };
  
  export default Metamask;