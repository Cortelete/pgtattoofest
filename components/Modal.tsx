import React, { useState, useEffect } from 'react';
import { XIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  // When the modal is told to close, we first play the animation,
  // then call the parent's onClose function.
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset for the next time it opens
    }, 300); // This duration must match the CSS animation
  };

  // Reset the isClosing state if the modal is re-opened before the animation finished (edge case)
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? 'backdrop-fade-out 0.3s ease-out forwards'
          : 'backdrop-fade-in 0.3s ease-out forwards',
      }}
    >
      <div
        className="relative w-full max-w-lg bg-red-950/90 border border-red-700/50 rounded-xl shadow-2xl shadow-red-800/50 text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? 'fade-out-scale 0.3s ease-out forwards'
            : 'fade-in-scale 0.3s ease-out forwards',
        }}
      >
        <div className="flex-grow overflow-y-auto p-6 min-h-0">
            {children}
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors"
          aria-label="Fechar modal"
        >
          <XIcon />
        </button>
      </div>
      <style>{`
        @keyframes backdrop-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdrop-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes fade-in-scale {
          from { transform: scale(0.95) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes fade-out-scale {
          from { transform: scale(1) translateY(0); opacity: 1; }
          to { transform: scale(0.95) translateY(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Modal;