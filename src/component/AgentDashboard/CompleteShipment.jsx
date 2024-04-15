import { useState } from "react";
import Metamask from "../Landing Page/Metamask";
import SuccessPage from "../SuccessPage";
import { X } from 'lucide-react'; 

const CompleteShipment = ({onClose})=>{
    const [containerId, setContainerId] = useState();
    const {account, getWeb3,containerContractConnection} = Metamask();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleComplete = async()=>{
        try{
            const web3 = await getWeb3();
            const containerVar = await containerContractConnection(web3);
            const data = await containerVar.methods.completeShipment(containerId).send({from:account});
            const result = data.events.ShipmentCompleted.returnValues[0];
            if(result!==0){
                setShowSuccess(true);
            }
            
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className="p-10" >      
            <div className="container mx-auto my-8 px-10 size-96 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-25 flex justify-center">
                <div className="flex justify-end">
                    <div><button className="mt-4 px-4 py-2 text-red-600 rounded-md" onClick={onClose}><X/></button></div>
                </div>
                    <h1 className="text-2xl font-bold mb-4">Complete Shipment</h1>
                    <form>
                        <label htmlFor="containerId" className="block">
                        Container ID:   
                        <input
                        type="text"
                        id="containerId"
                        value={containerId}
                        onChange={(e) => setContainerId(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1 mt-1"
                        />
                        </label>
                        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={handleComplete}>
                        Create
                        </button>
                    </form>
                </div>
            {showSuccess && <SuccessPage message={"Shipment Delivered"} onCloseMsg={()=>setShowSuccess(false)}/>}
        </div>        
    );
};

export default CompleteShipment;