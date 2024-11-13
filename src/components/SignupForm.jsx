import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from './Message'
import axiosInstance from '../config/apiConfig';

const SignupForm = () => {

  const [signupError , setSignupError] = useState({message:"",flag: false});
  const navigate = useNavigate();

  async function signup(userInfo) {
    try{
      const res = await axiosInstance.post('/public/register',userInfo);
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('role',res.data.role);
      setSignupError({
        ...signupError,falg: false
      })
      navigate('/');
    }
    catch(error) {
      setSignupError({
        message: error.response.data,
        flag: true
      });
      console.log("error ",error.response.data);
    }
  }

  // Refs for each input field
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const roleRef = useRef();
  const countryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather the values from refs
    const userInfo = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        country: countryRef.current.value,
      },
      role: roleRef.current.value
    };

    signup(userInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              ref={firstNameRef}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              ref={lastNameRef}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              ref={phoneRef}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          
          {/* Address Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="street"
              ref={streetRef}
              className="w-full px-4 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street Address"
            />
            <input
              type="text"
              name="city"
              ref={cityRef}
              className="w-full px-4 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              ref={stateRef}
              className="w-full px-4 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State"
            />
            <input
              type="text"
              name="country"
              ref={countryRef}
              className="w-full px-4 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Country"
            />
          </div>
          <div className="text-sm font-medium text-gray-700 flex gap-5">
            <label>Role</label>
            <select ref = {roleRef} >
              <option value="ROLE_CUSTOMER">CUSTOMER</option>
              <option value="ROLE_ADMIN">ADMIN</option>
              <option value="ROLE_DESK_OFFICER">DESK_OFFICIER</option>
            </select>
          </div>
          {
            signupError.flag && <Message severity='error'>{signupError.message}</Message>
          }
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
