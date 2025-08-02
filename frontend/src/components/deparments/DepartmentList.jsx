import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onDepartmentDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        const updated = departments.filter(dep => dep._id !== id);
        setDepartments(updated);
        setFilteredDepartments(updated);
      } else {
        setError(response.data.message || "Delete failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong during delete.");
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          const data = response.data.departments.map((dep, index) => ({
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError("Failed to load departments.");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filtered = departments.filter(dep =>
      dep.dep_name.toLowerCase().includes(value)
    );
    setFilteredDepartments(filtered);
  };

  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      width: '80px'
    },
    {
      name: 'Department Name',
      selector: row => row.dep_name,
      sortable: true
    },
    {
      name: 'Action',
      cell: row => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/admin-dashboard/department/${row._id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDepartmentDelete(row._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
      width: '200px'
    }
  ];

  return (
    <>
      {depLoading ? (
        <div className="text-center py-5 text-gray-600 font-medium">Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-700">Manage Departments</h3>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mb-2">{error}</div>
          )}

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Department Name"
              onChange={filterDepartments}
              className="px-4 py-1 border border-gray-300 rounded text-gray-700"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
              responsive
              striped
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
