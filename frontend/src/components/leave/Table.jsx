import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
const Table = () => {

  const [leaves, setLeaves] = useState(null);

 const fetchLeaves = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/leave', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      const data = response.data.leaves.map((leave, index) => ({
        _id: leave._id,
        sno: index + 1,
        employeeId: leave.employeeId?.employeeId || "N/A",
        name: leave.employeeId?.userId?.name || "N/A",
        leaveType: leave.leaveType,
        department: leave.employeeId?.department.dep_name || 'N/A',
        days: Math.ceil(
          (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
        ) + 1,
        status: leave.status,
        action: <LeaveButtons Id={leave._id} />
      }));

      setLeaves(data);
    }
  } catch (error) {
    console.error('Error fetching leaves:', error);
    setError("Failed to load leave data.");
  }
};

useEffect(() => {
  fetchLeaves();
}, []);

  return (
    <>
    {leaves ? (
    <div className='p-6'>
       <div className='text-center'>
            <h3 className='text-2xl font-bold text-black'>Manage Leaves</h3>
        </div>

        <div className='flex justify-between items-center mt-6'>
            <input
            type='text'
            placeholder='Search by Dep name'
            className='px-4 py-0.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700'
            />
             
             <div className='space-x-3'>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-800'>Pending</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-800'>Approved</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-800'>Rejected</button>
             </div>
            
            </div>  

          <DataTable  columns={columns} data={leaves} pagination/>
    </div>
    ) : <div> Loading </div>}
    </> 
  )
}

export default Table
