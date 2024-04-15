import React,{useState} from "react";
import { Download } from "lucide-react";
import { Upload } from "lucide-react";
import UploadDocument from "../AgentDashboard/UploadDocument";

const DocumentPage = () => {

    const [showDocumentUpload, setShowDocumentUpload] = useState(false);

    return(
        <div className="mt-auto">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider">
        Document Managment
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2 cursor-pointer" onClick={()=>{setShowDocumentUpload(true)}}>
          <div className="p-10 border >border-neutral-700 rounded-xl">
            <p className="text-4xl mb-8 ">
              <Upload />
              Upload documents to IPFS
            </p>
          </div>
        </div>
        {showDocumentUpload && <UploadDocument onClose={()=>{setShowDocumentUpload(false)}} />}
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <div className="p-10 border >border-neutral-700 rounded-xl">
            <p className="text-4xl mb-8 ">
              <Download />
              Get Documents
            </p>
          </div>
        </div>
      </div>
    </div>
    )

};

export default DocumentPage;