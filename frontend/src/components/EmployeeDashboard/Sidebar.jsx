import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {

  const {user} = useAuth();
  return (
    <div className='bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 bottom-0 space-y-2'>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-bold'>Employee MS</h3>
      </div>

      <NavLink to="/employee-dashboard"  
      className={({ isActive }) =>`${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
      }
      end
      >
        <FaTachometerAlt className='text-white' />
        <span className='text-white'>Dashboard</span>
      </NavLink>

      <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) =>
        `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
      }>
        <FaUser  className='text-white'/>
        <span className='text-white'>My Profile</span>
      </NavLink>


      <NavLink to="/employee-dashboard/leaves" className={({ isActive }) =>
        `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
      }>
        <FaCalendarAlt className='text-white'/>
        <span className='text-white'>leaves</span>
      </NavLink>

      <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) =>
        `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
      }>
        <FaMoneyBillWave className='text-white'/>
        <span className='text-white'>Salary</span>
      </NavLink>

      <NavLink to="/employee-dashboard/settings" className={({ isActive }) =>
        `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
      }>
        <FaCogs className='text-white' />
        <span className='text-white'>Settings</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
