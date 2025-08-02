import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
  
    const navigate  = useNavigate();
    const { user } = useAuth();
  const [setting , setSetting] = useState({
    userId : user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

    const [ error, setError] = useState(null);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({...setting, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       if(setting.newPassword !== setting.confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        else{
            try{
                 const response =  await axios.put(
                    "http://localhost:4000/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                 );
                 if(response.data.success){
                    navigate("/admin-dashboard/employees");
                    setError(null);
                 }
            }

            catch(error){
                console.error("Error changing password:", error);
                setError("Failed to change password. Please try again.");
            }
        }
    }


  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center text-black'>Change Password</h2>
        <p className='text-red-500 '> {error}</p>
        <form onSubmit={handleSubmit}>

            {/* Deaprtment name  */}
           
           <div> 
            <label className='text-sm font-medium text-gray-700'>Old Password</label>

            <input
            type='password'
            name='oldPassword'
            placeholder='Enter old password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-400 rounded-md text-gray-700'
            required></input>

           </div>

          <div> 
            <label className='text-sm font-medium text-gray-700'>New Password</label>

            <input
            type='password'
            name='newPassword'
            placeholder='Enter New password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-400 rounded-md text-gray-700'
            required></input>

           </div>

           <div> 
            <label className='text-sm font-medium text-gray-700'>Confirm Password</label>

            <input
            type='password'
            name='confirmPassword'
            placeholder='confirm password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-400 rounded-md text-gray-700'
            required></input>

           </div>


              <button
              type='submit'
              className='w-full mt-6 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
               change Password
              </button>

            </form>
      
    </div>
  )
}

export default Setting
