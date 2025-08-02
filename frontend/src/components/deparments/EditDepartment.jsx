import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({ dep_name: '', description: '' });
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setDepartment({
            dep_name: response.data.department.dep_name,
            description: response.data.department.description,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">Edit Department</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Department Name</label>
              <input
                type="text"
                name="dep_name"
                value={department.dep_name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-500"
                required
                placeholder="Enter Department Name"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={department.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-500"
                placeholder="Description"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
