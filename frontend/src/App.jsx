// App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/employeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';

import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/deparments/DepartmentList';
import AddDepartment from './components/deparments/AddDepartment';
import EditDepartment from './components/deparments/EditDepartment';

import EmployeeList from './components/employee/EmployeeList';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import Summary from './components/EmployeeDashboard/Summary';
import List from './components/leave/List';
import Addleave from './components/leave/Addleave';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import LeaveDetails from './components/leave/LeaveDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-full bg-white flex">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard with Protected + Role Based Access */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={['admin']}>
                  <AdminDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            {/* Nested inside AdminDashboard */}
            <Route index element={<AdminSummary />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="department/:id" element={<EditDepartment />} />

            <Route path="employees" element={<EmployeeList />} />
            <Route path="add-employee" element={<Add />} />
            <Route path="employees/:id" element={<View />} />
            <Route path="employees/edit/:id" element={<Edit />} />

            <Route path="employees/salary/:id" element={<ViewSalary />} />

            <Route path="salary/add" element={<AddSalary />} />
            <Route path="leaves" element={<Table />} />
            <Route path="leaves/:id" element={<LeaveDetails />} />
          </Route>

          {/* Employee Dashboard */}
         <Route
  path="/employee-dashboard"
  element={
    <PrivateRoutes>
      <RoleBasedRoutes requiredRole={['employee', 'admin']}>
        <EmployeeDashboard />
      </RoleBasedRoutes>
    </PrivateRoutes>
  }
>
  <Route index element={<Summary />} />
  <Route path="profile/:id" element={<View />} />
  <Route path="leaves" element={<List />} />
  <Route path="add-leave" element={<Addleave />} />
  <Route path="salary/:id" element={<ViewSalary />} />
  <Route path="settings" element={<Setting />} />
</Route>

           
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
