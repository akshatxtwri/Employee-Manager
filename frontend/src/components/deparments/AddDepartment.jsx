import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const [department, setDepartment] = useState({ dep_name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/department', // 🔧 no /add
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/departments'); // 🔧 correct path
      }
    } catch (error) {
      console.error('Error:', error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h3 className='text-2xl font-bold mb-6 text-gray-700'>Add Department</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>
            Department Name
          </label>
          <input
            id='dep_name'
            name='dep_name'
            type='text'
            onChange={handleChange}
            required
            placeholder='Enter Department Name'
            className='mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-500'
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            onChange={handleChange}
            placeholder='Description'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-500'
          />
        </div>

       <button
  type="submit"
  disabled={loading}
  className={`w-full mt-6 ${
    loading
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-teal-600 hover:bg-teal-700 text-white'
  } font-bold py-2 px-4 rounded transition-colors duration-200`}
>
  {loading ? 'Adding...' : 'Add Department'}
</button>
      </form>
    </div>
  );
};

export default AddDepartment;
