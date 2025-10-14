import React from 'react';

interface LinkButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative group w-full flex items-center justify-center p-2 my-1 bg-[#3D0E0E]/80 backdrop-blur-sm border border-red-700/50 rounded-lg text-white text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-800/50 hover:shadow-lg hover:shadow-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <div className="absolute left-4 text-gray-200 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="text-center">
        {text}
      </span>
    </button>
  );
};

export default LinkButton;