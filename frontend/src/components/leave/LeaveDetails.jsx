import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          setError('Failed to fetch leave details.');
        }
      } catch (error) {
        setError('Error fetching Leave details . Please try again.');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const changeStaus = async (id, status) => {
      try {
        const response = await axios.put(`http://localhost:4000/api/leave/${id}`, status, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          navigate('/admin-dashboard/leaves/');
        } else {
          setError('Failed to fetch leave details.');
        }
      } catch (error) {
        setError('Error fetching Leave details . Please try again.');
        console.error('Fetch error:', error);
      }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Leave Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div className="flex justify-center items-start">
          <img
            src={`http://localhost:4000/${leave.employeeId.userId.profileImage || 'default.jpg'}`}
            alt="Profile"
            className="rounded-full border w-72 h-72 object-cover"
          />
        </div>

        {/* Employee Info */}
        <div className='text-gray-600'>
          <Info 
          label="Name" value={leave.employeeId?.userId?.name} />
          <Info label="Employee ID" value={leave.employeeId?.employeeId} />
          <Info label="Leave Type" value={leave.leaveType } />
          <Info label="Reason" value={leave.reason} />
          <Info label="Department" value={leave.employeeId?.department?.dep_name || 'N/A'} />
          <Info label="Start Date" value={new Date(leave.startDate).toLocaleDateString} />
            <Info label="End Date" value={new Date(leave.endDate).toLocaleDateString} /> 
          <Info label="Status">
           {leave.status === "Pending" ? (
          <div>
           <button className='px-2 py-1 bg-green-600 text-white hover:bg-green-800 mr-2'
           onClick={() => changeStaus(leave._id , "Approved")}
           >Approve</button>
           <button 
           onClick={() => changeStaus(leave._id , "Rejected")}
           className='px-2 py-1 bg-red-600 text-white hover:bg-red-800'>Reject</button>
           </div>
            ) : (
           leave.status
        )}
       </Info>
            
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex space-x-3 mb-5">
    <p className="text-lg font-bold">{label}:</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default LeaveDetails;
