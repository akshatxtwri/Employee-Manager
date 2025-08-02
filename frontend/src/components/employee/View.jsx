import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError('Failed to fetch employee details.');
        }
      } catch (error) {
        setError('Error fetching employee. Please try again.');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Employee Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div className="flex justify-center items-start">
          <img
            src={`http://localhost:4000/${employee?.userId?.profileImage || 'default.jpg'}`}
            alt="Profile"
            className="rounded-full border w-72 h-72 object-cover"
          />
        </div>

        {/* Employee Info */}
        <div className='text-gray-600'>
          <Info 
          label="Name" value={employee?.userId?.name} />
          <Info label="Employee ID" value={employee?.employeeId} />
          <Info label="Date of Birth" value={new Date(employee?.dob).toLocaleDateString()} />
          <Info label="Gender" value={employee?.gender} />
          <Info label="Department" value={employee?.department?.dep_name || 'N/A'} />
          <Info label="Marital Status" value={employee?.maritalStatus} />
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

export default View;
