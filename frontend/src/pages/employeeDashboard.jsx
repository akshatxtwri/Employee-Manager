import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar.jsx'

const employeeDashboard = () => {
  return (
    <div className="flex w-full h-screen bg-white overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 ml-64 h-screen bg-gray-100">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  )
}

export default employeeDashboard
