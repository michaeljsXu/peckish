import React from 'react';

type DialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Dialog: React.FC<DialogProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-[60%] h-[80%]">
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-xl font-semibold">{title}</h2> */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
