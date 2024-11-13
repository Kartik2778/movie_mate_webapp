import React, { useEffect } from 'react';
import UserDetails from '../components/user/UserDetails';
import UserBookings from '../components/user/UserBookings';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_PROFILE } from '../slices/userProfile';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const userProfile = useSelector(store => store.userProfile);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (userProfile.firstName === "") {
      axios.get("http://localhost:8085/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => dispatch(SET_USER_PROFILE(res.data)))
        .catch(error => console.error('Error fetching user profile:', error));
    }
  }, [userProfile, dispatch, token]);

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
