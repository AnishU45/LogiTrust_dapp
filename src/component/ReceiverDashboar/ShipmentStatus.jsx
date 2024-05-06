import { useState,useEffect } from "react";
import Metamask from "../Landing Page/Metamask";
import DeliverShipment from "./DeliverShipment"
import ClaimShipment from "./ClaimShipment";

const ShipmentStatus = ()=>{
    
    const {account, getWeb3,containerContractConnection} = Metamask();
    const [allContainers, setAllContainers] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [showDeliver,setShowDeliver] = useState();
    const [showClaim,setShowClaim] = useState();
    
    useEffect(()=>{
        const init = async()=>{
            try {
                const web3 = await getWeb3();
                const containerVar = await containerContractConnection(web3);
                const data = await containerVar.methods.getAllContainers().call({from:account});
                console.log(data);
                const filteredContainers = data.filter((container) => {
                    const state = parseInt(container.state);
                    return state === 2 || state === 3 || state === 4 || state === 5;
                  });
                  setAllContainers(filteredContainers);
                }
            catch (error) {
                console.error(error);
            }
        }

        if(refreshData){
            init();
            setRefreshData(false);
        }
    },[account, containerContractConnection, getWeb3, refreshData]);

    const handleRefresh = () =>{
        setRefreshData(true);
    }

    const StateLables = {
        0: 'Created',
        1: 'DocumentsVerified',
        2: 'ShipmentInProgress',
        3: 'ShipmentDelivered',
        4: 'Completed',
        5: 'Claimed'
    };

    return(
        <div className="p-8 bg-gray-800 text-white">
            <div className="text-4xl text-center">
                <h1>Shipment Management</h1>
            </div>
            <div className="flex p-5 gap-5 mt-10 justify-center">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={()=>{setShowDeliver(true)}}>
                    Deliver Shipment
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={()=>{setShowClaim(true)}}>
                    Claim Shipment
                </button>
            </div>
    <       div className="border-b pb-4 mt-10">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleRefresh}>Refresh</button>
            </div>
            <div className="mt-4 overflow-x-auto">
                <h2 className="text-lg font-bold mb-2">Containers</h2>
                
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="text-left py-3 px-4">ID</th>
                                <th className="text-left py-3 px-4">Origin</th>
                                <th className="text-left py-3 px-4">Destination</th>
                                <th className="text-left py-3 px-4">Size</th>
                                <th className="text-left py-3 px-4">Content</th>
                                <th className="text-left py-3 px-4">Sender</th>
                                <th className="text-left py-3 px-4">Receiver</th>
                                <th className="text-left py-3 px-4">Agent</th>
                                <th className="text-left py-3 px-4">Receiver Agent</th>
                                <th className="text-left py-3 px-4">Tranporter</th>
                                <th className="text-left py-3 px-4">Multimodal</th>
                                <th className="text-left py-3 px-4">State</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                            {allContainers.map((container, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{container.origin}</td>
                                    <td className="py-3 px-4">{container.destination}</td>
                                    <td className="py-3 px-4">{container.size}</td>
                                    <td className="py-3 px-4">{container.content}</td>
                                    <td className="py-3 px-4">{container.sender}</td>
                                    <td className="py-3 px-4">{container.receiver}</td>
                                    <td className="py-3 px-4">{container.agent}</td>
                                    <td className="py-3 px-4">{container.receiverAgent}</td>
                                    <td className="py-3 px-4">{container.transporter}</td>
                                    <td className="py-3 px-4">{container.Multimodal?"Yes":"No"}</td>
                                    <td className="py-3 px-4">{StateLables[container.state]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                {showDeliver && <DeliverShipment onClose= {()=>{setShowDeliver(false)}} />}
                {showClaim && <ClaimShipment onClose={()=>{setShowClaim(false)}}/>}
            </div>
        </div>
    )

};

export default ShipmentStatus;
