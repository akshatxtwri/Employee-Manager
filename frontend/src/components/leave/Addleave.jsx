import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addleave = () => {
   const {user} = useAuth(); 
  const [leave, setLeave] = useState({
  employeeId: user._id
});
    const navigate = useNavigate();
 
    const handleChange = (e) => {
      const {name , value} = e.target;
  
      setLeave((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
      const response = await axios.post(`http://localhost:4000/api/leave/add`, 
        leave,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
         navigate('/employee-dashboard/leaves');
      }
    } 
    
    catch (error) {
      console.error("Error adding leaves", error);
    }
    }
  return (
    <div className='max-w-4xl mx-auto mt-10 p-8 bg-white rounded shadow-md'>

        <h2 className='text-2xl font-bold mb-6 text-black'>Requests for Leave</h2>

        <form onSubmit={handleSubmit}>
            
            <div className='flex flex-col space-y-4'>
                <div>
                <label className='block text-gray-700 mb-2 font-medium' >Leave Type</label>
                <select 
                name = "leaveType"
                onChange={handleChange}
                placeholder='Select Leave Type'
                className='mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
                required>

                    <option value="" className='text-gray-700'>Leave Type</option>
                    <option value="Sick Leave" className='text-gray-700'>Sick Leave</option>
                    <option value="Casual Leave" className='text-gray-700'>Casual Leave</option>
                    <option value="Annual Leave" className='text-gray-700'>Annual Leave</option>
                </select>
            </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* from data */}
                    <div>
                        <label className='block text-gray-700 mb-2 font-medium text-sm'>From Date</label>
                        <input 
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
                        required />
                        </div>
                    {/* to date */}
                    <div>
                        <label className='block text-gray-700 mb-2 font-medium text-sm'>To Date</label>
                        <input 
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
                        required />
                              </div>
                              </div>

                              {/* description  */}
                                <div>
                                    <label className='block text-gray-700 mb-2 font-medium'>Description</label>
                                    <textarea 
                                    name="reason"
                                    placeholder='Enter reason for leave'
                                    onChange={handleChange}
                                    rows="4"
                                    className='mt-1 p-2 block w-full border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
                                    required></textarea>

                                    </div>
                                    </div>
           <button
              type='submit'
              className='w-full mt-6 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                Add Leave Request
              </button>
            </form>
      
    </div>
  )
}

export default Addleave
