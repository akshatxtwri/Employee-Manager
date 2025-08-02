import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext';


const Summary = () => {
    const {user} = useAuth();
  return (
    <div className='p-6 justify-center items-center '>
      <div className='flex items-center bg-white rounded shadow-md overflow-hidden min-h-[80px]'>
      <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-5 py-4`}>
        <FaUser/>
      </div>
      <div className='pl-4'>
        <p className='text-base font-medium text-gray-600'>Welcome Back</p>
        <p className='text-xl font-bold text-gray-800'>{user.name}</p>
      </div>
    </div>
    </div>
  )
}

export default Summary
