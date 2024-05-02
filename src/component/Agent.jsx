import React,{useState } from "react";
import { ListTodo } from "lucide-react";
import { FileCheck2 } from "lucide-react";
import { Container } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SenderPage from "./AgentDashboard/SenderPage";

const Agent = () => {
  const navigate = useNavigate();
  const [showSenderPage, setShowSenderPage] = useState(false);

  return (
    <div className="mt-auto">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider      ">
        Agent DashBoard
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2 cursor-pointer" onClick={()=>{setShowSenderPage(true)}}>
          <div className="p-10 border >border-neutral-700 rounded-xl">
            <p className="text-4xl mb-8 ">
              <ListTodo />
              Container Creation
            </p>
          </div>
        </div>
        {showSenderPage && <SenderPage onClose={()=>{setShowSenderPage(false)}}/>}
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2"onClick={()=>{navigate("./DocumentPage")}}>
          <div className="p-10 border >border-neutral-700 rounded-xl">
            <p className="text-4xl mb-8 ">
              <FileCheck2 />
              Document Management
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2" onClick={()=>{navigate("./ContainerManagement") }}>
          <div className="p-10 border >border-neutral-700 rounded-xl">
            <p className="text-4xl mb-8 ">
              <Container />
              Container Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Agent;