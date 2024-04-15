import React, { useState, useEffect } from "react";
import MetaMask from "../Landing Page/Metamask";

const Bidding = () => {
  const [shipments, setShipments] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const { account, getWeb3, auctionContractConnection } = MetaMask();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const web3 = await getWeb3();
        const auctionContract = await auctionContractConnection(web3);
        const shipmentIds = await auctionContract.methods
          .getShipmentIds()
          .call();
        const shipmentData = await Promise.all(
          shipmentIds.map(async (id) => {
            const shipment = await auctionContract.methods.shipments(id).call();
            return {
              id,
              owner: shipment.owner,
              portOfficer: shipment.portOfficer,
              price: shipment.price,
              status: shipment.sState,
            };
          })
        );
        setShipments(shipmentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShipments();
  }, [getWeb3, auctionContractConnection]);

  const handleBid = async (shipmentId) => {
    try {
      const web3 = await getWeb3();
      const auctionContract = await auctionContractConnection(web3);
      await auctionContract.methods
        .bid(shipmentId, web3.utils.toWei(bidAmount, "ether"))
        .send({ from: account });
      alert("Bid placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Error placing bid. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Available Shipments for Auction
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">
              Shipment ID: {shipment.id}
            </h2>
            <p className="text-gray-600 mb-2">Owner: {shipment.owner}</p>
            <p className="text-gray-600 mb-2">
              Port Officer: {shipment.portOfficer}
            </p>
            <p className="text-gray-600 mb-4">Current Price:5 ETH</p>
            <div className="flex items-center">
              <input
                type="number"
                className="form-input rounded-l-md mr-2"
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                onClick={() => handleBid(shipment.id)}
              >
                Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bidding;
