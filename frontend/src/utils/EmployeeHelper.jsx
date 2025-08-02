// utils/EmployeeHelper.js

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

// =======================
// Employee Table Columns
// =======================
export const columns = [
  {
    name: "S.no",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "130px",
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];


// Fetch Departments
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:4000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if(response.data.success){
      departments = response.data.departments;
    }
  }
catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
  return departments;
}




export const getEmployees = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success && Array.isArray(response.data.employees)) {
      return response.data.employees;
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }

  return [];
};


export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      <button 
      onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      className="px-3 py-1 bg-yellow-600 text-white rounded">
        Salary
      </button>

      <button className="px-3 py-1 bg-purple-600 text-white rounded">
        Leave
      </button>
    </div>
  );
};
