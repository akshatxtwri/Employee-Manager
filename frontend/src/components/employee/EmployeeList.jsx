import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => {
            const user = emp.userId || {};
            const department = emp.department || {};

            return {
              _id: emp._id,
              sno: index + 1,
              dep_name: department.dep_name || 'N/A',
              dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : '',
              profileImage: (
                <img
                  className='rounded-full'
                  width={40}
                  src={user.profileImage ? `http://localhost:4000/uploads/${user.profileImage}` : 'https://via.placeholder.com/40'}
                  alt="Profile"
                />
              ),
              name: user.name || 'N/A',
              action: <EmployeeButtons Id={emp._id} />
            };
          });
 
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError("Failed to load employees.");
      } finally {
        setDepLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className='p-6'>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-700">Manage Employees</h3>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mb-2">{error}</div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-1 border border-gray-300 rounded text-gray-700"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        progressPending={depLoading}
        noDataComponent="No employees found."
      />
    </div>
  );
};

export default EmployeeList;
