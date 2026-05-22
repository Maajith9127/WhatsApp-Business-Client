import React from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // Main overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-60 backdrop-blur-sm"
      onClick={onClose} // Close modal on overlay click
    >
      {/* Modal content */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-lg m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;