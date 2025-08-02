import React from 'react'
import { useNavigate } from 'react-router-dom';

export const columns = [
    {
        name: "S.no",
        selector: (row) => row.sno,
        width: "70px",
    },

    {
        name : "EMP ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },

    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
      name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px",  
    },
    {
        name : "Department",
        selector: (row) => row.department,
        width: "170px",
    },
    {
        name : "Days",
        selector: (row) => row.days,
        width: "80px",
    },
    {
        name : "Status",
        selector: (row) => row.status,
        width: "120px",
    },
    {name: "Action",
        selector: (row) => row.action,
        width: "150px",

    }

]

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();  
const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);

}     


  return (
   <button
    onClick={() => handleView(Id)}
    className='px-2 py-1 bg-teal-500 text-white hover:bg-teal-800 rounded-md'
   >
    View
   </button>
  )
}

export default LeaveHelper
