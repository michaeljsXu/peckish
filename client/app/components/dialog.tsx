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
      <div className="relative bg-white flex flex-col rounded-lg shadow-lg p-6 z-10 w-[60%] h-[80%]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex-1 overflow-y-auto h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
