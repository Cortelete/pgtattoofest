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
      className="group w-full flex items-center p-3 my-1.5 bg-[#3D0E0E]/80 backdrop-blur-sm border border-red-700/50 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-800/50 hover:shadow-lg hover:shadow-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <div className="w-1/6 flex justify-start pl-2 text-gray-200 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 text-center">
        {text}
      </div>
    </button>
  );
};

export default LinkButton;