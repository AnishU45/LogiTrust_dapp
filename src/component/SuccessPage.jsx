import React from 'react';
import { X } from 'lucide-react';

const SuccessPopup = ({ message, onCloseMsg}) => {
  return (
    <div className="flex justify-center items-center popup fixed inset-0 bg-blue bg-opacity-30 backdrop-blur-sm bg-blue-300">
      <div className='size-80 bg-blue-400 flex flex-col p-5 rounded-3xl'>
        <div className='flex justify-end h-10%'>
          <button onClick={onCloseMsg}><X/></button>
        </div>
        <div className="popup-inner flex justify-center items-center h-90% flex-grow text-3xl">
          <h2 className='text-center'>{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;