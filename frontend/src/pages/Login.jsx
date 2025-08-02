import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the login logic, like sending a request to your backend
    console.log('Email:', email);

    try {

        const response =  await axios.post("http://localhost:4000/api/auth/login", 
            {email,password});
           if(response.data.success) {
           login(response.data.user);
           localStorage.setItem("token", response.data.token)
           if(response.data.user.role === 'admin') {
               navigate('/admin-dashboard');
           }
           else if(response.data.user.role === 'employee') {
               navigate('/employee-dashboard');
           }

        }
 
    } catch (error) {
         if(error.response && !error.response.data.success) {
            setError(error.response.data.error);
    }
    else{
        setError("An error occurred during login. Please try again.");
    }
  }}

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-800 to-gray-200 space-y-6 w-screen'>
      <h2 className='font-bold text-3xl text-white'>Employee Management System </h2>

      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4 text-neutral-700'>Login</h2>
        {error && 
        <p className='text-red-500'>{error}</p>
        }

        <form onSubmit={handleSubmit}>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input
              type='password'
              placeholder="Enter your password"
              required
                onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border border-gray-400 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className='flex items-center justify-between mb-4'>
            <label className='inline-flex items-center'>
              <input type='checkbox' className='form-checkbox' />
              <span className='ml-2 text-gray-700'>Remember me</span>
            </label>
            <a
              href='#'
              className="text-sm text-teal-300 hover:text-teal-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200'
            >
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login
