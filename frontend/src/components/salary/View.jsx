import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id: paramId } = useParams();
  const [userId, setUserId] = useState(null);

  // Get userId from params or localStorage
  useEffect(() => {
    if (paramId) {
      setUserId(paramId);
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) {
        setUserId(user._id);
      }
    }
  }, [paramId]);

  // Fetch salaries once userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/salary/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setSalaries(response.data.salary);
          setFilteredSalaries(response.data.salary);
        } else {
          console.error("API responded with error", response.data);
        }
      } catch (error) {
        console.error("Error fetching salaries:", error.response?.data || error.message);
      }
    };

    fetchSalaries();
  }, [userId]);

  const filterSalaries = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = salaries.filter((salary) =>
      salary.employeeId?.employeeId?.toLowerCase().includes(query)
    );
    setFilteredSalaries(filtered);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Salary History</h2>
          </div>

          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Employee ID"
              className="border p-2 rounded-md border-gray-500 text-gray-700"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr
                    key={salary._id || index}
                    className="bg-white border  dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{salary.employeeId?.employeeId || 'N/A'}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-gray-800'>No Records Found</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
