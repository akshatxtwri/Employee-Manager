import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user , logout} = useAuth();

  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.location.href = '/login';
  // };

  return (
    <div className='flex justify-between items-center h-12 w-full px-4 bg-teal-600 text-white'>
      <p>Welcome, {user?.name || 'User'}</p>
      <div
        onClick={logout}
        className='px-4 py-1 bg-teal-700 hover:bg-teal-800 border rounded cursor-pointer '
       
     >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
