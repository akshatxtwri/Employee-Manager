import React from 'react';

const SummarCard = ({ icon, text, number, color }) => {
  return (
    <div className='flex items-center bg-white rounded shadow-md overflow-hidden min-h-[80px]'>
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-5 py-4`}>
        {icon}
      </div>
      <div className='pl-4'>
        <p className='text-base font-medium text-gray-600'>{text}</p>
        <p className='text-xl font-bold text-gray-800'>{number}</p>
      </div>
    </div>
  );
};

export default SummarCard;
