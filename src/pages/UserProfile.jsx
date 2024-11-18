import React, { useEffect } from 'react';
import UserDetails from '../components/user/UserDetails';
import UserBookings from '../components/user/UserBookings';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_PROFILE } from '../slices/userProfile';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../config/apiConfig';

const UserProfile = () => {
  const userProfile = useSelector(store => store.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile.firstName === "") {
      axiosInstance.get("/user/profile").then(res => dispatch(SET_USER_PROFILE(res.data)))
        .catch(error => console.error('Error fetching user profile:', error));
    }
  }, [userProfile, dispatch]);

  return (
    userProfile.firstName === "" ? (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <CircularProgress />
      </div>
    ) : (
      <div className='w-full min-h-screen flex bg-gray-100'>
        <div className='w-[30%] flex justify-center'>
          <UserDetails />
        </div>
        <div className='w-[70%] flex flex-wrap'>
          <UserBookings />
        </div>
      </div>
    )
  );
};

export default UserProfile;
