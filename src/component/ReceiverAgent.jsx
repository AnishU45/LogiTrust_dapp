import { PackageCheck } from "lucide-react";
import { FileCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Receiver = () => {
  const navigate = useNavigate();
    const handleOptionClick = () => {
      console.log("clicked");
    };
    return (
      <div className="mt-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider      ">
          Receiver Dashboard
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
            <div className="w-full sm:w-1/2 lg:w-1/3 p-2 cursor-pointer"
            onClick={() => handleOptionClick()}>
                <div className="p-5 border >border-neutral-700 rounded-xl px-10">
                    <p className="text-5xl mb-5 mx-5">
                    <div className="flex mx-0 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                        <FileCheck2 />
                    </div>
                        Document verification
                    </p>
                </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-2 cursor-pointer"
            onClick={navigate("./ShipmentStatus")}>
                <div className="p-5 border >border-neutral-700 rounded-xl px-10">
                    <p className="text-5xl mb-5 mx-5">
                        <div className="flex mx-0 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                        <PackageCheck />
                        </div>
                        Shipment Status
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
  };
  export default Receiver;