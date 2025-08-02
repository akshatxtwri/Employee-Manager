import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees } from '../../utils/EmployeeHelper';

const Add  = () => {
  const [salary , setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });

  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
const [employees, setEmployees] = useState([]);



  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };

    getDepartments();
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  const isNumeric = ['basicSalary', 'allowances', 'deductions'].includes(name);
  
  setSalary((prevData) => ({
    ...prevData,
    [name]: isNumeric ? parseFloat(value) || 0 : value,
  }));
};

  const handleDepartment =  async(e) => {
     const emps = await getEmployees(e.target.value);
     console.log("Fetched Employees:", emps);
    setEmployees(emps);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      console.error('Error:', error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Department */}
              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-600"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee  */}

              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Employee 
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-black"
                  required
                >
                  <option value="" className='text-gray-700'>Select Employee</option>
                  {employees.map((emp) => (
  <option key={emp._id} value={emp._id}>
    {emp.employeeID || emp.name || "Unnamed"}
  </option>
))}
If emplo
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                 Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>

              {/* allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                
                  onChange={handleChange}
                  placeholder="allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>


               {/* deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                
                  onChange={handleChange}
                  placeholder="deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>
                  

                   {/* paydate */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                
                  onChange={handleChange}
                  placeholder="Pay Date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>
             
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
                 Add Salary
                         </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-10">Loading...</div>
      )}
    </>
  );
};

export default Add;
