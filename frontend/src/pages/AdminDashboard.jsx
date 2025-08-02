import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';
import AdminSummary from '../components/dashboard/AdminSummary.jsx';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  console.log("Admin Dashboard");
  const { user } = useAuth();

  return (
    <div className="flex w-full h-screen bg-white overflow-x-hidden">
      <AdminSidebar />

      <div className="flex-1 ml-64 h-screen bg-gray-100">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;
